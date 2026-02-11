
export interface Anchor {
  text: string;
  description: string;
  color?: string; // Hex code or 'golden'
}

export interface DayData {
  id: string;
  name: string;
  date: string;
  anchors: Anchor[];
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export type WeekData = DayData[];
