'use client';

interface Props {
  studyDates: string[];
  year: number;
  month: number;
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

  const recordCount = studyDates.filter(d => d.startsWith(`${year}-${String(month).padStart(2, '0')}`)).length;

  return (
    <div className="card-static p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-sub)' }}>
          {year}년 {month}월
        </span>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            border: '1px solid rgba(193, 123, 111, 0.15)',
          }}
        >
          {recordCount}일 기록
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-center text-xs py-1" style={{ color: 'var(--text-muted)' }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = dateSet.has(dateStr);
          const isToday = dateStr === today;

          return (
            <div
              key={dateStr}
              title={dateStr}
              className="aspect-square rounded-md flex items-center justify-center transition-all"
              style={{
                background: hasEntry
                  ? 'linear-gradient(135deg, var(--accent), #D4918A)'
                  : 'var(--bg)',
                border: isToday
                  ? '1.5px solid var(--accent)'
                  : '1px solid var(--border)',
                color: hasEntry ? '#fff' : 'var(--text-muted)',
                fontSize: '11px',
                fontWeight: hasEntry ? 600 : 400,
                boxShadow: hasEntry ? '0 2px 8px var(--accent-glow)' : 'none',
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4 justify-end">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>없음</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(135deg, var(--accent), #D4918A)' }} />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>기록</span>
        </div>
      </div>
    </div>
  );
}
