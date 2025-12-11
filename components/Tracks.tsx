import React from 'react';
import SectionHeader from './SectionHeader';
import { Track } from '../types';
import { Globe, Shield, Heart, Gamepad2 } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const tracks: Track[] = [
  {
    icon: 'Globe',
    title: 'FinTech Revolution',
    description: 'Decentralized finance, payment gateways, and next-gen banking solutions.',
    color: 'bg-retro-green'
  },
  {
    icon: 'Shield',
    title: 'Cyber Security',
    description: 'Protect the mainframe. Privacy tools, encryption, and safe data handling.',
    color: 'bg-retro-pink'
  },
  {
    icon: 'Heart',
    title: 'Health & Wellness',
    description: 'Wearables, telemedicine, and mental health apps using modern tech.',
    color: 'bg-retro-cyan'
  },
  {
    icon: 'Gamepad2',
    title: 'Open Innovation',
    description: 'No limits. AR/VR, GameDev, IoT, or anything that breaks the mold.',
    color: 'bg-retro-purple'
  }
];

const TrackCard: React.FC<{ track: Track, index: number }> = ({ track, index }) => {
  const Icon = {
    Globe: Globe,
    Shield: Shield,
    Heart: Heart,
    Gamepad2: Gamepad2
  }[track.icon] || Globe;

  return (
    <div className="group relative bg-white p-6 border-4 border-black shadow-hard hover:shadow-hard-sm hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 overflow-hidden cursor-default">
      {/* Hover Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-black/20 -translate-y-full group-hover:animate-[scanline_1.5s_linear_infinite] pointer-events-none"></div>
      
      <div className={`absolute -top-6 -left-6 w-12 h-12 ${track.color} border-4 border-black flex items-center justify-center shadow-sm z-10 transition-transform duration-300 group-hover:rotate-12`}>
        <Icon className="w-6 h-6 text-black" />
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="font-pixel text-xl mb-3 text-black group-hover:text-retro-purple transition-colors">{track.title}</h3>
        <p className="font-mono text-gray-800 leading-relaxed border-t-2 border-dashed border-gray-400 pt-3">
            {track.description}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-xs text-gray-400 group-hover:text-black transition-colors">
        TRK_0{index + 1}
      </div>
    </div>
  );
};

const Tracks: React.FC = () => {
  const parallax1 = useParallax(0.1);
  const parallax2 = useParallax(-0.1);
  
  return (
    <section id="tracks" className="py-20 bg-retro-offwhite relative border-y-8 border-retro-cyan shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000] overflow-hidden">
      {/* Parallax Background Elements */}
      <div style={parallax1} className="absolute top-20 left-10 text-9xl font-pixel text-retro-cyan opacity-10 pointer-events-none select-none">+</div>
      <div style={parallax2} className="absolute bottom-40 right-10 text-9xl font-pixel text-retro-purple opacity-10 pointer-events-none select-none">{`{}`}</div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader title="MISSION TRACKS" subtitle="Choose your objective." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
          {tracks.map((track, idx) => (
            <TrackCard key={idx} track={track} index={idx} />
          ))}
        </div>
      </div>
      
      {/* Decorative running line with seamless infinite scroll */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-black overflow-hidden flex whitespace-nowrap border-t-2 border-retro-green z-20">
         <div className="animate-marquee flex items-center gap-4 px-4 text-white font-pixel text-xs">
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
         </div>
         <div className="animate-marquee flex items-center gap-4 px-4 text-white font-pixel text-xs" aria-hidden="true">
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
            <span>HACK // BUILD // DEPLOY // SLEEP // REPEAT</span>
         </div>
      </div>
      
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(400px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          min-width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </section>
  );
};

export default Tracks;