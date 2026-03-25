import Link from 'next/link';
import { Journal } from '@/types';
import { SUBJECT_COLORS } from '@/lib/constants';

const SCORE_LABEL: Record<number, string> = {
  5: '완벽해요', 4: '잘 했어요', 3: '괜찮아요', 2: '노력해요', 1: '다시 해봐요',
};

interface Props {
  journal: Journal;
}

export default function JournalCard({ journal }: Props) {
  const color = SUBJECT_COLORS[journal.subjectName] ?? '#6B7280';
  const date = new Date(journal.studyDate).toLocaleDateString('ko-KR', {
    month: 'long', day: 'numeric', weekday: 'short',
  });

  return (
    <Link href={`/journal/${journal.id}`}>
      <div
        className="rounded-xl p-4 transition-all cursor-pointer"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
              style={{ background: `${color}20`, color }}
            >
              {journal.subjectName}
            </span>
            <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
              {journal.title}
            </p>
            <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-sub)' }}>
              {journal.content}
            </p>
          </div>
          {journal.aiFeedback && (
            <div className="text-right shrink-0">
              <div className="font-display text-2xl" style={{ color: 'var(--accent)', lineHeight: 1 }}>
                {journal.aiFeedback.score}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-sub)' }}>
                {SCORE_LABEL[journal.aiFeedback.score]}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          {date}
        </div>
      </div>
    </Link>
  );
}
