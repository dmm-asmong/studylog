'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import SubjectSelector from '@/components/SubjectSelector';
import ExampleToggle from '@/components/ExampleToggle';
import { createClient } from '@/lib/supabase/client';
import { Subject, AiFeedback } from '@/types';
import { SUBJECT_COLORS } from '@/lib/constants';

function getLocalDateString() {
  return new Date().toLocaleDateString('sv-SE');
}

export default function JournalNewPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selected, setSelected] = useState<Subject | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace('/'); return; }
      setUserId(user.id);

      const { data } = await supabase
        .from('subjects')
        .select('id, name, color')
        .eq('user_id', user.id)
        .order('created_at');

      if (data) {
        setSubjects(data.map(s => ({ id: s.id, name: s.name, color: s.color })));
      }
    }
    init();
  }, []);

  const canSubmit = selected && title.trim() && content.trim().length >= 20;
  const charProgress = Math.min(content.length / 20, 1);

  async function handleAddSubject(subject: Subject) {
    const colorHex = SUBJECT_COLORS[subject.name] ?? '#6B7280';
    const { data } = await supabase
      .from('subjects')
      .insert({ user_id: userId, name: subject.name, color: colorHex })
      .select('id, name, color')
      .single();

    if (data) {
      const newSubject = { id: data.id, name: data.name, color: data.color };
      setSubjects(prev => [...prev, newSubject]);
      return newSubject;
    }
    return subject;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError('');

    // 1. 일지 먼저 저장
    const { data: savedJournal, error: saveError } = await supabase
      .from('journals')
      .insert({
        user_id: userId,
        subject_id: selected!.id,
        title: title.trim(),
        content: content.trim(),
        study_date: getLocalDateString(),
        ai_feedback: null,
      })
      .select('id')
      .single();

    if (saveError || !savedJournal) {
      setError('일지 저장에 실패했어요. 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    // 2. AI 피드백 생성
    let aiFeedback: AiFeedback | null = null;
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selected!.name,
          title: title.trim(),
          content: content.trim(),
        }),
      });
      if (res.ok) {
        aiFeedback = await res.json();
      } else {
        setError('AI 피드백 생성에 실패했어요. 저장은 정상적으로 됩니다.');
      }
    } catch {
      setError('네트워크 오류가 발생했어요. 저장은 정상적으로 됩니다.');
    }

    // 3. 피드백 업데이트
    if (aiFeedback) {
      await supabase
        .from('journals')
        .update({ ai_feedback: aiFeedback })
        .eq('id', savedJournal.id);
    }

    router.push(`/journal/${savedJournal.id}`);
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 400px 300px at 50% 40%, rgba(242, 197, 168, 0.1) 0%, transparent 70%)' }}
      />

      <header className="header-blur px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard" className="p-1 rounded-lg transition-all" style={{ color: 'var(--text-sub)' }}>
          <ArrowLeft size={20} />
        </Link>
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>오늘의 학습일지</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 relative">
        <form onSubmit={handleSubmit} className="space-y-6 anim-fade-in-up">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>과목</label>
            <SubjectSelector
              subjects={subjects}
              selected={selected}
              onChange={setSelected}
              onAddSubject={async (subject) => {
                const saved = await handleAddSubject(subject);
                setSelected(saved);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>
              오늘 배운 핵심 개념은?
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="예: 이차방정식의 근의 공식"
              className="w-full px-4 py-3 text-sm input-glow"
              style={{ color: 'var(--text)' }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-sub)' }}>
                초등학생한테 설명하듯 써보세요
              </label>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${charProgress * 100}%`, background: charProgress >= 1 ? 'var(--accent)' : 'var(--warm)' }}
                  />
                </div>
                <span className="text-xs tabular-nums" style={{ color: content.length >= 20 ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {content.length}자
                </span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="오늘 배운 내용을 쉬운 말로 풀어보세요. 복잡한 용어 없이, 친구에게 설명하듯이 써도 좋아요."
              rows={8}
              className="w-full px-4 py-3 text-sm resize-none leading-relaxed input-glow"
              style={{ color: 'var(--text)' }}
            />
            <div className="mt-3"><ExampleToggle /></div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: canSubmit ? 'var(--accent)' : 'var(--border)',
                color: canSubmit ? '#fff' : 'var(--text-muted)',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                boxShadow: canSubmit ? '0 4px 20px var(--accent-glow)' : 'none',
              }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />AI 피드백 생성 중...</>
              ) : (
                <><Send size={16} />저장하고 피드백 받기</>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
