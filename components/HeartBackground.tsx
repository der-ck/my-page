
import React, { useEffect, useState, useCallback, useRef } from 'react';

interface Heart {
  id: number;
  left: string;
  top: string;
  size: string;
  duration: string;
  opacity: number;
  type: 'ambient' | 'interactive';
  rotate: string;
}

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const counterRef = useRef(0);

  // Generar corazones ambientales que flotan desde abajo
  useEffect(() => {
    const createAmbientHeart = () => {
      const id = counterRef.current++;
      const newHeart: Heart = {
        id,
        left: `${Math.random() * 100}%`,
        top: '110%',
        size: `${Math.random() * 45 + 5}px`, 
        duration: `${Math.random() * 8 + 8}s`,
        opacity: Math.random() * 0.7 + 0.3,
        type: 'ambient',
        rotate: `${Math.random() * 360}deg`
      };
      setHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 16000);
    };

    const interval = setInterval(createAmbientHeart, 350);
    return () => clearInterval(interval);
  }, []);

  // Función para generar corazones en una posición específica (interacción)
  const spawnInteractiveHeart = useCallback((x: number, y: number, isClick: boolean) => {
    const id = counterRef.current++;
    const sizeBase = isClick ? 70 : 25;
    const sizeVar = isClick ? 90 : 35;
    
    const newHeart: Heart = {
      id,
      left: `${x}px`,
      top: `${y}px`,
      size: `${Math.random() * sizeVar + sizeBase}px`,
      duration: isClick ? '3.5s' : '1.8s',
      opacity: 1,
      type: 'interactive',
      rotate: `${Math.random() * 60 - 30}deg`
    };

    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, isClick ? 3500 : 1800);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.random() > 0.82) {
      spawnInteractiveHeart(e.clientX, e.clientY, false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    for (let i = 0; i < 8; i++) {
      spawnInteractiveHeart(e.clientX, e.clientY, true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-0 bg-black overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Resplandor central rojo profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25)_0%,transparent_75%)] pointer-events-none" />
      
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="pointer-events-none absolute select-none"
          style={{
            left: heart.left,
            top: heart.top,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            color: '#FF0000', // Rojo Puro
            filter: `drop-shadow(0 0 ${parseInt(heart.size)/2.5}px #FF0000)`,
            animation: heart.type === 'ambient' 
              ? `ambientFloat ${heart.duration} linear forwards`
              : `interactivePop ${heart.duration} cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
            transform: `translate(-50%, -50%) rotate(${heart.rotate})`
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      <style>{`
        @keyframes ambientFloat {
          0% { transform: translate(-50%, 0) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translate(calc(-50% + 50px), -130vh) scale(1.4) rotate(45deg); opacity: 0; }
        }
        @keyframes interactivePop {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; }
          100% { transform: translate(calc(-50% + ${Math.random() * 300 - 150}px), calc(-50% - 250px)) scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeartBackground;
