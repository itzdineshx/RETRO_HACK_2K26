
import React, { useState } from 'react';
import { Github, Twitter, Instagram, Mail, Send, Terminal, Globe, Shield, Wifi } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import DecryptionText from './DecryptionText';

const Footer: React.FC = () => {
  const { play } = useSound();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      play('confirm');
      setSubscribed(true);
      setTimeout(() => {
          setEmail('');
          setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-black border-t-8 border-retro-green pt-16 pb-0 relative overflow-hidden shadow-[inset_0_10px_0_#000]">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #00ff00 25%, #00ff00 26%, transparent 27%, transparent 74%, #00ff00 75%, #00ff00 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #00ff00 25%, #00ff00 26%, transparent 27%, transparent 74%, #00ff00 75%, #00ff00 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-6">
            <div className="group inline-block">
               <h2 className="text-3xl font-pixel text-white mb-2 group-hover:text-retro-green transition-colors cursor-default">
                DMICE<span className="text-retro-pink">.<DecryptionText text="HACK()" /></span>
              </h2>
              <div className="h-1 w-full bg-retro-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
            
            <p className="font-mono text-gray-400 text-sm leading-relaxed">
              Initiating protocol: INNOVATION. 
              Join the neural network of developers building the future.
            </p>

            <div className="bg-gray-900 border-2 border-gray-700 p-4 shadow-[4px_4px_0_#000]">
                <div className="flex items-center gap-2 mb-2 text-retro-green font-pixel text-[10px]">
                    <Terminal size={12} />
                    <span>NEWSLETTER_SUBSCRIPTION.EXE</span>
                </div>
                {subscribed ? (
                    <div className="text-retro-pink font-mono text-xs animate-pulse">
                        &gt; SUBSCRIBED SUCCESSFULLY!
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="relative">
                        <span className="absolute left-2 top-2.5 text-gray-500 font-mono">&gt;</span>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER_EMAIL"
                            className="w-full bg-black border border-gray-600 py-2 pl-6 pr-8 text-white font-mono text-xs focus:border-retro-green focus:outline-none"
                        />
                        <button type="submit" className="absolute right-1 top-1 p-1 text-retro-green hover:text-white" onMouseEnter={() => play('hover')}>
                            <Send size={14} />
                        </button>
                    </form>
                )}
            </div>
          </div>

          {/* Column 2: Directory Tree */}
          <div>
            <h3 className="text-retro-cyan font-pixel text-lg mb-6 border-b-2 border-gray-800 pb-2 inline-block">
                SYSTEM_DIRECTORY
            </h3>
            <ul className="space-y-2 font-mono text-sm text-gray-400">
                {['ABOUT', 'TRACKS', 'PRIZES', 'SCHEDULE', 'FAQ'].map((link) => (
                    <li key={link} className="group flex items-center">
                        <span className="text-gray-700 mr-2">├──</span>
                        <a 
                            href={`#${link.toLowerCase()}`}
                            className="hover:text-retro-pink hover:translate-x-1 transition-all flex items-center gap-2"
                            onMouseEnter={() => play('hover')}
                            onClick={() => play('click')}
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-retro-green text-[10px]">DIR</span>
                            {link}
                        </a>
                    </li>
                ))}
                <li className="group flex items-center">
                    <span className="text-gray-700 mr-2">└──</span>
                    <a href="#register" className="text-retro-green hover:text-white font-bold hover:translate-x-1 transition-all">REGISTER.BAT</a>
                </li>
            </ul>
          </div>

          {/* Column 3: Communication Links */}
          <div>
             <h3 className="text-retro-pink font-pixel text-lg mb-6 border-b-2 border-gray-800 pb-2 inline-block">
                COMMS_CHANNEL
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { icon: Github, label: 'GITHUB', color: 'hover:border-white hover:text-white' },
                    { icon: Twitter, label: 'TWITTER', color: 'hover:border-[#1DA1F2] hover:text-[#1DA1F2]' },
                    { icon: Instagram, label: 'INSTA', color: 'hover:border-[#E1306C] hover:text-[#E1306C]' },
                    { icon: Mail, label: 'EMAIL', color: 'hover:border-retro-green hover:text-retro-green' }
                ].map((social, idx) => (
                    <a 
                        key={idx} 
                        href="#" 
                        className={`
                            flex flex-col items-center justify-center p-4 bg-gray-900 border-2 border-gray-700 
                            transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000]
                            group ${social.color}
                        `}
                        onMouseEnter={() => play('hover')}
                        onClick={() => play('click')}
                    >
                        <social.icon size={24} className="mb-2 text-gray-400 group-hover:text-current transition-colors" />
                        <span className="font-pixel text-[10px] text-gray-500 group-hover:text-current transition-colors">{social.label}</span>
                    </a>
                ))}
            </div>
          </div>

          {/* Column 4: System Status */}
          <div>
            <h3 className="text-retro-green font-pixel text-lg mb-6 border-b-2 border-gray-800 pb-2 inline-block">
                SERVER_STATUS
            </h3>
            <div className="bg-black border-2 border-retro-green p-4 font-mono text-xs shadow-[0_0_10px_rgba(204,255,0,0.1)]">
                <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
                    <span className="text-gray-400">MAINFRAME:</span>
                    <span className="text-retro-green flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-retro-green animate-pulse"></span> ONLINE
                    </span>
                </div>
                <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
                    <span className="text-gray-400">LATENCY:</span>
                    <span className="text-retro-cyan">24ms</span>
                </div>
                <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
                    <span className="text-gray-400">UPTIME:</span>
                    <span className="text-retro-pink">99.9%</span>
                </div>
                <div className="mt-3 pt-2 border-t border-dashed border-gray-700 text-center text-gray-500 text-[10px]">
                    LAST_UPDATE: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="mt-6 flex gap-4 text-gray-600">
                <Shield size={20} />
                <Globe size={20} />
                <Wifi size={20} />
            </div>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="border-t-2 border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-gray-500">
                © 2025 DMICE. DEPLOYED ON <span className="text-white">EARTH</span>.
            </p>
            <div className="flex gap-6 font-pixel text-[10px] text-gray-600">
                <a href="#" className="hover:text-retro-green hover:underline">PRIVACY_POLICY</a>
                <a href="#" className="hover:text-retro-green hover:underline">TERMS_OF_SERVICE</a>
                <a href="#" className="hover:text-retro-green hover:underline">CODE_OF_CONDUCT</a>
            </div>
        </div>
      </div>
      
      {/* Running text at the very bottom */}
      <div className="w-full bg-retro-green text-black font-pixel text-[10px] py-1 border-t-2 border-black overflow-hidden relative">
        <div className="animate-marquee-footer whitespace-nowrap inline-block">
             SYSTEM OPERATIONAL // ALL SYSTEMS GO // WELCOME TO THE FUTURE // HACK THE PLANET // SYSTEM OPERATIONAL // ALL SYSTEMS GO // WELCOME TO THE FUTURE // HACK THE PLANET // SYSTEM OPERATIONAL // ALL SYSTEMS GO // WELCOME TO THE FUTURE // HACK THE PLANET
        </div>
      </div>
      
      <style>{`
        @keyframes marqueeFooter {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-footer {
          animation: marqueeFooter 30s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
