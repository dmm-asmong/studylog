'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ExampleToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm"
        style={{ background: 'var(--card)', color: 'var(--text-sub)' }}
      >
        <span>예시 보기</span>
        <ChevronDown
          size={16}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4" style={{ background: 'var(--card)' }}>
          <div className="rounded-lg p-3 text-sm" style={{ background: 'var(--bg)', borderLeft: '3px solid var(--accent)' }}>
            <p className="font-medium mb-1" style={{ color: 'var(--accent)' }}>과목: 수학</p>
            <p className="font-medium mb-2" style={{ color: 'var(--text)' }}>제목: 이차방정식의 근의 공식</p>
            <p style={{ color: 'var(--text-sub)', lineHeight: '1.6' }}>
              이차방정식 ax²+bx+c=0에서 x를 구하는 공식이에요.
              초등학생한테 설명하면, &quot;x라는 모르는 숫자를 찾는 마법 공식&quot;이라고 할 수 있어요.
              판별식(b²-4ac)이 0보다 크면 답이 두 개, 0이면 딱 하나, 0보다 작으면 답이 없어요.
            </p>
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            💡 &quot;초등학생도 이해할 수 있게&quot; 쓰는 게 핵심이에요!
          </p>
        </div>
      )}
    </div>
  );
}
