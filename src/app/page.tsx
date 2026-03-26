import Link from 'next/link';
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import LoginButtons from '@/components/LoginButtons';

const FEATURES = [
  {
    icon: BookOpen,
    title: '일지 작성',
    desc: '오늘 배운 개념을 초등학생도 이해할 수 있게 설명해보세요. 파인만 기법으로 진짜 이해가 시작됩니다.',
  },
  {
    icon: Sparkles,
    title: 'AI 피드백',
    desc: 'AI가 내 글을 읽고 이해도를 평가해줘요. 어떤 부분을 더 공부해야 할지 알 수 있어요.',
  },
  {
    icon: TrendingUp,
    title: '성장 대시보드',
    desc: '꾸준히 기록한 흔적을 한눈에 확인하세요. 어제보다 나아진 내가 보입니다.',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Background warm gradient — soft peach glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 700px 500px at 50% 25%, rgba(242, 197, 168, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse 400px 300px at 75% 15%, rgba(232, 180, 174, 0.12) 0%, transparent 60%),
            linear-gradient(180deg, var(--gradient-start), var(--bg) 40%)
          `,
        }}
      />

      {/* 네비게이션 */}
      <nav className="header-blur px-6 py-4 flex items-center justify-between sticky top-0 z-10 anim-fade-in">
        <span className="font-display text-2xl font-bold" style={{ color: 'var(--accent)' }}>
          StudyLog
        </span>
        <Link
          href="/dashboard"
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
          style={{ color: 'var(--text-sub)', border: '1px solid var(--border)' }}
        >
          대시보드
        </Link>
      </nav>

      {/* Hero 섹션 */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative">
        {/* 배지 */}
        <div
          className="anim-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            border: '1px solid rgba(193, 123, 111, 0.2)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', animation: 'breathe 2s ease-in-out infinite' }} />
          파인만 기법 기반 학습일지
        </div>

        {/* 헤드라인 */}
        <h1
          className="anim-fade-in-up anim-delay-1 font-display text-5xl sm:text-7xl font-bold mb-4"
          style={{ color: 'var(--text)', lineHeight: 1.1 }}
        >
          오늘 배운 것,<br />
          <span style={{ color: 'var(--accent)' }}>5분으로</span> 내 것으로
        </h1>

        {/* 서브카피 */}
        <p
          className="anim-fade-in-up anim-delay-2 text-sm sm:text-base max-w-lg mt-6 leading-relaxed"
          style={{ color: 'var(--text-sub)' }}
        >
          초등학생도 이해할 수 있게 설명할 수 있다면, 진짜 아는 것입니다.<br />
          매일 5분, AI 피드백으로 메타인지를 키우세요.
        </p>

        {/* CTA 버튼 */}
        <LoginButtons />

        {/* 신뢰 문구 */}
        <p className="anim-fade-in-up anim-delay-4 text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          무료 · 광고 없음 · 개인정보 최소 수집
        </p>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-2xl px-6">
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
      </div>

      {/* Features 섹션 */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2
            className="anim-fade-in-up text-center text-xs font-semibold tracking-widest uppercase mb-10"
            style={{ color: 'var(--text-sub)' }}
          >
            핵심 기능
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`anim-fade-in-up anim-delay-${i + 5} card-glass p-6`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(193, 123, 111, 0.15)',
                  }}
                >
                  <f.icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="px-6 py-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        <div className="mb-3 mx-auto w-full max-w-md" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
        © 2026 StudyLog · 메타인지를 키우는 학습일지
      </footer>
    </main>
  );
}
