import { AiFeedback } from '@/types';
import { Sparkles, TrendingUp, CheckCircle2, XCircle, Tag, Smile } from 'lucide-react';

const UNDERSTANDING_CONFIG: Record<AiFeedback['understanding'], { color: string; bg: string; border: string }> = {
  '잘 이해했어요': { color: '#2D8A56', bg: '#E6F5EC', border: '#2D8A5620' },
  '이해 중이에요': { color: '#B8860B', bg: '#FFF8E6', border: '#B8860B20' },
  '더 공부가 필요해요': { color: '#C75050', bg: '#FDECEC', border: '#C7505020' },
};

interface Props {
  feedback: AiFeedback;
}

export default function FeedbackPanel({ feedback }: Props) {
  const config = UNDERSTANDING_CONFIG[feedback.understanding];
  const hasKeywords =
    (feedback.keywordsFound && feedback.keywordsFound.length > 0) ||
    (feedback.keywordsMissed && feedback.keywordsMissed.length > 0);

  return (
    <div
      className="rounded-2xl p-6 space-y-5 relative overflow-hidden"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Subtle top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(193, 123, 111, 0.25), transparent)' }}
      />

      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--accent-dim)', border: '1px solid rgba(193, 123, 111, 0.15)' }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
        </div>
        <span className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>AI 피드백</span>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium px-3 py-1.5 rounded-full"
          style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}
        >
          {feedback.understanding}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-md transition-all"
              style={{
                background: i < feedback.score
                  ? 'linear-gradient(135deg, var(--accent), #D4918A)'
                  : 'var(--bg)',
                border: i < feedback.score ? 'none' : '1px solid var(--border)',
                boxShadow: i < feedback.score ? '0 1px 4px var(--accent-glow)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
        {feedback.summary}
      </p>

      {/* 초등학생 눈높이 피드백 섹션 */}
      {feedback.childFriendlyFeedback && (
        <div
          className="rounded-xl p-4 flex gap-3"
          style={{
            background: 'var(--accent-dim)',
            borderLeft: '3px solid #ff9dbb', // 따뜻하고 부드러운 핑크빛
          }}
        >
          <Smile size={18} color="#ff9dbb" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div className="space-y-1">
            <p className="text-xs font-semibold" style={{ color: '#ff7a9f' }}>초등학생 눈높이 피드백</p>
            <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
              {feedback.childFriendlyFeedback}
            </p>
          </div>
        </div>
      )}

      {/* 키워드 분석 섹션 */}
      {hasKeywords && (
        <div
          className="rounded-xl p-4 space-y-3"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <Tag size={13} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>
              핵심 키워드 분석
            </span>
            {feedback.keywordScore !== undefined && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background:
                    feedback.keywordScore >= 70 ? '#E6F5EC'
                    : feedback.keywordScore >= 40 ? '#FFF8E6'
                    : '#FDECEC',
                  color:
                    feedback.keywordScore >= 70 ? '#2D8A56'
                    : feedback.keywordScore >= 40 ? '#B8860B'
                    : '#C75050',
                }}
              >
                {feedback.keywordScore}%
              </span>
            )}
          </div>

          {feedback.keywordsFound && feedback.keywordsFound.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={12} color="#2D8A56" />
                <span className="text-xs font-medium" style={{ color: '#2D8A56' }}>포함된 키워드</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {feedback.keywordsFound.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#E6F5EC', color: '#2D8A56', border: '1px solid #2D8A5620' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {feedback.keywordsMissed && feedback.keywordsMissed.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <XCircle size={12} color="#C75050" />
                <span className="text-xs font-medium" style={{ color: '#C75050' }}>보완이 필요한 키워드</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {feedback.keywordsMissed.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#FDECEC', color: '#C75050', border: '1px solid #C7505020' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {feedback.growth && (
        <div
          className="rounded-xl p-4 flex gap-3"
          style={{
            background: 'var(--accent-dim)',
            borderLeft: '3px solid var(--accent)',
          }}
        >
          <TrendingUp size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
          <p className="text-sm" style={{ color: 'var(--text-sub)' }}>{feedback.growth}</p>
        </div>
      )}
    </div>
  );
}
