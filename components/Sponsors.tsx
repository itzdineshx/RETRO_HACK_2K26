import React from 'react';
import SectionHeader from './SectionHeader';

const sponsors = [
  { name: 'NEURO_NET', tier: 'PLATINUM', color: 'text-retro-green', glow: 'group-hover:shadow-[0_0_20px_#CCFF00]' },
  { name: 'CYBER_DYNE', tier: 'PLATINUM', color: 'text-retro-pink', glow: 'group-hover:shadow-[0_0_20px_#FF0099]' },
  { name: 'BIT_CORP', tier: 'GOLD', color: 'text-retro-cyan', glow: 'group-hover:shadow-[0_0_20px_#00FFFF]' },
  { name: 'OMNI_SYS', tier: 'GOLD', color: 'text-retro-purple', glow: 'group-hover:shadow-[0_0_20px_#9D00FF]' },
  { name: 'DATA_CORE', tier: 'SILVER', color: 'text-white', glow: 'group-hover:shadow-[0_0_20px_#FFFFFF]' },
  { name: 'SYNTH_LABS', tier: 'SILVER', color: 'text-white', glow: 'group-hover:shadow-[0_0_20px_#FFFFFF]' },
  { name: 'PIXEL_DUST', tier: 'BRONZE', color: 'text-gray-400', glow: 'group-hover:shadow-[0_0_20px_#9CA3AF]' },
  { name: 'LOGIC_GATE', tier: 'BRONZE', color: 'text-gray-400', glow: 'group-hover:shadow-[0_0_20px_#9CA3AF]' },
];

const Sponsors: React.FC = () => {
  return (
    <section id="sponsors" className="py-24 bg-black relative overflow-hidden border-y-8 border-retro-purple shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000]">
      {/* Background decorative scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader title="PARTNERS" subtitle="CORP_ALLIANCES_DETECTED" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
          {sponsors.map((sponsor, idx) => (
            <div 
              key={idx} 
              className={`group relative bg-gray-900 border-4 border-gray-800 p-8 flex flex-col items-center justify-center transition-all duration-300 hover:border-white hover:-translate-y-1 ${sponsor.glow}`}
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-retro-green transition-colors"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-retro-green transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-retro-green transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-retro-green transition-colors"></div>

              {/* Placeholder Logo Text */}
              <div className={`font-pixel text-xl md:text-2xl text-center mb-2 ${sponsor.color} drop-shadow-[2px_2px_0_rgba(0,0,0,1)]`}>
                {sponsor.name}
              </div>
              
              <div className="font-mono text-xs text-gray-600 tracking-widest uppercase group-hover:text-gray-300">
                [{sponsor.tier}]
              </div>

              {/* Scanline overlay on hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
             <p className="font-mono text-gray-500 text-sm mb-4">WANT TO DEPLOY WITH US?</p>
             <a href="#contact" className="inline-block border-b-2 border-retro-pink text-retro-pink font-pixel text-xs hover:text-white hover:bg-retro-pink transition-colors px-2 py-1">
                 DOWNLOAD_PARTNERSHIP_DECK.PDF
             </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;