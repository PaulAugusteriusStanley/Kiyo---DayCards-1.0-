
import React, { useState, useRef, useEffect } from 'react';

interface PillProps {
  value: string;
  color?: string;
  onChange: (value: string) => void;
  onColorChange: (color: string) => void;
  onExpand: () => void;
  placeholder: string;
}

const PASTEL_PALETTE = [
  '#F8E8E8', // Soft Rose
  '#E8F8F0', // Mint
  '#E8F0F8', // Mist
  '#FFF9E8', // Cream
  '#F0E8F8', // Lilac
  '#F8F0E8', // Peach
  '#E8F4F8', // Sky
  '#F4F8E8', // Citrus
];

const GOLDEN = '#E6B325';

const Pill: React.FC<PillProps> = ({ value, color, onChange, onColorChange, onExpand, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [menu, setMenu] = useState<'none' | 'options' | 'colors'>('none');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenu('none');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handlePillClick = () => {
    if (!value) {
      setIsEditing(true);
    } else {
      setMenu('options');
    }
  };

  const isGolden = color === 'golden';
  const displayColor = isGolden ? GOLDEN : (color || 'transparent');

  const pillStyles = {
    backgroundColor: displayColor !== 'transparent' ? displayColor : '#fffefc',
    borderColor: isGolden ? '#E6B325' : (displayColor !== 'transparent' ? 'rgba(26,43,75,0.1)' : 'rgba(26,43,75,0.1)'),
    boxShadow: isGolden ? '0 0 15px rgba(230,179,37,0.3)' : '2px 4px 10px rgba(26,43,75,0.04)',
    color: isGolden ? '#fff' : '#1a2b4b'
  };

  return (
    <div className="relative w-56 group" ref={containerRef}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 text-xl font-medium text-[#1a2b4b] bg-[#fffefc] border-[2px] border-[#1a2b4b] rounded-[1.8rem] focus:outline-none text-center shadow-[4px_6px_12px_rgba(26,43,75,0.06)] transition-all"
        />
      ) : (
        <button
          onClick={handlePillClick}
          style={value ? pillStyles : {}}
          className={`w-full px-5 py-3 text-xl font-medium transition-all duration-500 border-[1.5px] rounded-[1.8rem] min-h-[3.8rem] flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] ${
            value 
              ? '' 
              : 'border-[#1a2b4b] border-opacity-10 text-[#9ca3af] bg-[#1a2b4b] bg-opacity-[0.01] hover:bg-opacity-[0.03] hover:border-opacity-20'
          }`}
        >
          {value || (
            <span className="text-[15px] font-normal italic text-[#9ca3af] opacity-60 tracking-wider">
              {placeholder}
            </span>
          )}
        </button>
      )}

      {/* Main Options Menu */}
      {menu === 'options' && !isEditing && (
        <div className="absolute top-full left-0 right-0 mt-2 z-20 flex justify-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <button 
            onClick={() => { setIsEditing(true); setMenu('none'); }}
            className="px-3 py-1 bg-[#fdfaf5] border border-[#1a2b4b] border-opacity-20 rounded-full text-[10px] uppercase tracking-widest text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white transition-all shadow-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => setMenu('colors')}
            className="px-3 py-1 bg-[#fdfaf5] border border-[#1a2b4b] border-opacity-20 rounded-full text-[10px] uppercase tracking-widest text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white transition-all shadow-sm"
          >
            Color
          </button>
          <button 
            onClick={() => { onExpand(); setMenu('none'); }}
            className="px-3 py-1 bg-[#fdfaf5] border border-[#1a2b4b] border-opacity-20 rounded-full text-[10px] uppercase tracking-widest text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white transition-all shadow-sm"
          >
            Expand
          </button>
        </div>
      )}

      {/* Color Palette Menu */}
      {menu === 'colors' && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 p-3 bg-[#fdfaf5] border border-[#1a2b4b] border-opacity-10 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 w-48">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PASTEL_PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => { onColorChange(c); setMenu('none'); }}
                className="w-8 h-8 rounded-full border border-black border-opacity-5 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={() => { onColorChange('golden'); setMenu('none'); }}
            className="w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #E6B325 0%, #F5D172 100%)' }}
          >
            Golden
          </button>
          <button
            onClick={() => { onColorChange('transparent'); setMenu('none'); }}
            className="w-full mt-2 py-1.5 rounded-xl text-[9px] uppercase tracking-widest text-[#1a2b4b] opacity-40 hover:opacity-100 transition-opacity"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Pill;
