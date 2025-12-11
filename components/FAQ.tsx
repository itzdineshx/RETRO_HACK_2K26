import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { FaqItem } from '../types';
import { Plus, Minus, Terminal } from 'lucide-react';

const faqData: FaqItem[] = [
  { question: "WHO CAN PARTICIPATE?", answer: "This hackathon is open to all university students, regardless of their major or coding experience. If you have an interest in technology and innovation, you are welcome." },
  { question: "HOW MUCH DOES IT COST?", answer: "Zero. Zip. Nada. Admission is 100% free for all admitted hackers. We also provide meals, drinks, and swag." },
  { question: "WHAT IF I DON'T HAVE A TEAM?", answer: "Don't panic! We will host a team formation session at the beginning of the event to help you find teammates with complementary skills." },
  { question: "CAN I START WORKING BEFORE THE EVENT?", answer: "No. In the spirit of fairness, all projects must be built from scratch during the hackathon. You can, however, brainstorm ideas and set up your development environment." },
  { question: "WHAT SHOULD I BRING?", answer: "Bring your laptop, charger, toiletries, a sleeping bag (if you plan to nap), and your hacking spirit. Hardware hacking gear will be provided for specific tracks." },
  { question: "IS THERE A CODE OF CONDUCT?", answer: "Yes. We want to ensure a safe and welcoming environment for everyone. All participants must adhere to the DMICE Code of Conduct." },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="py-24 bg-retro-dark relative overflow-hidden border-y-8 border-retro-green shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000]">
      {/* Decorative Matrix-like background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <SectionHeader title="F.A.Q." subtitle="FREQUENTLY_ASKED_QUERIES" />

        <div className="mt-12 relative">
          {/* Main Container with Retro Border and Hard Shadow */}
          <div className="border-4 border-retro-pink bg-black p-6 md:p-8 shadow-hard relative z-10">
            
            {/* Decorative Label Tag */}
            <div className="absolute -top-4 left-4 sm:left-8 bg-retro-pink text-white font-pixel text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0_#000]">
              KNOWLEDGE_BASE.DB
            </div>

            <div className="space-y-4 mt-2">
              {faqData.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`border-2 transition-all duration-300 ${isOpen ? 'border-retro-green bg-gray-900' : 'border-gray-700 bg-black hover:border-retro-pink'}`}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-xs ${isOpen ? 'text-retro-green' : 'text-gray-500'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-pixel text-sm md:text-base uppercase transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-retro-pink'}`}>
                          {item.question}
                        </span>
                      </div>
                      <div className={`p-1 border-2 transition-colors ${isOpen ? 'border-retro-green bg-retro-green text-black' : 'border-gray-600 text-gray-400 group-hover:border-retro-pink group-hover:text-retro-pink'}`}>
                        {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                      </div>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-4 md:p-5 pt-0 text-gray-400 font-mono leading-relaxed border-t border-dashed border-gray-700 mx-4 md:mx-5 mt-2">
                         <div className="flex gap-2">
                            <Terminal size={16} className="text-retro-pink mt-1 flex-shrink-0" />
                            <p className="text-sm md:text-base">{item.answer}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Background offset decoration for extra depth */}
          <div className="absolute top-4 left-4 w-full h-full border-4 border-gray-800 bg-transparent -z-10 hidden md:block"></div>
        </div>
        
        <div className="mt-12 text-center">
            <p className="font-mono text-gray-500 text-sm">
                STILL HAVE QUESTIONS? <a href="mailto:hack@dmice.ac.in" className="text-retro-pink underline decoration-dashed hover:text-white">EMAIL_US</a>
            </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;