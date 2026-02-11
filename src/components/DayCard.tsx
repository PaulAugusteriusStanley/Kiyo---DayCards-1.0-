
import React, { useState } from 'react';
import { DayData, Anchor } from '../types';
import Pill from './Pill';
import ExpansionView from './ExpansionView';

interface DayCardProps {
  day: DayData;
  onUpdate: (updates: Partial<DayData>) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onUpdate }) => {
  const [expandingIndex, setExpandingIndex] = useState<number | null>(null);

  const updateAnchorText = (index: number, text: string) => {
    const newAnchors = [...day.anchors];
    newAnchors[index] = { ...newAnchors[index], text };
    onUpdate({ anchors: newAnchors });
  };

  const updateAnchorDescription = (index: number, description: string) => {
    const newAnchors = [...day.anchors];
    newAnchors[index] = { ...newAnchors[index], description };
    onUpdate({ anchors: newAnchors });
  };

  const updateAnchorColor = (index: number, color: string) => {
    const newAnchors = [...day.anchors];
    newAnchors[index] = { ...newAnchors[index], color };
    onUpdate({ anchors: newAnchors });
  };

  const placeholders = ["morning intention", "daily movement", "evening rest"];

  return (
    <section className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-semibold text-[#1a2b4b] tracking-tight">{day.name}</h2>
        <p className="text-xl font-medium text-[#a5a58d] opacity-70 mt-0.5 italic">
          {day.date}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {day.anchors.map((anchor, idx) => (
          <Pill 
            key={idx} 
            value={anchor.text} 
            color={anchor.color}
            onChange={(val) => updateAnchorText(idx, val)} 
            onColorChange={(color) => updateAnchorColor(idx, color)}
            onExpand={() => setExpandingIndex(idx)}
            placeholder={placeholders[idx]}
          />
        ))}
      </div>

      {expandingIndex !== null && (
        <ExpansionView
          title={day.anchors[expandingIndex].text}
          description={day.anchors[expandingIndex].description}
          onChange={(val) => updateAnchorDescription(expandingIndex, val)}
          onClose={() => setExpandingIndex(null)}
        />
      )}
    </section>
  );
};

export default DayCard;
