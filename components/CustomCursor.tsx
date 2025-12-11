
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Cursor (Arrow) */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform hidden md:block"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          className={`
            transition-all duration-100 ease-out
            ${isPointer ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
        >
          {/* Pixelated Arrow */}
          <path 
            d="M0 0 L0 16 L4 12 L8 20 L12 18 L8 10 L14 10 L0 0Z" 
            fill="#CCFF00" 
            stroke="black" 
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
        </svg>
      </div>

      {/* Pointer Cursor (Crosshair/Box) */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ 
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      >
        <div className={`
          relative w-6 h-6 border-2 transition-all duration-150 ease-out
          ${isPointer ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
          ${isClicking ? 'scale-90 border-retro-pink bg-retro-pink/20' : 'border-retro-green bg-transparent'}
        `}>
          {/* Corner crosshairs */}
          <div className="absolute -top-1 -left-1 w-2 h-0.5 bg-white"></div>
          <div className="absolute -top-1 -left-1 w-0.5 h-2 bg-white"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-0.5 bg-white"></div>
          <div className="absolute -bottom-1 -right-1 w-0.5 h-2 bg-white"></div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
