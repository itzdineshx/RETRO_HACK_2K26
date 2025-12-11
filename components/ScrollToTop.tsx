import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 border-4 border-black shadow-hard transition-all duration-300 transform group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
        bg-retro-pink hover:bg-retro-green hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000]
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp 
        className="w-8 h-8 text-white group-hover:text-black transition-colors" 
        strokeWidth={3} 
      />
    </button>
  );
};

export default ScrollToTop;