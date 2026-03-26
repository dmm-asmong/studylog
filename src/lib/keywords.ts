/**
 * 과목별 핵심 키워드 데이터베이스
 * 각 과목의 대표 개념과 그에 연관된 핵심 키워드 목록
 */

export interface KeywordEntry {
  /** 관련 개념어들 (제목 매칭용) */
  triggers: string[];
  /** 이 개념을 설명할 때 반드시 포함해야 할 핵심 키워드들 */
  keywords: string[];
}

/** 과목별 키워드 사전 */
export const SUBJECT_KEYWORDS: Record<string, KeywordEntry[]> = {
  수학: [
    {
      triggers: ['이차방정식', '근의 공식', '판별식'],
      keywords: ['이차방정식', '근의 공식', '판별식', 'ax²', 'bx', '근', '해', '두 근', '실근', '허근'],
    },
    {
      triggers: ['일차방정식', '방정식', '등식'],
      keywords: ['일차방정식', '미지수', '등식', '이항', '해', '양변', '계수'],
    },
    {
      triggers: ['인수분해', '공통인수'],
      keywords: ['인수분해', '인수', '공통인수', '완전제곱식', '합차공식', '근'],
    },
    {
      triggers: ['함수', '일차함수', '이차함수'],
      keywords: ['함수', '정의역', '치역', '그래프', '기울기', '절편', 'y절편', 'x절편', '대칭축'],
    },
    {
      triggers: ['피타고라스', '직각삼각형'],
      keywords: ['피타고라스', '직각삼각형', '빗변', '직각', '제곱', '넓이'],
    },
    {
      triggers: ['삼각형', '닮음', '합동'],
      keywords: ['삼각형', '합동', '닮음', '대응각', '대응변', '닮음비', 'SSS', 'SAS', 'ASA'],
    },
    {
      triggers: ['원주율', '원', '넓이', '둘레'],
      keywords: ['원주율', '반지름', '지름', '원주', '넓이', 'π'],
    },
    {
      triggers: ['비례식', '비', '비율'],
      keywords: ['비례식', '비', '비율', '전항', '후항', '내항', '외항'],
    },
    {
      triggers: ['확률', '통계', '경우의 수'],
      keywords: ['확률', '경우의 수', '사건', '표본공간', '전사건'],
    },
    {
      triggers: ['도형', '각', '다각형', '사각형'],
      keywords: ['내각', '외각', '대각선', '정다각형', '합동', '대칭'],
    },
    {
      triggers: ['집합', '원소', '부분집합'],
      keywords: ['집합', '원소', '부분집합', '합집합', '교집합', '차집합', '여집합'],
    },
    {
      triggers: ['좌표', '좌표평면', '그래프'],
      keywords: ['좌표', 'x축', 'y축', '원점', '사분면', '좌표평면'],
    },
    {
      triggers: ['소수', '합성수', '소인수분해'],
      keywords: ['소수', '합성수', '인수', '소인수분해', '최대공약수', '최소공배수'],
    },
    {
      triggers: ['정수', '유리수', '실수', '수'],
      keywords: ['정수', '유리수', '무리수', '실수', '절댓값', '수직선'],
    },
    {
      triggers: ['연립방정식', '연립'],
      keywords: ['연립방정식', '가감법', '대입법', '해', '미지수'],
    },
  ],

  영어: [
    {
      triggers: ['현재완료', 'have', 'has', 'p.p.'],
      keywords: ['현재완료', '과거분사', '경험', '완료', '계속', '결과', 'have', 'has'],
    },
    {
      triggers: ['수동태', '능동태'],
      keywords: ['수동태', '능동태', 'be동사', '과거분사', '행위자', 'by'],
    },
    {
      triggers: ['관계대명사', '관계절'],
      keywords: ['관계대명사', '선행사', 'who', 'which', 'that', '관계절'],
    },
    {
      triggers: ['가정법', '조건문'],
      keywords: ['가정법', '가정법과거', '가정법과거완료', 'if', 'would', 'could'],
    },
    {
      triggers: ['시제', '과거', '미래', '현재'],
      keywords: ['시제', '현재시제', '과거시제', '미래시제', '진행형', '완료형'],
    },
    {
      triggers: ['부정사', '동명사', 'to부정사'],
      keywords: ['부정사', '동명사', 'to+동사원형', '명사적용법', '형용사적용법', '부사적용법'],
    },
  ],

  국어: [
    {
      triggers: ['은유', '직유', '비유'],
      keywords: ['은유', '직유', '비유', '원관념', '보조관념'],
    },
    {
      triggers: ['품사', '명사', '동사', '형용사'],
      keywords: ['품사', '명사', '동사', '형용사', '부사', '조사', '어미'],
    },
    {
      triggers: ['주제', '중심 내용', '글의 구조'],
      keywords: ['주제', '중심 문장', '뒷받침 문장', '도입', '전개', '결말'],
    },
    {
      triggers: ['소설', '인물', '배경', '사건'],
      keywords: ['인물', '배경', '사건', '갈등', '주제', '서술자'],
    },
    {
      triggers: ['시', '운율', '이미지'],
      keywords: ['운율', '이미지', '화자', '시상', '리듬', '반복'],
    },
  ],

  과학: [
    {
      triggers: ['세포분열', '체세포', '감수분열'],
      keywords: ['체세포분열', '감수분열', '염색체', '염색분체', 'DNA', '핵분열', '세포질분열'],
    },
    {
      triggers: ['광합성', '식물', '엽록체'],
      keywords: ['광합성', '엽록체', '이산화탄소', '포도당', '산소', '빛에너지'],
    },
    {
      triggers: ['소화', '소화계', '영양소'],
      keywords: ['소화', '소화효소', '흡수', '탄수화물', '단백질', '지방', '소장'],
    },
    {
      triggers: ['힘', '운동', '속도', '가속도'],
      keywords: ['힘', '속도', '가속도', '관성', '작용반작용', 'F=ma'],
    },
    {
      triggers: ['화학반응', '산화', '환원'],
      keywords: ['화학반응', '산화', '환원', '산화제', '환원제', '전자'],
    },
    {
      triggers: ['전기', '전류', '전압', '저항'],
      keywords: ['전류', '전압', '저항', '옴의 법칙', '직렬', '병렬'],
    },
  ],

  사회: [
    {
      triggers: ['민주주의', '민주정치'],
      keywords: ['민주주의', '주권', '법치주의', '인권', '선거', '참정권'],
    },
    {
      triggers: ['경제', '시장', '수요', '공급'],
      keywords: ['수요', '공급', '시장가격', '균형', '인플레이션', '경제성장'],
    },
    {
      triggers: ['세계화', '글로벌'],
      keywords: ['세계화', '국제교류', '다국적기업', '문화교류', '빈부격차'],
    },
    {
      triggers: ['역사', '조선', '고려', '삼국'],
      keywords: ['왕조', '건국', '중앙집권', '신분제', '문화'],
    },
  ],
};

/**
 * 제목과 과목을 기반으로 관련 핵심 키워드 목록을 반환합니다.
 */
export function getRelevantKeywords(subject: string, title: string): string[] {
  const entries = SUBJECT_KEYWORDS[subject];
  if (!entries) return [];

  const titleLower = title.toLowerCase();
  const matched: string[] = [];

  for (const entry of entries) {
    const isMatch = entry.triggers.some(trigger =>
      titleLower.includes(trigger.toLowerCase())
    );
    if (isMatch) {
      matched.push(...entry.keywords);
    }
  }

  // 매칭된 키워드가 없으면 과목 전체 키워드에서 샘플링
  if (matched.length === 0 && entries.length > 0) {
    return entries[0].keywords;
  }

  return [...new Set(matched)]; // 중복 제거
}

/**
 * 학생이 작성한 내용에서 핵심 키워드를 찾아 분석합니다.
 */
export function analyzeKeywords(
  subject: string,
  title: string,
  content: string
): {
  found: string[];
  missed: string[];
  score: number;
} {
  const relevantKeywords = getRelevantKeywords(subject, title);
  if (relevantKeywords.length === 0) {
    return { found: [], missed: [], score: 100 };
  }

  const contentLower = content.toLowerCase();
  const found: string[] = [];
  const missed: string[] = [];

  for (const kw of relevantKeywords) {
    if (contentLower.includes(kw.toLowerCase())) {
      found.push(kw);
    } else {
      missed.push(kw);
    }
  }

  const score = Math.round((found.length / relevantKeywords.length) * 100);
  return { found, missed, score };
}
