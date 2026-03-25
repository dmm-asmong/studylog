'use client';

interface Props {
  studyDates: string[];
  year: number;
  month: number; // 1-12
}

export default function ContributionCalendar({ studyDates, year, month }: Props) {
  const dateSet = new Set(studyDates);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  return (
    <div className="p-4 rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium" style={{ color: 'var(--text-sub)' }}>
          {year}년 {month}월
        </span>
        <span className="text-xs" style={{ color: 'var(--accent)' }}>
          {studyDates.filter(d => d.startsWith(`${year}-${String(month).padStart(2, '0')}`)).length}일 기록
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = dateSet.has(dateStr);
          const isToday = dateStr === today;
          return (
            <div
              key={dateStr}
              title={dateStr}
              className="aspect-square rounded-sm flex items-center justify-center transition-all"
              style={{
                background: hasEntry ? 'var(--accent)' : 'var(--bg)',
                border: isToday ? '1px solid var(--accent)' : '1px solid transparent',
                color: hasEntry ? '#000' : 'var(--text-muted)',
                fontSize: '11px',
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-3 justify-end">
        <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }} />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>없음</span>
        <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--accent)' }} />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>기록</span>
      </div>
    </div>
  );
}
