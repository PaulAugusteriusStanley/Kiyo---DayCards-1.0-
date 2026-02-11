
import React, { useState } from 'react';
import { getMonday, isDateGolden } from '../utils/storage';

interface MonthViewProps {
  currentDate: Date;
  onSelectWeek: (date: Date) => void;
  onClose: () => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, onSelectWeek, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const year = viewDate.getFullYear();

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    // Adjust to start from Monday
    let startOffset = date.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1;

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const isCurrentWeek = (date: Date | null) => {
    if (!date) return false;
    const targetMonday = getMonday(date);
    const currentMonday = getMonday(currentDate);
    return targetMonday.getTime() === currentMonday.getTime();
  };

  return (
    <div className="fixed inset-0 bg-[#fdfaf5] z-50 flex flex-col items-center p-8 animate-in fade-in duration-500 overflow-y-auto">
      <header className="w-full max-w-sm flex justify-between items-center mb-12 mt-12">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:opacity-50 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-center">
          <h2 className="font-kiyo text-3xl lowercase text-[#7b8a78]">{monthName}</h2>
          <span className="text-[12px] uppercase tracking-[0.2em] text-[#a5a58d] opacity-60">{year}</span>
        </div>
        <button onClick={() => changeMonth(1)} className="p-2 hover:opacity-50 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </header>

      <div className="w-full max-w-sm grid grid-cols-7 gap-y-2 text-center mb-12">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="text-[10px] font-bold text-[#1a2b4b] opacity-30 mb-4">{d}</span>
        ))}
        {days.map((date, i) => {
          const active = isCurrentWeek(date);
          const golden = date ? isDateGolden(date) : false;
          
          return (
            <button
              key={i}
              onClick={() => date && onSelectWeek(date)}
              className={`h-12 flex items-center justify-center rounded-xl transition-all relative group
                ${!date ? 'pointer-events-none' : 'hover:bg-[#1a2b4b] hover:bg-opacity-5'}
                ${active ? 'bg-[#1a2b4b] bg-opacity-[0.03]' : ''}
              `}
            >
              {date && (
                <>
                  <span className={`text-lg transition-colors ${
                    golden ? 'font-bold text-[#E6B325]' : 
                    active ? 'font-bold text-[#1a2b4b]' : 
                    'text-[#1a2b4b] opacity-60'
                  }`}>
                    {date.getDate()}
                  </span>
                  
                  {golden && (
                    <div className="absolute bottom-2 w-1 h-1 bg-[#E6B325] rounded-full shadow-[0_0_6px_rgba(230,179,37,0.4)]"></div>
                  )}
                  
                  {active && !golden && (
                    <div className="absolute bottom-2 w-1 h-1 bg-[#7b8a78] rounded-full"></div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      <button 
        onClick={onClose}
        className="mt-8 mb-12 px-8 py-3 rounded-full border border-[#1a2b4b] border-opacity-10 text-[12px] uppercase tracking-[0.3em] text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white transition-all"
      >
        Close
      </button>
    </div>
  );
};

export default MonthView;
