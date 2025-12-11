
import React from 'react';
import DecryptionText from './DecryptionText';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, align = 'center' }) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignClasses[align]} relative`}>
      <h2 className="text-3xl md:text-5xl font-pixel text-retro-green uppercase mb-4 drop-shadow-[4px_4px_0_rgba(255,0,153,0.5)]">
        <DecryptionText text={title} />
      </h2>
      {subtitle && (
        <p className="text-retro-offwhite text-lg md:text-xl font-mono max-w-2xl mx-auto border-l-4 border-retro-pink pl-4 bg-retro-dark/50 p-2">
          {subtitle}
        </p>
      )}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-retro-green"></div>
    </div>
  );
};

export default SectionHeader;
