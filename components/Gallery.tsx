import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import RetroLoader from './RetroLoader';

// Hexagon Card Component
const HexCard: React.FC<{ 
    img: { id: number; label: string }; 
    idx: number;
    onClick: () => void;
}> = ({ img, idx, onClick }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate parallax offset
    setOffset({ x: -(x / 8), y: -(y / 8) });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-28 h-32 sm:w-32 sm:h-36 md:w-48 md:h-52 group mx-1 md:mx-2 hover:z-20 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Hexagon Shape Container with Clip Path */}
      <div 
        className="w-full h-full bg-retro-green p-[2px] transition-all duration-300 group-hover:bg-retro-pink shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,0,153,0.6)] group-hover:scale-110"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      >
        <div 
          className="w-full h-full bg-black relative overflow-hidden"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          {/* Parallax Image */}
          <div 
             className="w-full h-full transition-transform duration-100 ease-out will-change-transform"
             style={{ 
               transform: `scale(1.2) translate(${offset.x}px, ${offset.y}px)` 
             }}
          >
            <img 
                src={`https://picsum.photos/seed/${img.id}/400/400`} 
                alt={img.label}
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center z-10">
            <Maximize2 className="w-6 h-6 text-retro-pink mb-2 scale-0 group-hover:scale-100 transition-transform delay-75" />
            <span className="font-pixel text-[8px] md:text-[10px] text-white leading-tight">
              {img.label}
            </span>
          </div>

          {/* Scanlines */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] pointer-events-none opacity-50 z-20"></div>
        </div>
      </div>
      
      {/* Floating Label */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 pointer-events-none">
        <div className="bg-black border border-retro-green px-2 py-0.5 shadow-hard-sm">
           <span className="text-[8px] md:text-[10px] text-retro-green font-mono whitespace-nowrap">IMG_{String(img.id).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox: React.FC<{
  images: { id: number; label: string }[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const currentImg = images[selectedIndex];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-retro-pink transition-colors z-50"
      >
        <X size={40} strokeWidth={3} />
      </button>

      <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center group">
        
        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-0 md:-left-16 p-2 text-white hover:text-retro-green transition-colors z-20 bg-black/50 md:bg-transparent rounded-full"
        >
          <ChevronLeft size={48} />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-0 md:-right-16 p-2 text-white hover:text-retro-green transition-colors z-20 bg-black/50 md:bg-transparent rounded-full"
        >
          <ChevronRight size={48} />
        </button>

        {/* Main Image Container */}
        <div className="relative w-full h-full bg-black border-4 border-retro-green shadow-[0_0_30px_rgba(204,255,0,0.3)] flex flex-col">
            {/* Header Bar */}
            <div className="h-8 bg-retro-green flex items-center justify-between px-2">
                <span className="font-pixel text-xs text-black">VIEWER.EXE</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-black"></div>
                    <div className="w-3 h-3 bg-black"></div>
                </div>
            </div>

            {/* Image Area */}
            <div className="flex-1 relative overflow-hidden bg-gray-900 flex items-center justify-center">
                 <img 
                    src={`https://picsum.photos/seed/${currentImg.id}/1200/800`} 
                    alt={currentImg.label}
                    className="max-w-full max-h-full object-contain"
                />
                
                {/* CRT Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
            </div>

            {/* Footer Info */}
            <div className="bg-black p-4 border-t-2 border-retro-green flex justify-between items-center font-mono text-retro-offwhite">
                <div>
                    <span className="text-retro-pink block md:inline md:mr-4 font-bold"> IMG_ID: {currentImg.id}</span>
                    <span className="text-retro-cyan block md:inline font-pixel text-sm">{currentImg.label}</span>
                </div>
                <div className="text-xs text-gray-500">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate data fetching time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Generate more dummy data for the honeycomb
  const allImages = Array.from({ length: 19 }).map((_, i) => ({
    id: 200 + i,
    label: ['HACK_MODE', 'DEPLOY_NOW', 'PIZZA_TIME', 'DEBUGGING', 'WINNER', 'TEAMWORK', 'COFFEE_RUN', 'PRESENTATION', 'JUDGING', 'NETWORKING', 'CEREMONY', 'SLEEP_404'][i % 12]
  }));

  // Structure for Desktop: 4 - 5 - 4 - 5
  const desktopRows = [
    allImages.slice(0, 4),
    allImages.slice(4, 9),
    allImages.slice(9, 13),
    allImages.slice(13, 18),
  ];

  // Structure for Mobile: 2 - 3 - 2 - 3 - 2
  const mobileRows = [
    allImages.slice(0, 2),
    allImages.slice(2, 5),
    allImages.slice(5, 7),
    allImages.slice(7, 10),
    allImages.slice(10, 12),
  ];

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  };

  // Helper to find absolute index for clicking
  const findAbsoluteIndex = (id: number) => allImages.findIndex(img => img.id === id);

  return (
    <section id="gallery" className="py-24 bg-black relative overflow-hidden min-h-[600px] border-y-8 border-retro-cyan shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader title="VISUAL_LOGS" subtitle="CAPTURED_MOMENTS_FROM_THE_ARCHIVE" />

        {loading ? (
           <div className="flex justify-center items-center h-[400px]">
              <RetroLoader text="DECRYPTING_ARCHIVES..." duration={2000} />
           </div>
        ) : (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            {/* Desktop Layout (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col items-center mt-12 pb-12">
              {desktopRows.map((row, rowIndex) => (
                <div 
                    key={rowIndex} 
                    className="flex justify-center"
                    style={{ marginTop: rowIndex === 0 ? 0 : '-45px' }} // Negative margin to interlock rows
                >
                  {row.map((img) => (
                    <HexCard 
                        key={img.id} 
                        img={img} 
                        idx={findAbsoluteIndex(img.id)}
                        onClick={() => setSelectedIndex(findAbsoluteIndex(img.id))}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile Layout (Hidden on Desktop) */}
            <div className="flex md:hidden flex-col items-center mt-8 pb-12">
              {mobileRows.map((row, rowIndex) => (
                <div 
                    key={rowIndex} 
                    className="flex justify-center"
                    style={{ marginTop: rowIndex === 0 ? 0 : '-28px' }} // Adjusted negative margin for smaller hexes
                >
                  {row.map((img) => (
                    <HexCard 
                        key={img.id} 
                        img={img} 
                        idx={findAbsoluteIndex(img.id)}
                        onClick={() => setSelectedIndex(findAbsoluteIndex(img.id))}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
                <p className="font-mono text-gray-500 text-xs animate-pulse">
                    &lt; END OF STREAM /&gt;
                </p>
            </div>
          </div>
        )}
      </div>

      {/* Render Lightbox Modal */}
      {selectedIndex !== null && (
        <Lightbox 
            images={allImages}
            selectedIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
        />
      )}
    </section>
  );
};

export default Gallery;