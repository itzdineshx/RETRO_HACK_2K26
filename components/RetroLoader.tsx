import React, { useState, useEffect } from 'react';

const RetroLoader: React.FC<{ text?: string, duration?: number }> = ({ text = "LOADING...", duration = 2000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  const bars = Math.floor(progress / 5);
  const emptyBars = 20 - bars;
  const barString = '█'.repeat(bars) + '░'.repeat(emptyBars);

  return (
    <div className="flex flex-col items-center justify-center p-8 font-mono text-retro-green animate-pulse">
      <div className="mb-2 text-sm md:text-base tracking-widest uppercase">
        {text}
      </div>
      <div className="text-xl md:text-2xl mb-2">
        [{barString}]
      </div>
      <div className="text-retro-pink font-bold">
        {progress}% COMPLETED
      </div>
    </div>
  );
};

export default RetroLoader;