
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import RetroButton from './components/RetroButton';
import ScrollToTop from './components/ScrollToTop';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Prizes from './components/Prizes';
import Mentors from './components/Mentors';
import { SoundProvider } from './context/SoundContext';
import CustomCursor from './components/CustomCursor';
import ParticleTrail from './components/ParticleTrail';
import { useParallax } from './hooks/useParallax';
import SectionHeader from './components/SectionHeader';
import DecryptionText from './components/DecryptionText';

const App: React.FC = () => {
  // Parallax hooks for the About section
  const parallaxBg = useParallax(0.05);
  const parallaxImg = useParallax(-0.05);

  return (
    <SoundProvider>
        <div className="min-h-screen bg-retro-dark text-retro-offwhite font-mono selection:bg-retro-pink selection:text-white cursor-none">
          <CustomCursor />
          <ParticleTrail />
          <Navbar />
          
          <main>
            <Hero />
            
            <section id="about" className="py-24 bg-white text-black border-y-8 border-retro-pink shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000] relative overflow-hidden">
              {/* Parallax Background Decoration */}
              <div 
                style={parallaxBg}
                className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
              >
                 <div className="w-full h-full bg-[radial-gradient(circle,_#FF0099_2px,_transparent_2px)] bg-[length:20px_20px]"></div>
              </div>

              <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div 
                    style={parallaxImg}
                    className="bg-retro-green p-2 border-4 border-black shadow-hard transform rotate-1 hover:rotate-0 transition-transform duration-300"
                >
                    <img 
                        src="https://picsum.photos/600/400" 
                        alt="Hackathon Coding" 
                        className="w-full h-auto grayscale contrast-125 border-2 border-black"
                    />
                </div>
                <div>
                    <div className="mb-6">
                         <h2 className="text-4xl font-pixel uppercase drop-shadow-[2px_2px_0_#000] text-retro-pink inline-block">
                             <DecryptionText text="About The Event" />
                         </h2>
                    </div>
                    
                    <p className="text-lg leading-relaxed mb-6 font-medium font-mono">
                        RetroHack 2025 is DMICE's flagship 24-hour hackathon. We are bringing together the brightest minds to solve real-world problems with a nostalgic twist.
                    </p>
                    <ul className="space-y-2 mb-8 font-bold font-mono">
                        <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-black"></span> $10,000 Prize Pool
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-black"></span> Free Food & Swag
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-black"></span> Industry Mentors
                        </li>
                    </ul>
                    <RetroButton>DOWNLOAD BROCHURE</RetroButton>
                </div>
              </div>
            </section>

            <Tracks />
            
            <Prizes />

            <Timeline />
            
            {/* Challenges component was removed in previous steps */}

            <Mentors />

            <Gallery />

            <Sponsors />

            <FAQ />
            
            <section id="register" className="py-24 bg-retro-pink border-t-8 border-retro-green shadow-[inset_0_4px_0_#000] text-center">
                 <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-8">
                        <h2 className="text-4xl md:text-6xl font-pixel text-white drop-shadow-[4px_4px_0_#000] inline-block">
                             <DecryptionText text="READY TO DEPLOY?" />
                        </h2>
                    </div>
                    
                    <p className="text-white font-mono text-xl mb-12 max-w-2xl mx-auto font-bold text-shadow">
                        Spots are limited. Secure your terminal access before the mainframe locks down.
                    </p>
                    <div className="bg-white p-8 border-4 border-black shadow-hard max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform">
                        <form className="space-y-4">
                            <div className="text-left">
                                <label className="font-pixel text-xs text-black mb-1 block">FULL_NAME</label>
                                <input type="text" className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-retro-green focus:outline-none focus:shadow-[4px_4px_0_#000] transition-shadow" />
                            </div>
                            <div className="text-left">
                                <label className="font-pixel text-xs text-black mb-1 block">TEAM_NAME</label>
                                <input type="text" className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-retro-green focus:outline-none focus:shadow-[4px_4px_0_#000] transition-shadow" />
                            </div>
                            <div className="text-left">
                                 <label className="font-pixel text-xs text-black mb-1 block">EMAIL_ADDR</label>
                                <input type="email" className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-retro-green focus:outline-none focus:shadow-[4px_4px_0_#000] transition-shadow" />
                            </div>
                            <RetroButton fullWidth className="mt-4">CONFIRM REGISTRATION</RetroButton>
                        </form>
                    </div>
                 </div>
            </section>
          </main>

          <Footer />
          <ScrollToTop />
        </div>
    </SoundProvider>
  );
};

export default App;
