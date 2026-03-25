import { Journal, Subject } from '@/types';
import { MOCK_JOURNALS, MOCK_SUBJECTS } from './mockData';

const KEYS = {
  journals: 'studylog_journals',
  subjects: 'studylog_subjects',
};

function isClient() {
  return typeof window !== 'undefined';
}

export function getJournals(): Journal[] {
  if (!isClient()) return MOCK_JOURNALS;
  const raw = localStorage.getItem(KEYS.journals);
  return raw ? JSON.parse(raw) : MOCK_JOURNALS;
}

export function saveJournal(journal: Journal): void {
  if (!isClient()) return;
  const journals = getJournals();
  const updated = [journal, ...journals.filter(j => j.id !== journal.id)];
  localStorage.setItem(KEYS.journals, JSON.stringify(updated));
}

export function getJournalById(id: string): Journal | null {
  return getJournals().find(j => j.id === id) ?? null;
}

export function getSubjects(): Subject[] {
  if (!isClient()) return MOCK_SUBJECTS;
  const raw = localStorage.getItem(KEYS.subjects);
  return raw ? JSON.parse(raw) : MOCK_SUBJECTS;
}

export function saveSubjects(subjects: Subject[]): void {
  if (!isClient()) return;
  localStorage.setItem(KEYS.subjects, JSON.stringify(subjects));
}

export function getStudyDates(): string[] {
  return getJournals().map(j => j.studyDate);
}

// toISOString()은 UTC 기준이므로 KST(UTC+9) 사용자는 오전 9시 이전에 날짜가 하루 밀릴 수 있다.
// 이 헬퍼를 studyDate가 필요한 모든 곳에서 사용한다.
export function getLocalDateString(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
