
import React from 'react';
import { useSound } from '../context/SoundContext';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  onClick,
  ...props 
}) => {
  const { play } = useSound();
  
  const baseStyles = "font-pixel uppercase transition-all duration-200 ease-in-out border-4 border-black font-bold relative active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus:outline-none hover:scale-105 z-10";
  
  const variants = {
    primary: "bg-retro-green text-black shadow-hard hover:bg-white hover:shadow-[6px_6px_0px_0px_#000,0_0_20px_rgba(204,255,0,0.6)]",
    secondary: "bg-retro-cyan text-black shadow-hard hover:bg-white hover:shadow-[6px_6px_0px_0px_#000,0_0_20px_rgba(0,255,255,0.6)]",
    // Danger variant: Pink background, white text, hard shadow, subtle hover effect
    danger: "bg-retro-pink text-white shadow-hard hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_#000,0_0_20px_rgba(255,0,153,0.6)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    play('click');
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    play('hover');
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
};

export default RetroButton;
