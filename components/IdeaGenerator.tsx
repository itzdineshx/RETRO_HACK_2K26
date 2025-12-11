import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import RetroButton from './RetroButton';
import { generateHackathonIdeas } from '../services/geminiService';
import { Cpu, Sparkles } from 'lucide-react';
import RetroLoader from './RetroLoader';

const IdeaGenerator: React.FC = () => {
  const [track, setTrack] = useState('');
  const [ideas, setIdeas] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!track) return;
    setLoading(true);
    // Mimic at least a 2s load time for the effect
    const [result] = await Promise.all([
        generateHackathonIdeas(track),
        new Promise(resolve => setTimeout(resolve, 2000))
    ]);
    setIdeas(result);
    setLoading(false);
  };

  return (
    <section id="ai-helper" className="py-20 bg-retro-dark border-t-4 border-retro-purple relative overflow-hidden">
        {/* Background grid variant */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#9D00FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeader title="AI IDEA GENERATOR" subtitle="Stuck? Let our retro mainframe suggest a project." />

        <div className="bg-black border-4 border-retro-purple p-8 shadow-hard relative">
          <div className="absolute -top-4 -right-4 bg-retro-green text-black font-pixel text-xs px-2 py-1 border-2 border-black">
            POWERED BY GEMINI 2.5
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <label htmlFor="track" className="block text-retro-purple font-mono font-bold mb-2 uppercase">
                ENTER THEME / KEYWORD:
              </label>
              <div className="relative">
                <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="track"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  placeholder="e.g. Health, Blockchain, Education..."
                  className="w-full bg-gray-900 border-2 border-gray-600 text-white pl-10 pr-4 py-3 font-mono focus:border-retro-purple focus:outline-none focus:shadow-[0_0_10px_#9D00FF] transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>
            </div>
            <div className="flex items-end">
              <RetroButton onClick={handleGenerate} disabled={loading} variant="secondary" className="h-[50px]">
                {loading ? "BUSY..." : <><Sparkles className="inline mr-2 w-4 h-4"/> GENERATE</>}
              </RetroButton>
            </div>
          </div>

          <div className="bg-gray-900 min-h-[200px] p-6 border-2 border-dashed border-gray-700 font-mono text-retro-offwhite flex flex-col justify-center">
            {loading ? (
                <div className="w-full flex justify-center">
                    <RetroLoader text="CONTACTING_MAINFRAME..." duration={3000} />
                </div>
            ) : ideas ? (
                <div className="whitespace-pre-line leading-relaxed h-full flex flex-col justify-start">
                    <span className="text-retro-green block mb-2">&gt; OUTPUT RECEIVED:</span>
                    {ideas}
                    <div className="mt-4 animate-pulse inline-block w-3 h-5 bg-retro-green align-middle"></div>
                </div>
            ) : (
                <div className="text-gray-500 text-center">
                    &gt; WAITING FOR INPUT...<br/>
                    &gt; READY TO SYNTHESIZE IDEAS.
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator;