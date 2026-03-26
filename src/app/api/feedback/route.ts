import { NextRequest, NextResponse } from 'next/server';
import { analyzeKeywords } from '@/lib/keywords';
import { AiFeedback } from '@/types';

// Gemini API 프롬프트 작성
function buildPrompt(
  subject: string,
  title: string,
  content: string,
  keywordsFound: string[],
  keywordsMissed: string[]
): string {
  const isMath = subject === '수학';
  const teacherPersona = isMath
    ? `당신은 15년 경력의 전문 수학 선생님입니다. 학생들이 수학 개념을 정확히 이해하고 표현하도록 돕는 것을 중요시합니다. 틀린 부분은 명확히 짚어주되, 격려와 함께 방향을 제시합니다.`
    : `당신은 경험 많은 ${subject} 선생님입니다. 학생이 개념을 제대로 이해했는지 확인하고, 핵심 용어를 정확히 사용하도록 격려합니다.`;

  const keywordContext =
    keywordsFound.length > 0 || keywordsMissed.length > 0
      ? `
[키워드 분석 결과]
- 학생이 포함한 핵심 키워드: ${keywordsFound.length > 0 ? keywordsFound.join(', ') : '없음'}
- 누락된 핵심 키워드: ${keywordsMissed.length > 0 ? keywordsMissed.join(', ') : '없음'}
`
      : '';

  return `${teacherPersona}

다음은 학생이 오늘 학습한 내용을 자신의 언어로 설명한 학습일지입니다.

[과목] ${subject}
[오늘 배운 개념] ${title}
[학생의 설명]
${content}
${keywordContext}
위 내용을 바탕으로 학생에게 아래 JSON 형식으로 피드백을 작성하세요. JSON 외 다른 텍스트는 절대 포함하지 마세요.

{
  "understanding": "잘 이해했어요" | "이해 중이에요" | "더 공부가 필요해요",
  "score": 1~5 사이의 정수 (1=매우 부족, 3=보통, 5=우수),
  "summary": "학생의 설명에 대한 피드백 (2~4문장). ${isMath ? '수학 선생님으로서 개념의 정확성, 용어 사용, 표현의 명확성을 중심으로 평가하세요. 필요시 올바른 수학적 표현도 알려주세요.' : '개념 이해도와 핵심 용어 사용을 중심으로 평가하세요.'} 친근하지만 전문적인 어조로 한국어로 작성하세요.",
  "growth": "${keywordsMissed.length > 0 ? `누락된 키워드(${keywordsMissed.slice(0, 3).join(', ')})를 활용해서 어떻게 더 발전할 수 있는지 1~2문장으로 작성하세요. 없으면 null.` : 'null'}",
  "childFriendlyFeedback": "학생이 작성한 설명이 초등학생도 쉽게 이해할 수 있는 수준인지 평가하는 피드백 (1~2문장). 비유가 좋으면 칭찬하고, 너무 어렵다면 더 쉽게 표현할 수 있는 방법을 제안하세요."
}`;
}

export async function POST(req: NextRequest) {
  try {
    const { subject, title, content } = await req.json();

    if (!subject || !title || !content) {
      return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    // 1. 키워드 분석 (로컬에서 즉시 처리)
    const { found, missed, score: keywordScore } = analyzeKeywords(subject, title, content);

    // 2. Gemini API 호출
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // API 키가 없으면 키워드 분석 기반 로컬 피드백 생성
      return NextResponse.json(generateLocalFeedback(subject, title, content, found, missed, keywordScore));
    }

    const prompt = buildPrompt(subject, title, content, found, missed);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', errText);
      // API 실패 시 로컬 피드백으로 대체
      return NextResponse.json(generateLocalFeedback(subject, title, content, found, missed, keywordScore));
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    let parsed: Partial<AiFeedback>;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.error('JSON parse error from Gemini:', rawText);
      return NextResponse.json(generateLocalFeedback(subject, title, content, found, missed, keywordScore));
    }

    const feedback: AiFeedback = {
      understanding: parsed.understanding ?? '이해 중이에요',
      score: parsed.score ?? 3,
      summary: parsed.summary ?? '분석을 완료했어요.',
      growth: parsed.growth ?? null,
      childFriendlyFeedback: parsed.childFriendlyFeedback ?? undefined,
      keywordsFound: found,
      keywordsMissed: missed,
      keywordScore,
    };

    return NextResponse.json(feedback);
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json({ error: '피드백 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

/** API 키 없이 키워드 점수 기반 로컬 피드백 생성 */
function generateLocalFeedback(
  subject: string,
  title: string,
  content: string,
  found: string[],
  missed: string[],
  keywordScore: number
): AiFeedback {
  const isMath = subject === '수학';
  const contentLen = content.length;

  // 점수 계산: 키워드 점수(60%) + 길이 점수(40%)
  const lengthScore = Math.min(contentLen / 200, 1); // 200자 이상이면 만점
  const totalScore = Math.round(keywordScore * 0.6 + lengthScore * 100 * 0.4);
  const score = Math.max(1, Math.min(5, Math.round(totalScore / 20)));

  const understanding: AiFeedback['understanding'] =
    keywordScore >= 70 ? '잘 이해했어요'
    : keywordScore >= 40 ? '이해 중이에요'
    : '더 공부가 필요해요';

  let summary = '';
  if (isMath) {
    if (keywordScore >= 70) {
      summary = `${title} 개념을 핵심 수학 용어를 잘 활용하여 설명했어요. ${found.length > 0 ? `특히 '${found.slice(0, 2).join("', '")}' 같은 개념어를 정확히 사용한 점이 좋습니다.` : ''} 수학적 표현력이 점점 향상되고 있어요!`;
    } else if (keywordScore >= 40) {
      summary = `${title}의 기본 흐름은 이해하고 있지만, 수학적으로 정확한 용어를 더 활용하면 좋겠어요. ${missed.length > 0 ? `'${missed.slice(0, 2).join("', '")}' 같은 핵심 용어를 내용에 포함해보세요.` : ''}`;
    } else {
      summary = `${title} 개념을 설명하는 데 핵심 수학 용어가 많이 빠져 있어요. 수학 선생님으로서 말씀드리면, 개념을 이해했다면 그에 맞는 정확한 용어도 함께 사용하는 것이 중요합니다!`;
    }
  } else {
    if (keywordScore >= 70) {
      summary = `${title} 주제를 핵심 개념어를 잘 활용하여 설명했어요! 내용 구성도 좋고, 자신의 언어로 잘 풀어냈습니다.`;
    } else if (keywordScore >= 40) {
      summary = `${title}에 대한 전반적인 이해는 되어 있지만, 핵심 개념어를 조금 더 활용해보세요. 용어를 정확히 사용하면 이해도가 훨씬 깊어집니다.`;
    } else {
      summary = `${title}의 핵심 용어를 일지에 적극 활용해보세요. 개념을 설명할 때 관련 용어를 정확히 쓰는 것이 학습에 큰 도움이 됩니다.`;
    }
  }

  const growth =
    missed.length > 0
      ? `다음에는 '${missed.slice(0, 3).join("', '")}' 개념어를 설명에 포함해서 더 완성도 높은 일지를 작성해보세요!`
      : null;

  return {
    understanding,
    score,
    summary,
    growth,
    childFriendlyFeedback: '초등학생 동생에게 설명하듯 조금 더 쉬운 비유와 예시를 사용해서 일지를 써보는 것도 연습해보세요!',
    keywordsFound: found,
    keywordsMissed: missed,
    keywordScore,
  };
}
