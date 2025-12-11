
import React, { useState, useEffect, useRef } from 'react';

interface DecryptionTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: 'forward' | 'random';
  useOriginalCharsOnly?: boolean;
}

const DecryptionText: React.FC<DecryptionTextProps> = ({ 
  text, 
  speed = 50, 
  maxIterations = 15,
  className = '',
  revealDirection = 'random',
  useOriginalCharsOnly = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const originalText = text;
  
  // Characters to scramble with (Retro/Matrix vibe)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&[]{}<>/\\|';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setIsAnimating(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setDisplayText(originalText);
      }

      // Nonlinear iteration increment for more natural feel
      iterations += 1 / (maxIterations / originalText.length); 
      
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, originalText, speed, maxIterations]);

  return (
    <span ref={elementRef} className={`${className} inline-block`}>
      {isVisible ? displayText : ( <span className="opacity-0">{originalText}</span> )}
    </span>
  );
};

export default DecryptionText;
