import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  // Target date: October 25, 2025 at 09:00 AM
  const targetDate = new Date('2025-10-25T09:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function getTimeRemaining(endtime: number) {
    const total = endtime - Date.now();
    // Even if time is up, return 0s so we can display the timer at 00
    if (total <= 0) {
        return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const timeUnits = [
      { label: 'DAYS', value: timeLeft.days, color: 'text-retro-pink', border: 'border-retro-pink' },
      { label: 'HOURS', value: timeLeft.hours, color: 'text-retro-cyan', border: 'border-retro-cyan' },
      { label: 'MINUTES', value: timeLeft.minutes, color: 'text-retro-green', border: 'border-retro-green' },
      { label: 'SECONDS', value: timeLeft.seconds, color: 'text-retro-purple', border: 'border-retro-purple' },
  ];

  if (!mounted) return null;

  return (
    <div className="relative py-10 perspective-[1000px]">
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 transform-style-3d rotate-x-6">
        {timeUnits.map((unit, idx) => (
          <div key={unit.label} className="group relative">
             {/* 3D Box Construction */}
             <div className={`
                relative w-24 h-28 md:w-32 md:h-36 bg-black 
                border-4 ${unit.border} 
                shadow-[8px_8px_0px_#000] 
                transition-transform duration-300 ease-out 
                group-hover:-translate-y-2 group-hover:translate-x-1 group-hover:shadow-[16px_16px_0px_#000]
                flex flex-col items-center justify-center
             `}>
                
                {/* Glitchy Number */}
                <div className={`
                    font-terminal text-5xl md:text-7xl font-bold tracking-widest ${unit.color}
                    drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]
                    ${timeLeft.total <= 0 ? 'animate-pulse' : ''}
                `}>
                  {String(unit.value).padStart(2, '0')}
                </div>

                {/* Label */}
                <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="bg-white text-black font-pixel text-[8px] md:text-[10px] px-2 py-0.5 uppercase font-bold">
                        {unit.label}
                    </span>
                </div>

                {/* CRT Scanline overlay inside box */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>
                
                {/* Glossy Reflection */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
             </div>
             
             {/* Background decorative square behind */}
             <div className={`absolute -z-10 top-2 left-2 w-full h-full bg-gray-900 border-2 border-gray-700 opacity-50`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
