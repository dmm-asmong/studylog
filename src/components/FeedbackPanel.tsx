import { AiFeedback } from '@/types';
import { Sparkles, TrendingUp } from 'lucide-react';

const UNDERSTANDING_CONFIG = {
  '잘 이해했어요': { color: '#10B981', bg: '#064E3B' },
  '이해 중이에요': { color: '#F59E0B', bg: '#451A03' },
  '더 공부가 필요해요': { color: '#EF4444', bg: '#450A0A' },
};

interface Props {
  feedback: AiFeedback;
}

export default function FeedbackPanel({ feedback }: Props) {
  const config = UNDERSTANDING_CONFIG[feedback.understanding];

  return (
    <div className="rounded-xl p-5 space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2">
        <Sparkles size={16} style={{ color: 'var(--accent)' }} />
        <span className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>AI 피드백</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: config.bg, color: config.color }}>
          {feedback.understanding}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-sm" style={{ background: i < feedback.score ? 'var(--accent)' : 'var(--border)' }} />
          ))}
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
        {feedback.summary}
      </p>

      {feedback.growth && (
        <div className="rounded-lg p-3 flex gap-2" style={{ background: 'var(--bg)', borderLeft: '3px solid var(--accent)' }}>
          <TrendingUp size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
          <p className="text-sm" style={{ color: 'var(--text-sub)' }}>{feedback.growth}</p>
        </div>
      )}
    </div>
  );
}
