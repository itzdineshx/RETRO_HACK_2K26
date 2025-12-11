import React from 'react';
import SectionHeader from './SectionHeader';

const mentors = [
  { name: 'ALEX_R', role: 'FULL_STACK', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { name: 'SARAH_K', role: 'BLOCKCHAIN', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'DAVID_L', role: 'AI_EXPERT', img: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { name: 'EMILY_W', role: 'DESIGN_LEAD', img: 'https://i.pravatar.cc/150?u=a042581f4e29026703d' },
];

const Mentors: React.FC = () => {
  return (
    <section id="mentors" className="py-24 bg-retro-dark relative border-y-8 border-retro-pink shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000]">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader title="THE CREW" subtitle="SELECT_YOUR_MENTOR" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
           {mentors.map((mentor, idx) => (
             <div key={idx} className="group cursor-pointer">
                <div className="relative border-4 border-gray-600 bg-gray-900 aspect-square overflow-hidden group-hover:border-retro-green transition-all duration-300 shadow-hard group-hover:shadow-[8px_8px_0_#CCFF00]">
                    <img 
                        src={mentor.img} 
                        alt={mentor.name} 
                        className="w-full h-full object-cover transition-all duration-500 ease-out filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.6)]"
                        style={{ imageRendering: 'pixelated' }}
                    />
                    
                    {/* Hover Overlay Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="mt-4 text-center transform group-hover:translate-y-1 transition-transform">
                    <h3 className="font-pixel text-white text-sm md:text-base group-hover:text-retro-green transition-colors drop-shadow-[2px_2px_0_#000]">{mentor.name}</h3>
                    <p className="font-mono text-retro-pink text-xs mt-1 bg-black inline-block px-2 border border-gray-800 group-hover:border-retro-pink transition-colors">[{mentor.role}]</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;