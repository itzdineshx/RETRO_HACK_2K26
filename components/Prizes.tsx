import React, { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import { Trophy, Gift, Zap, Heart } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const TiltCard: React.FC<{ 
  title: string; 
  prize: string; 
  icon: any; 
  color: string; 
  glowColor: string;
}> = ({ title, prize, icon: Icon, color, glowColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(10px)`);
    setShadow(`
      15px 15px 0px 0px #000, 
      0 0 20px ${glowColor}
    `);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)');
    setShadow('6px 6px 0px 0px #000');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white border-4 border-black p-6 flex items-center gap-4 transition-all duration-100 ease-out cursor-default relative z-10"
      style={{ 
        transform, 
        boxShadow: shadow || '6px 6px 0px 0px #000',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className={`w-14 h-14 ${color} border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]`}
        style={{ transform: 'translateZ(20px)' }}
      >
        <Icon className="w-8 h-8 text-white mix-blend-hard-light" />
      </div>
      <div style={{ transform: 'translateZ(15px)' }}>
        <h4 className="font-pixel text-sm text-black mb-1">{title}</h4>
        <p className="font-mono text-gray-600 text-sm font-bold border-t-2 border-gray-300 pt-1">{prize}</p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

const Prizes: React.FC = () => {
  const parallaxCube1 = useParallax(0.08);
  const parallaxCube2 = useParallax(-0.06);

  return (
    <section id="prizes" className="py-24 bg-retro-offwhite relative border-y-8 border-retro-purple shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Parallax Cubes */}
      <div style={parallaxCube1} className="absolute top-20 left-20 w-16 h-16 border-4 border-black bg-retro-purple/20 hidden md:block z-0 transform rotate-12"></div>
      <div style={parallaxCube2} className="absolute top-1/2 right-20 w-24 h-24 border-4 border-black bg-retro-pink/20 hidden md:block z-0 transform -rotate-12"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader title="PRIZE POOL" subtitle="LOOT_BOX_CONTENTS" />

        {/* Podium Section - Responsive Order */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-8 md:gap-8 mt-20 mb-20 px-4">
          
          {/* 1st Place (Mobile: Shows first) */}
          <div className="order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center z-10 md:-mb-8 group perspective-500">
             <div className="mb-4 text-center animate-bounce">
                <Trophy className="w-16 h-16 text-retro-purple mx-auto mb-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
                <h3 className="font-pixel text-2xl md:text-3xl text-retro-purple drop-shadow-[2px_2px_0_#000]">WINNER</h3>
                <p className="font-mono text-black font-extrabold text-2xl">₹ 50,000</p>
            </div>
            <div className="w-full h-40 md:h-64 bg-retro-green border-4 border-black shadow-hard relative group-hover:shadow-[12px_12px_0px_#000] group-hover:-translate-y-2 transition-all duration-300 flex items-end justify-center pb-6 transform-gpu">
               <div className="absolute top-1 right-1 w-full h-full border-r-2 border-b-2 border-green-600 opacity-30 pointer-events-none"></div>
               <div className="text-8xl font-pixel text-black/10 absolute top-4 group-hover:text-black/20 transition-colors">1</div>
               <div className="font-mono text-sm bg-black text-retro-green px-4 py-1 border-2 border-white absolute bottom-6 shadow-md">GOLD_TIER</div>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="order-2 md:order-1 w-full md:w-1/3 flex flex-col items-center group perspective-500">
            <div className="mb-4 text-center transition-transform duration-300 group-hover:-translate-y-2">
                <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <h3 className="font-pixel text-xl text-black">2ND PLACE</h3>
                <p className="font-mono text-gray-800 font-bold text-lg">₹ 25,000</p>
            </div>
            <div className="w-full h-32 md:h-48 bg-gray-300 border-4 border-black shadow-hard relative group-hover:shadow-[10px_10px_0px_#000] transition-all duration-300 flex items-end justify-center pb-4 transform-gpu">
               <div className="absolute top-1 right-1 w-full h-full border-r-2 border-b-2 border-gray-400 opacity-30 pointer-events-none"></div>
               <div className="text-6xl font-pixel text-black/10 absolute top-2 group-hover:text-black/20 transition-colors">2</div>
               <div className="font-mono text-xs bg-black text-white px-2 py-1 absolute bottom-4">SILVER_TIER</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 md:order-3 w-full md:w-1/3 flex flex-col items-center group perspective-500">
             <div className="mb-4 text-center transition-transform duration-300 group-hover:-translate-y-2">
                <Trophy className="w-12 h-12 text-amber-700 mx-auto mb-2" />
                <h3 className="font-pixel text-xl text-black">3RD PLACE</h3>
                <p className="font-mono text-gray-800 font-bold text-lg">₹ 10,000</p>
            </div>
            <div className="w-full h-24 md:h-36 bg-amber-600 border-4 border-black shadow-hard relative group-hover:shadow-[10px_10px_0px_#000] transition-all duration-300 flex items-end justify-center pb-4 transform-gpu">
               <div className="absolute top-1 right-1 w-full h-full border-r-2 border-b-2 border-amber-800 opacity-30 pointer-events-none"></div>
               <div className="text-6xl font-pixel text-black/10 absolute top-2 group-hover:text-black/20 transition-colors">3</div>
               <div className="font-mono text-xs bg-black text-white px-2 py-1 absolute bottom-4">BRONZE_TIER</div>
            </div>
          </div>
        </div>

        {/* Special Categories Grid - 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-2 md:px-0">
            <TiltCard 
              title="BEST UI/UX" 
              prize="Gaming Keyboard" 
              icon={Zap} 
              color="bg-retro-pink" 
              glowColor="#FF0099" 
            />
            <TiltCard 
              title="BEST SOCIAL IMPACT" 
              prize="Arduino Kits" 
              icon={Heart} 
              color="bg-retro-cyan" 
              glowColor="#00FFFF" 
            />
            <TiltCard 
              title="MOST INNOVATIVE" 
              prize="Drone" 
              icon={Gift} 
              color="bg-retro-purple" 
              glowColor="#9D00FF" 
            />
        </div>
      </div>
    </section>
  );
};

export default Prizes;