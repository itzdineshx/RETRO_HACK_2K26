
import React from 'react';
import RetroButton from './RetroButton';
import CountdownTimer from './CountdownTimer';
import { useParallax } from '../hooks/useParallax';
import DecryptionText from './DecryptionText';

const Hero: React.FC = () => {
  const parallaxSlow = useParallax(0.1);
  const parallaxMedium = useParallax(-0.15);
  const parallaxFast = useParallax(0.2);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black">
      
      {/* TV Static Background & Vignette */}
      <div className="tv-static-bg absolute inset-0">
        <div className="tv-static-layer"></div>
      </div>
      <div className="tv-vignette"></div>

      {/* Decorative Parallax Elements - Visible on Mobile now */}
      <div 
        style={parallaxSlow}
        className="absolute top-10 left-4 w-8 h-8 md:top-20 md:left-10 md:w-16 md:h-16 border-2 md:border-4 border-retro-pink opacity-30 z-1 pointer-events-none rotate-12"
      ></div>
      <div 
        style={parallaxMedium}
        className="absolute bottom-20 right-4 w-12 h-12 md:bottom-1/3 md:right-10 md:w-24 md:h-24 border-2 md:border-4 border-retro-green rounded-full opacity-30 z-1 pointer-events-none"
      ></div>
      <div 
        style={parallaxFast}
        className="absolute top-1/2 left-4 md:left-20 w-0 h-0 border-l-[10px] md:border-l-[20px] border-l-transparent border-r-[10px] md:border-r-[20px] border-r-transparent border-b-[20px] md:border-b-[40px] border-b-retro-cyan opacity-20 z-1 pointer-events-none rotate-45"
      ></div>

      <div className="absolute top-24 right-4 md:top-32 md:right-32 text-retro-pink font-pixel text-[8px] md:text-xs opacity-60 z-10 pointer-events-none text-right">
        SYSTEM.READY<br/>
        LOADING_ASSETS...
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-block mb-6 bg-retro-green text-black font-bold px-4 py-1 font-mono text-xs md:text-sm border-2 border-black shadow-[4px_4px_0px_0px_white]">
          OCTOBER 25-27, 2025 // DMICE CAMPUS
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-pixel text-white mb-6 leading-tight drop-shadow-[6px_6px_0_#9D00FF]">
          <DecryptionText text="RETRO" /><br />
          <span className="text-retro-green"><DecryptionText text="HACK" /></span> <span className="text-retro-pink"><DecryptionText text="2025" /></span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-retro-offwhite mb-8 font-mono leading-relaxed bg-black/80 p-4 border-l-4 border-retro-cyan backdrop-blur-sm">
          The ultimate 48-hour hackathon where retro aesthetics meet future technology. 
          Build the future, pixel by pixel.
        </p>

        <div className="mb-10 w-full overflow-x-hidden">
          <CountdownTimer />
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full px-4">
          <RetroButton size="lg" onClick={() => document.getElementById('register')?.scrollIntoView()} fullWidth={false} className="w-full md:w-auto">
            START GAMING
          </RetroButton>
          <RetroButton variant="secondary" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView()} fullWidth={false} className="w-full md:w-auto">
            READ_RULES.TXT
          </RetroButton>
        </div>
        
        <div className="mt-12 md:mt-16 animate-bounce block opacity-70">
            <p className="text-retro-green font-pixel text-[10px] md:text-xs">SCROLL_DOWN</p>
            <div className="w-0 h-0 border-l-[8px] md:border-l-[10px] border-l-transparent border-r-[8px] md:border-r-[10px] border-r-transparent border-t-[10px] md:border-t-[15px] border-t-retro-green mx-auto mt-2"></div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
