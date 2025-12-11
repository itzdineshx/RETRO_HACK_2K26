import React from 'react';
import SectionHeader from './SectionHeader';
import { FileText, Lock } from 'lucide-react';

const challenges = [
  {
    title: 'OPERATION: GREEN_EARTH',
    difficulty: 'MEDIUM',
    desc: 'Develop a sustainable tech solution to monitor, reduce, or offset carbon footprints in urban environments.',
    status: 'DECLASSIFIED'
  },
  {
    title: 'PROJECT: NEURAL_LINK',
    difficulty: 'HARD',
    desc: 'Create an accessible interface that allows users with disabilities to navigate the web using limited input.',
    status: 'DECLASSIFIED'
  },
  {
    title: 'MISSION: SECURE_CHAIN',
    difficulty: 'EXTREME',
    desc: 'Build a decentralized identity verification system that preserves user privacy while ensuring authenticity.',
    status: 'CLASSIFIED'
  }
];

const Challenges: React.FC = () => {
  return (
    <section id="challenges" className="py-24 bg-gray-900 border-t-8 border-retro-green">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="MISSION BRIEFINGS" subtitle="TOP_SECRET_FILES" />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {challenges.map((challenge, idx) => (
            <div key={idx} className="bg-retro-offwhite text-black p-1 relative shadow-hard transform hover:-translate-y-2 transition-transform duration-300">
              {/* Folder Tab */}
              <div className="absolute -top-8 left-0 w-1/3 h-8 bg-retro-offwhite rounded-t-lg border-t-4 border-l-4 border-r-4 border-black"></div>
              
              <div className="border-4 border-black h-full p-6 relative bg-retro-offwhite">
                <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-2">
                   <FileText className="w-8 h-8" />
                   <span className="font-pixel text-xs bg-black text-white px-2 py-1">
                      {challenge.status}
                   </span>
                </div>
                
                <h3 className="font-pixel text-lg mb-2 leading-snug">{challenge.title}</h3>
                
                <div className="mb-4">
                    <span className="font-mono text-xs font-bold bg-retro-pink text-white px-1">
                        DIFFICULTY: {challenge.difficulty}
                    </span>
                </div>

                <p className="font-mono text-sm leading-relaxed mb-8">
                    {challenge.desc}
                </p>

                <div className="absolute bottom-4 right-4 opacity-20">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" className="w-16 h-16" alt="qr" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;