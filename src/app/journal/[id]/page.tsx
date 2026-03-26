'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, PenLine } from 'lucide-react';
import FeedbackPanel from '@/components/FeedbackPanel';
import { createClient } from '@/lib/supabase/client';
import { SUBJECT_COLORS } from '@/lib/constants';
import { Journal } from '@/types';

export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('journals')
        .select('id, title, content, study_date, created_at, ai_feedback, subjects(id, name, color)')
        .eq('id', id)
        .single();

      if (data) {
        setJournal({
          id: data.id,
          subjectId: (data.subjects as any)?.id ?? '',
          subjectName: (data.subjects as any)?.name ?? '',
          title: data.title,
          content: data.content,
          studyDate: data.study_date,
          createdAt: data.created_at,
          aiFeedback: data.ai_feedback ?? null,
        });
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center anim-fade-in">
          <p className="text-lg mb-2" style={{ color: 'var(--text-sub)' }}>일지를 찾을 수 없어요.</p>
          <Link href="/dashboard" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const color = SUBJECT_COLORS[journal.subjectName] ?? '#9E8E8E';
  const date = new Date(journal.studyDate + 'T00:00:00').toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 500px 300px at 30% 20%, ${color}10 0%, transparent 70%),
            radial-gradient(ellipse 300px 200px at 70% 70%, rgba(242, 197, 168, 0.08) 0%, transparent 60%)
          `,
        }}
      />

      <header className="header-blur px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard" className="p-1 rounded-lg transition-all" style={{ color: 'var(--text-sub)' }}>
          <ArrowLeft size={20} />
        </Link>
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>일지 상세</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6 relative">
        <div className="anim-fade-in-up">
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
          >
            {journal.subjectName}
          </span>
          <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{journal.title}</h1>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            {date}
          </div>
        </div>

        <div className="anim-fade-in-up anim-delay-1 card-static p-6">
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-sub)' }}>
            {journal.content}
          </p>
        </div>

        <div className="anim-fade-in-up anim-delay-2">
          {journal.aiFeedback ? (
            <FeedbackPanel feedback={journal.aiFeedback} />
          ) : (
            <div className="card-static p-5 text-center" style={{ border: '1px dashed var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
                피드백을 일시적으로 받을 수 없어요. 잠시 후 다시 시도해주세요.
              </p>
            </div>
          )}
        </div>

        <div className="anim-fade-in-up anim-delay-3 pt-4 pb-8">
          <Link
            href="/journal/new"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all btn-ghost"
            style={{ color: 'var(--accent)' }}
          >
            <PenLine size={15} />
            새 일지 쓰기
          </Link>
        </div>
      </main>
    </div>
  );
}
