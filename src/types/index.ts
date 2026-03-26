export type Subject = {
  id: string;
  name: string;
  color: string;
};

export type Journal = {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  content: string;
  studyDate: string; // 'YYYY-MM-DD'
  createdAt: string; // ISO string
  aiFeedback: AiFeedback | null;
};

export type AiFeedback = {
  understanding: '잘 이해했어요' | '이해 중이에요' | '더 공부가 필요해요';
  score: number; // 1-5
  summary: string;
  growth: string | null;
  childFriendlyFeedback?: string; // 초등학생 눈높이 설명에 대한 피드백
  // 키워드 분석 결과
  keywordsFound?: string[];    // 학생이 사용한 핵심 키워드
  keywordsMissed?: string[];   // 누락된 핵심 키워드
  keywordScore?: number;       // 0-100, 키워드 포함 비율
};
