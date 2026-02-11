
import { WeekData, Anchor, DayData } from '../types';

const STORAGE_PREFIX = 'kiyo_week_v2_';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Normalizes any date to the Monday of its week in local time.
 */
export const getMonday = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 (Sun) to 6 (Sat)
  // Shift: Mon -> 0, Tue -> -1, ..., Sun -> -6
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d;
};

export const getWeekId = (date: Date): string => {
  const monday = getMonday(date);
  const y = monday.getFullYear();
  const m = String(monday.getMonth() + 1).padStart(2, '0');
  const d = String(monday.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const createEmptyAnchors = (): Anchor[] => [
  { text: '', description: '', color: 'transparent' },
  { text: '', description: '', color: 'transparent' },
  { text: '', description: '', color: 'transparent' }
];

export const getInitialData = (startDate: Date): WeekData => {
  const monday = getMonday(startDate);
  const weekId = getWeekId(monday);
  
  const saved = localStorage.getItem(STORAGE_PREFIX + weekId);
  if (saved) return JSON.parse(saved);

  return DAYS.map((dayName, idx) => {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + idx);
    
    const dayNum = currentDay.getDate();
    const monthStr = currentDay.toLocaleString('en-US', { month: 'short' });
    
    return {
      id: `${weekId}_${dayName.toLowerCase()}`,
      name: dayName,
      date: `${dayNum} ${monthStr}`,
      anchors: createEmptyAnchors(),
      tasks: []
    };
  });
};

export const saveToStorage = (startDate: Date, data: WeekData) => {
  const weekId = getWeekId(startDate);
  localStorage.setItem(STORAGE_PREFIX + weekId, JSON.stringify(data));
};

/**
 * Checks if a specific date has any anchor set to the 'golden' color.
 */
export const isDateGolden = (date: Date): boolean => {
  const weekId = getWeekId(date);
  const saved = localStorage.getItem(STORAGE_PREFIX + weekId);
  if (!saved) return false;
  
  const weekData: WeekData = JSON.parse(saved);
  const dayName = date.toLocaleString('en-US', { weekday: 'long' });
  const dayData = weekData.find(d => d.name === dayName);
  
  if (!dayData) return false;
  return dayData.anchors.some(anchor => anchor.color === 'golden');
};
