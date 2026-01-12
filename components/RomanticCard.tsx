
import React from 'react';
import { CardProps } from '../types';

const RomanticCard: React.FC<CardProps> = ({ title, content, onClose, isOpen }) => {
  if (!isOpen) return null;

  const isGeneral = !title;

  return (
    <div className={`relative z-10 flex items-center justify-center p-2 md:p-4 ${isGeneral ? 'animate-[cardEntrance_2.5s_ease-out_forwards]' : ''}`}>
      {/* 
          Contenedor principal:
          - La carta general (isGeneral) ahora es más estrecha (max-w-[36rem]) y compacta para no tapar las iniciales.
          - Las cartas individuales (D y T) mantienen su amplitud para una lectura cómoda.
      */}
      <div className={`relative w-full shadow-[0_60px_150px_rgba(0,0,0,0.9)] border-[1px] border-[#eaddc7] rounded-sm flex flex-col overflow-hidden bg-[#fdfaf3] 
        ${isGeneral 
          ? 'max-w-[85%] md:max-w-[36rem] p-4 md:p-8 md:pt-6 max-h-[85vh]' 
          : 'max-w-[95%] md:max-w-[52rem] p-6 md:p-12 max-h-[94vh]'
        }`}
      >
        
        {/* Capa de textura de papel */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

        {/* Decoraciones en las esquinas */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/30 pointer-events-none">
          <span className="absolute -top-2 -left-2 text-[#e63946] text-sm animate-pulse">❤</span>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/30 pointer-events-none">
          <span className="absolute -top-2 -right-2 text-[#e63946] text-sm animate-pulse">❤</span>
        </div>
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/30 pointer-events-none">
          <span className="absolute -bottom-2 -left-2 text-[#e63946] text-sm animate-pulse">❤</span>
        </div>
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/30 pointer-events-none">
          <span className="absolute -bottom-2 -right-2 text-[#e63946] text-sm animate-pulse">❤</span>
        </div>

        {/* Botón X solo para las cartas individuales */}
        {!isGeneral && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8b7355] hover:text-[#e63946] transition-all duration-300 text-4xl font-extralight z-20 w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5"
            aria-label="Cerrar"
          >
            &times;
          </button>
        )}

        {/* Encabezado: Título reducido en la carta general */}
        <div className={`flex flex-col items-center text-center z-10 ${isGeneral ? 'mb-3' : 'mb-4'}`}>
          <h2 className={`${isGeneral ? 'text-base md:text-xl' : 'text-xl md:text-3xl'} font-serif text-[#5d4a3b] tracking-[0.2em] uppercase mb-1 font-bold italic`}>
            {isGeneral ? "PARA MI AMOR" : title}
          </h2>
          
          <div className="w-full max-w-[140px] flex items-center gap-2 opacity-60">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            <span className="text-[#e63946] text-base">❤</span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </div>
        </div>
        
        {/* 
            Cuerpo del mensaje:
            - Se reduce significativamente la fuente de la carta central (text-[0.9rem] md:text-[1rem]) para que el texto largo quepa mejor.
        */}
        <div className="relative flex-grow overflow-y-auto px-2 md:px-6 custom-scrollbar z-10 mb-2">
          <p className={`${isGeneral ? 'text-[0.88rem] md:text-[1.05rem]' : 'text-[1.1rem] md:text-[1.3rem]'} text-[#3a2f26] leading-[1.6] font-serif italic text-justify drop-shadow-sm pb-4`}>
            {content}
          </p>
          
          {!isGeneral && (
            <div className="mt-4 mb-4 pt-4 border-t border-[#d4af37]/20 text-center">
              <p className="font-serif italic text-[#8b7355] text-base md:text-lg tracking-[0.25em] font-black uppercase">
                TE AMO HASTA EL <span className="text-[#e63946]">INFINITO</span> Y MÁS ALLÁ
              </p>
              <div className="flex justify-center gap-1 mt-2">
                <span className="text-[#e63946] text-xs">❤</span>
                <span className="text-[#e63946] text-xs">❤</span>
                <span className="text-[#e63946] text-xs">❤</span>
              </div>
            </div>
          )}
        </div>

        {/* Firma de la carta: Más compacta en la general */}
        <div className={`mt-auto pt-2 flex flex-col items-center z-10 ${isGeneral ? 'pb-1' : 'pb-2'}`}>
          {isGeneral && (
            <div className="flex flex-col items-center">
              <span className="font-['Great_Vibes'] text-2xl md:text-3xl text-[#d4af37]">
                Con amor
              </span>
              <div className="flex items-center gap-3 text-[#e63946] opacity-30">
                <span className="text-[8px]">❤</span>
              </div>
            </div>
          )}
          
          {!isGeneral && (
             <div className="opacity-20 flex items-center gap-10 text-[#d4af37] mb-1">
                <div className="w-6 h-6 border-b border-l border-current"></div>
                <div className="w-6 h-6 border-b border-r border-current"></div>
             </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default RomanticCard;
