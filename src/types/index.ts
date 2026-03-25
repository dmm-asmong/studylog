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
};
