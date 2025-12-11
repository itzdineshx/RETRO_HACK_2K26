import React from 'react';
import SectionHeader from './SectionHeader';
import { ScheduleItem } from '../types';

const schedule: ScheduleItem[] = [
  { time: '09:00 AM', event: 'REGISTRATION', description: 'Check-in and swag collection.' },
  { time: '10:30 AM', event: 'OPENING CEREMONY', description: 'Keynote speakers and rules briefing.' },
  { time: '12:00 PM', event: 'HACKING BEGINS', description: 'Start your engines.' },
  { time: '04:00 PM', event: 'WORKSHOP 1', description: 'Intro to GenAI with Gemini.' },
  { time: '08:00 PM', event: 'DINNER BREAK', description: 'Fuel up.' },
  { time: '12:00 AM', event: 'MIDNIGHT SNACKS', description: 'Pizza & Caffeine.' },
];

const Timeline: React.FC = () => {
  return (
    <section id="schedule" className="py-20 bg-retro-dark relative overflow-hidden retro-grid border-y-8 border-retro-green shadow-[inset_0_4px_0_#000,inset_0_-4px_0_#000]">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeader title="TIMELINE" subtitle="Sync your watches." />

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-retro-green transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {schedule.map((item, index) => (
              <div key={index} className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black border-4 border-retro-green z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-retro-pink animate-pulse"></div>
                </div>

                {/* Content Box */}
                <div className="ml-10 md:ml-0 w-[calc(100%-3rem)] md:w-5/12 bg-gray-900 border-2 border-retro-green p-4 shadow-[4px_4px_0_rgba(204,255,0,0.3)] hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-start mb-2 border-b border-gray-700 pb-2">
                    <span className="text-retro-pink font-pixel text-xs md:text-sm">{item.time}</span>
                    <span className="text-gray-500 font-mono text-xs">EVT_0{index + 1}</span>
                  </div>
                  <h3 className="text-white font-bold font-pixel mb-1 text-sm md:text-base">{item.event}</h3>
                  <p className="text-gray-400 font-mono text-xs md:text-sm">{item.description}</p>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;