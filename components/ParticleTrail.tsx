
import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  char: string;
  color: string;
  size: number;
}

const ParticleTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const particleIdCounter = useRef(0);

  // Retro colors palette
  const colors = ['#CCFF00', '#00FFFF', '#FF0099', '#FFFFFF'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate distance moved to prevent too many particles when stationary/slow
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn a particle every ~15px of movement
      if (dist > 15) {
        spawnParticle(e.clientX, e.clientY);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const spawnParticle = (x: number, y: number) => {
      const char = Math.random() > 0.5 ? '1' : '0';
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Random size between 10px and 16px
      const size = Math.random() * 6 + 10; 

      const newParticle: Particle = {
        id: particleIdCounter.current++,
        x,
        y,
        // Slight random horizontal drift
        vx: (Math.random() - 0.5) * 1.5,
        // Fall speed
        vy: Math.random() * 2 + 1, 
        life: 1.0,
        char,
        color,
        size
      };

      setParticles(prev => {
        // Limit total particles to avoid performance issues
        const next = [...prev, newParticle];
        if (next.length > 50) next.shift();
        return next;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => {
        // If no particles, just return empty to avoid processing
        if (prevParticles.length === 0) return prevParticles;

        return prevParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02 // Fade out rate
          }))
          .filter(p => p.life > 0);
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden hidden md:block">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute font-mono font-bold select-none leading-none"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.life,
            color: p.color,
            fontSize: `${p.size}px`,
            textShadow: `0 0 5px ${p.color}`,
            transform: 'translate(-50%, -50%)' // Center on spawn point
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

export default ParticleTrail;
