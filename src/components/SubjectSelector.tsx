'use client';

import { useState } from 'react';
import { ChevronDown, Plus, X, Check } from 'lucide-react';
import { Subject } from '@/types';
import { SUBJECT_COLORS } from '@/lib/constants';

interface Props {
  subjects: Subject[];
  selected: Subject | null;
  onChange: (subject: Subject) => void;
  onAddSubject?: (subject: Subject) => void;
}

export default function SubjectSelector({ subjects, selected, onChange, onAddSubject }: Props) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    const newSubject: Subject = { id: `s${Date.now()}`, name, color: 'gray' };
    onAddSubject?.(newSubject);
    onChange(newSubject);
    setNewName('');
    setAdding(false);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all"
        style={{
          background: 'var(--card)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          color: selected ? 'var(--text)' : 'var(--text-sub)',
        }}
      >
        <span className="flex items-center gap-2">
          {selected && (
            <span className="w-2 h-2 rounded-full" style={{ background: SUBJECT_COLORS[selected.name] ?? '#6B7280' }} />
          )}
          {selected ? selected.name : '과목을 선택하세요'}
        </span>
        <ChevronDown
          size={16}
          style={{ color: 'var(--text-sub)', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 w-full rounded-xl overflow-hidden z-10"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          {subjects.map(subject => (
            <button
              key={subject.id}
              type="button"
              onClick={() => { onChange(subject); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: SUBJECT_COLORS[subject.name] ?? '#6B7280' }} />
              {subject.name}
            </button>
          ))}
          <div className="border-t" style={{ borderColor: 'var(--border)' }}>
            {adding ? (
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  autoFocus
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setAdding(false); }}
                  placeholder="과목명 입력"
                  className="flex-1 px-2 py-1 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--accent)' }}
                />
                <button type="button" onClick={handleAdd} style={{ color: 'var(--accent)' }}>
                  <Check size={16} />
                </button>
                <button type="button" onClick={() => setAdding(false)} style={{ color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm"
                style={{ color: 'var(--accent)' }}
              >
                <Plus size={14} />
                새 과목 추가
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
