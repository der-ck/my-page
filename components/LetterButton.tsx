
import React, { useState } from 'react';

interface LetterButtonProps {
  letter: string;
  name?: string;
  isSeparated: boolean;
  position: 'left' | 'right' | 'center-left' | 'center-right';
  onClick: () => void;
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, name, isSeparated, position, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPositionStyle = () => {
    if (!isSeparated) {
      return position === 'center-left' 
        ? { transform: 'translateX(-95%) translateY(-50%)' } 
        : { transform: 'translateX(-5%) translateY(-50%)' };
    }
    
    // Aumentamos la distancia de 24vw a 38vw para alejarlas más del centro
    const distance = '38vw';
    return position === 'center-left'
      ? { transform: `translateX(calc(-50% - ${distance})) translateY(-50%)` }
      : { transform: `translateX(calc(-50% + ${distance})) translateY(-50%)` };
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-1/2 left-1/2 transition-all duration-[2500ms] cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer z-30 flex flex-col items-center justify-center"
      style={getPositionStyle()}
    >
      {/* El nombre solo aparece al hacer hover cuando están separadas */}
      {isSeparated && name && (
        <div 
          className={`mb-6 px-6 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md transition-all duration-700 ${isHovered ? 'opacity-100 scale-110 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}`}
        >
          <span className="text-white font-serif tracking-[0.5em] text-[10px] md:text-xs uppercase font-light whitespace-nowrap select-none">
            {name}
          </span>
        </div>
      )}

      <h1 className="text-[12rem] md:text-[16rem] font-['Playfair_Display'] italic font-black text-white romantic-glow letter-hover transition-all duration-700 select-none leading-none">
        {letter}
      </h1>
    </div>
  );
};

export default LetterButton;
