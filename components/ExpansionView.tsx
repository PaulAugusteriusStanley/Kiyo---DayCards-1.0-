
import React from 'react';

interface ExpansionViewProps {
  title: string;
  description: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const ExpansionView: React.FC<ExpansionViewProps> = ({ title, description, onChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#fdfaf5] z-[60] flex flex-col items-center animate-in fade-in duration-500">
      <div className="w-full max-w-xl px-8 pt-24 pb-12 flex flex-col h-full">
        <header className="mb-12 text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#a5a58d] mb-4 block">activity description</span>
          <h2 className="text-4xl font-semibold text-[#1a2b4b] tracking-tight">{title}</h2>
        </header>

        <textarea
          autoFocus
          value={description}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your intention or activity here..."
          className="flex-grow w-full bg-transparent border-none text-xl leading-relaxed text-[#1a2b4b] opacity-80 resize-none focus:outline-none placeholder:opacity-20 font-serif"
        />

        <div className="mt-8 flex justify-center">
          <button 
            onClick={onClose}
            className="px-12 py-4 rounded-full border border-[#1a2b4b] border-opacity-10 text-[13px] uppercase tracking-[0.4em] text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white transition-all"
          >
            Back to Planner
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpansionView;
