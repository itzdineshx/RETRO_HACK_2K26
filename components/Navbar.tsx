
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX, Map, Clock, Wifi, Grid, ChevronRight } from 'lucide-react';
import { NavItem } from '../types';
import { useSound } from '../context/SoundContext';

// --- Sub-components for Advanced Header Features ---

const ScrollProgress: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percentage = (scrollPosition / totalHeight) * 100;
      setWidth(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 h-[4px] bg-gray-800 w-full z-50">
      <div 
        className="h-full bg-gradient-to-r from-retro-green via-retro-cyan to-retro-pink transition-all duration-100 ease-out shadow-[0_0_10px_rgba(204,255,0,0.5)]" 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const SystemClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-2 font-mono text-xs text-retro-green border border-retro-green/30 bg-black/40 px-3 py-1 rounded-sm">
      <Clock size={12} className="animate-pulse" />
      <span>{time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
};

const NetworkStatus: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-retro-cyan opacity-80">
      <Wifi size={12} />
      <span className="hidden lg:inline">NET_ONLINE</span>
      <span className="w-1.5 h-1.5 bg-retro-cyan rounded-full animate-ping"></span>
    </div>
  );
};

// --- Main Navbar Component ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [showMap, setShowMap] = useState(false); // Site Map overlay
  const { play, muted, toggleMute } = useSound();

  const navItems: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Close menus on resize to avoid UI bugs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle locking body scroll when map is open
  useEffect(() => {
    if (showMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMap]);

  const handleLinkClick = (href: string) => {
    play('transition');
    setIsOpen(false);
    setShowMap(false);
    
    // Smooth scroll logic helper
    if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        try {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (e) {
            console.error("Invalid selector:", href);
        }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[999] bg-retro-dark/95 backdrop-blur-sm border-b-4 border-retro-green shadow-[0_4px_0_rgba(0,0,0,0.5)]">
        <ScrollProgress />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Area */}
            <div className="flex items-center gap-4">
                <a 
                    href="#" 
                    className="flex-shrink-0 flex items-center gap-3 group cursor-pointer" 
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('#');
                    }}
                    onMouseEnter={() => play('hover')}
                >
                    <div className="group-hover:rotate-12 transition-transform duration-300 bg-black p-1 border border-retro-green">
                        <Terminal className="h-6 w-6 text-retro-green" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-pixel text-lg md:text-xl text-white tracking-widest group-hover:text-retro-green transition-colors leading-none">
                        DMICE<span className="text-retro-pink group-hover:text-white">.HACK()</span>
                        </span>
                        <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">v2.0.25</span>
                    </div>
                </a>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-gray-700 hidden md:block mx-2"></div>
                
                <NetworkStatus />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-baseline space-x-1">
                {navItems.slice(0, 4).map((item) => ( // Show first 4 items directly
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative text-retro-offwhite hover:text-retro-green px-3 py-2 rounded-md text-sm font-bold font-mono uppercase transition-colors cursor-pointer"
                    onMouseEnter={() => play('hover')}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                    }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute left-0 text-retro-pink transition-all duration-200 -translate-x-full group-hover:translate-x-0">[</span>
                    <span className="mx-2">{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 absolute right-0 text-retro-pink transition-all duration-200 translate-x-full group-hover:translate-x-0">]</span>
                  </a>
                ))}
              </div>

              {/* Advanced Controls Area */}
              <div className="flex items-center gap-4 bg-gray-900/50 p-2 rounded border border-gray-700">
                  <SystemClock />
                  
                  {/* Site Map Toggle */}
                  <button
                    onClick={() => {
                        play('click');
                        setShowMap(true);
                    }}
                    className="text-retro-offwhite hover:text-retro-cyan hover:bg-white/10 p-2 rounded transition-colors cursor-pointer"
                    title="OPEN SITE MAP"
                  >
                    <Grid size={18} />
                  </button>

                  <div className="h-4 w-[1px] bg-gray-600"></div>

                  <button
                      onClick={() => {
                          toggleMute();
                          if (muted) play('toggle');
                      }}
                      className={`transition-colors p-2 rounded cursor-pointer ${muted ? 'text-gray-500 hover:text-red-500' : 'text-retro-green hover:text-white'}`}
                      title={muted ? "SYSTEM MUTED" : "AUDIO ONLINE"}
                  >
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
              </div>

              {/* Call to Action */}
              <a 
                  href="#register" 
                  className="bg-retro-pink text-white border-2 border-white px-4 py-2 font-pixel text-xs hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#fff] hover:shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer flex items-center gap-2"
                  onMouseEnter={() => play('hover')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#register');
                  }}
              >
                  REGISTER <ChevronRight size={12} strokeWidth={4} />
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex lg:hidden items-center gap-4">
               <button
                  onClick={() => {
                      toggleMute();
                      play('toggle');
                  }}
                  className={`text-gray-400 p-2 ${!muted && 'text-retro-green'}`}
              >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <button
                onClick={() => {
                    play('click');
                    setIsOpen(!isOpen);
                }}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-retro-green hover:text-white hover:bg-gray-800 focus:outline-none border border-retro-green/50"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-retro-dark border-b-4 border-retro-green shadow-xl absolute w-full z-50 animate-[fadeIn_0.2s_ease-out]">
             {/* Mobile Progress Line */}
             <div className="w-full h-1 bg-gray-800 flex">
                <div className="h-full bg-retro-green w-1/3 animate-pulse"></div>
                <div className="h-full bg-retro-pink w-1/3 animate-pulse delay-75"></div>
                <div className="h-full bg-retro-cyan w-1/3 animate-pulse delay-150"></div>
             </div>

            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                  }}
                  className="group flex items-center justify-between text-retro-offwhite hover:text-retro-pink hover:bg-gray-900 px-4 py-3 rounded-md text-base font-pixel cursor-pointer border border-transparent hover:border-retro-pink/30 transition-all"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <div className="h-px bg-gray-800 my-4"></div>
              <a 
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#register');
                  }}
                  className="block w-full text-center bg-retro-pink text-white px-3 py-3 font-pixel text-sm hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all cursor-pointer border-2 border-white"
              >
                  // INITIALIZE_REGISTRATION
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Full Screen Site Map Overlay */}
      {showMap && (
        <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <button 
                onClick={() => setShowMap(false)}
                className="absolute top-6 right-6 text-white hover:text-retro-pink p-2 border-2 border-transparent hover:border-retro-pink rounded-full transition-all"
            >
                <X size={32} />
            </button>

            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-pixel text-white mb-2 tracking-widest">SYSTEM MAP</h2>
                    <p className="font-mono text-retro-green text-sm">SELECT DESTINATION NODE</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {navItems.concat({ label: 'Register', href: '#register' }).map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(item.href);
                            }}
                            className="group relative bg-gray-900 border-2 border-gray-700 hover:border-retro-cyan hover:bg-gray-800 p-6 md:p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] cursor-pointer overflow-hidden"
                            onMouseEnter={() => play('hover')}
                        >
                            {/* Decorative number */}
                            <span className="absolute top-2 left-2 font-mono text-xs text-gray-600 group-hover:text-retro-cyan">
                                0{idx + 1}
                            </span>
                            
                            {/* Icon placeholder (using Map icon for generic) */}
                            <Map className="w-8 h-8 md:w-12 md:h-12 text-gray-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            
                            <span className="font-pixel text-sm md:text-lg text-retro-offwhite group-hover:text-retro-cyan tracking-wider">
                                {item.label}
                            </span>

                            {/* Corner Accents */}
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-700 group-hover:border-retro-cyan transition-colors"></div>
                        </a>
                    ))}
                </div>

                <div className="mt-12 text-center font-mono text-gray-500 text-xs">
                    PRESS [ESC] TO CLOSE MAP VIEW
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
