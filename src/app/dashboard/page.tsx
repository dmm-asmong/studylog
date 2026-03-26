'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut, Flame } from 'lucide-react';
import ContributionCalendar from '@/components/ContributionCalendar';
import JournalCard from '@/components/JournalCard';
import { createClient } from '@/lib/supabase/client';
import { Journal } from '@/types';

function getLocalDateString() {
  return new Date().toLocaleDateString('sv-SE'); // 'YYYY-MM-DD'
}

function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...new Set(dates)].sort().reverse();
  const today = getLocalDateString();
  if (sorted[0] !== today) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/');
        return;
      }

      setUserName(user.user_metadata?.full_name?.split(' ')[0] ?? '');

      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
        .toLocaleDateString('sv-SE');

      const { data: rawJournals } = await supabase
        .from('journals')
        .select('id, title, content, study_date, created_at, ai_feedback, subjects(id, name, color)')
        .eq('user_id', user.id)
        .order('study_date', { ascending: false })
        .limit(5);

      const { data: calendarDates } = await supabase
        .from('journals')
        .select('study_date')
        .eq('user_id', user.id)
        .gte('study_date', firstDay);

      if (rawJournals) {
        const mapped: Journal[] = rawJournals.map((j: any) => ({
          id: j.id,
          subjectId: j.subjects?.id ?? '',
          subjectName: j.subjects?.name ?? '',
          title: j.title,
          content: j.content,
          studyDate: j.study_date,
          createdAt: j.created_at,
          aiFeedback: j.ai_feedback ?? null,
        }));
        setJournals(mapped);
      }

      if (calendarDates) {
        setStudyDates(calendarDates.map((d: any) => d.study_date));
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const today = new Date();
  const streak = calcStreak(studyDates);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 500px 300px at 20% 10%, rgba(242, 197, 168, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 300px 200px at 80% 80%, rgba(214, 235, 248, 0.2) 0%, transparent 60%)
          `,
        }}
      />

      <header className="header-blur px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="font-display text-xl font-bold" style={{ color: 'var(--accent)' }}>
          StudyLog
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--text-sub)' }}>
            {today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
          </span>
          <button onClick={handleSignOut} className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--text-muted)' }}>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8 relative">
        <div className="anim-fade-in-up">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            {userName ? `안녕하세요, ${userName}님 👋` : '안녕하세요 👋'}
          </h1>
          {streak > 0 ? (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{ background: 'var(--warm-dim)', color: '#C17B6F', border: '1px solid rgba(242, 197, 168, 0.4)' }}
            >
              <Flame size={14} />
              {streak}일 연속 기록 중! 오늘도 화이팅!
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-sub)' }}>오늘의 학습을 기록해보세요.</p>
          )}
        </div>

        <div className="anim-fade-in-up anim-delay-1">
          <ContributionCalendar
            studyDates={studyDates}
            year={today.getFullYear()}
            month={today.getMonth() + 1}
          />
        </div>

        <div className="anim-fade-in-up anim-delay-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>최근 일지</h2>
            <button className="text-xs font-medium transition-colors" style={{ color: 'var(--accent)' }}>전체 보기</button>
          </div>

          {journals.length > 0 ? (
            <div className="space-y-3">
              {journals.map((j, i) => (
                <div key={j.id} className={`anim-fade-in-up anim-delay-${Math.min(i + 3, 7)}`}>
                  <JournalCard journal={j} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card-static p-8 text-center" style={{ border: '1px dashed var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
                아직 작성한 일지가 없어요.<br />첫 번째 일지를 작성해보세요!
              </p>
            </div>
          )}
        </div>

        <div className="fixed bottom-6 right-6 z-20" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <Link
            href="/journal/new"
            className="btn-primary flex items-center gap-2 px-5 py-3"
            style={{ boxShadow: '0 4px 20px var(--accent-glow), 0 8px 32px rgba(193, 123, 111, 0.12)' }}
          >
            <PlusCircle size={18} />
            오늘 일지 쓰기
          </Link>
        </div>
      </main>
    </div>
  );
}
