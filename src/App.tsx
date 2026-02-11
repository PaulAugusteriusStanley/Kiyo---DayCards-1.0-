
import React, { useState, useEffect, useCallback } from 'react';
import { DayData, WeekData } from './types';
import DayCard from './components/DayCard';
import MonthView from './components/MonthView';
import { getInitialData, saveToStorage, getMonday } from './utils/storage';

const App: React.FC = () => {
  const [week, setWeek] = useState<WeekData>([]);
  // Initialize to the Monday of the current week
  const [currentWeekMonday, setCurrentWeekMonday] = useState<Date>(() => getMonday(new Date()));
  const [view, setView] = useState<'week' | 'month'>('week');

  useEffect(() => {
    setWeek(getInitialData(currentWeekMonday));
  }, [currentWeekMonday]);

  const updateDay = useCallback((dayId: string, updatedDay: Partial<DayData>) => {
    setWeek(prev => {
      const newWeek = prev.map(day => day.id === dayId ? { ...day, ...updatedDay } : day);
      saveToStorage(currentWeekMonday, newWeek);
      return newWeek;
    });
  }, [currentWeekMonday]);

  const handleSelectWeek = (date: Date) => {
    const monday = getMonday(date);
    setCurrentWeekMonday(monday);
    setView('week');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto px-8 py-20 md:py-32 flex flex-col items-center select-none">
      <header className="mb-20 text-center flex flex-col items-center">
        <h1 className="font-kiyo text-7xl font-light tracking-[0.1em] text-[#7b8a78] mb-1 lowercase opacity-90">kiyo</h1>
        <p className="font-kiyo italic text-[14px] tracking-[0.2em] text-[#a5a58d] opacity-70 mb-8">weekly intentions</p>
        
        <button 
          onClick={() => setView('month')}
          className="group flex flex-col items-center gap-1.5 p-4 transition-all hover:scale-110 active:scale-95"
          aria-label="Toggle Monthly View"
        >
          <div className="w-6 h-[1.5px] bg-[#1a2b4b] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-6 h-[1.5px] bg-[#1a2b4b] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-6 h-[1.5px] bg-[#1a2b4b] opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </button>
      </header>

      {view === 'week' ? (
        <div className="w-full space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {week.map(day => (
            <DayCard 
              key={day.id} 
              day={day} 
              onUpdate={(updates) => updateDay(day.id, updates)} 
            />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <MonthView 
            currentDate={currentWeekMonday} 
            onSelectWeek={handleSelectWeek} 
            onClose={() => setView('week')} 
          />
        </div>
      )}

      <footer className="mt-48 mb-32 text-center flex flex-col items-center">
        <div className="text-[11px] text-[#cbcbb9] font-medium uppercase tracking-[0.8em] opacity-40">
          &mdash; kiyo &mdash;
        </div>
        <div className="mt-4 text-[9px] text-[#cbcbb9] font-medium uppercase tracking-[0.4em] opacity-30">
          by augusterius
        </div>
      </footer>
    </div>
  );
};

export default App;
