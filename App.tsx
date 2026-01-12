
import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import LetterButton from './components/LetterButton';
import RomanticCard from './components/RomanticCard';
import { ActiveCard } from './types';

const App: React.FC = () => {
  const [isSeparated, setIsSeparated] = useState(false);
  const [activeCard, setActiveCard] = useState<ActiveCard>(null);

  const handleInitialClick = () => {
    if (!isSeparated) {
      setIsSeparated(true);
    }
  };

  const handleLetterClick = (letter: 'D' | 'T') => {
    if (isSeparated) {
      setActiveCard(letter);
    }
  };

  const closeCard = () => {
    setActiveCard(null);
  };

  // El desenfoque solo se activa con los modales individuales de D y T
  const isIndividualModalOpen = activeCard === 'D' || activeCard === 'T';

  // Texto exacto y completo proporcionado por el usuario para la carta de la mitad
  const fullCentralText = "Mi amor, te amo demasiado. Eres lo que más amo en todo el mundo. Eres tan hermosa, tan perfecta, tan mía, y el amor que siento por ti es tan inmenso. Amor, sabes, todo este tiempo que estamos juntos me has hecho sentir lo que es el verdadero amor, y que cada vez que veo tus ojitos son tan bonitos; también tu voz, que cada vez que hablas o me dices algo lindo me das tanta ternura. Mi amor, desde que llegaste a mi vida todo es más bonito. Tú eres la mujer que siempre quise. Yo nunca pensé que podía amar tanto a alguien hasta que llegaste tú a mi vida, y tu sonrisa hace que el mundo se pare, y escuchar tu risa hace que mi corazón empiece a latir más rápido por la felicidad que tú causas en mí. Amor, eres lo más bonito que tengo y no dudo en elegirte una y mil veces.";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      
      {/* Capa de fondo y elementos principales */}
      <div className={`transition-all duration-1000 w-full h-full flex items-center justify-center ${isIndividualModalOpen ? 'blur-2xl scale-95 opacity-50' : 'opacity-100 scale-100'}`}>
        <HeartBackground />
        
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Carta Central - Aparece al separar las letras */}
          {isSeparated && (
            <div className={`transition-all duration-[2000ms] ease-out ${isSeparated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} z-10 px-4`}>
              <RomanticCard 
                isOpen={true} 
                onClose={() => {}} 
                content={fullCentralText}
              />
            </div>
          )}

          {/* Iniciales D y T */}
          <LetterButton 
            letter="D" 
            name="DERECK"
            isSeparated={isSeparated} 
            position="center-left"
            onClick={!isSeparated ? handleInitialClick : () => handleLetterClick('D')}
          />
          
          <LetterButton 
            letter="T" 
            name="TAIS"
            isSeparated={isSeparated} 
            position="center-right"
            onClick={!isSeparated ? handleInitialClick : () => handleLetterClick('T')}
          />

          {/* Texto de guía inicial */}
          {!isSeparated && (
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-full text-center px-4">
              <div className="text-white/40 tracking-[0.8em] text-[10px] md:text-xs uppercase font-serif animate-[pulse_3s_infinite] select-none pointer-events-none">
                P R E S I O N A &nbsp;&nbsp; N U E S T R A S &nbsp;&nbsp; I N I C I A L E S
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales para las cartas individuales (D y T) */}
      {isIndividualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-700"
            onClick={closeCard}
          />
          
          <div className="relative z-10 w-full flex items-center justify-center animate-[modalZoom_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            {activeCard === 'D' && (
              <RomanticCard 
                isOpen={true} 
                onClose={closeCard}
                title="DERECK"
                content="Desde que te vi, mis ojos se quedaron impactados al ver tanta belleza. Cuando te abracé por primera vez y vi cómo te ponías nerviosa, me di cuenta de que eras única, que no eras como las demás y que lo que siento por ti jamás se acabará."
              />
            )}

            {activeCard === 'T' && (
              <RomanticCard 
                isOpen={true} 
                onClose={closeCard}
                title="TAIS"
                content="Tanto tiempo juntos, y todo este tiempo me has demostrado que nuestro amor no es algo pasajero, sino algo que durará hasta estar los dos viejitos, hasta contarle la historia de nuestro amor a nuestros nietos y cumplir todas nuestras promesas. Nuestro amor es eterno. Te amo."
              />
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes modalZoom {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
