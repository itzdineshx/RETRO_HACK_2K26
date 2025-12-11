
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'confirm' | 'toggle' | 'transition';

interface SoundContextType {
  play: (type: SoundType) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgGainNodeRef = useRef<GainNode | null>(null);
  const isBgPlayingRef = useRef(false);

  // Initialize Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    
    if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        // Start BG audio on first interaction if not muted
        if (!isBgPlayingRef.current && !muted) {
            startBackgroundDrone(audioCtxRef.current);
        }
    }
  };

  const startBackgroundDrone = (ctx: AudioContext) => {
    if (isBgPlayingRef.current) return;

    // Create a master gain for BG to allow fading
    const bgMasterGain = ctx.createGain();
    bgMasterGain.gain.setValueAtTime(0.02, ctx.currentTime); // Start very low
    bgMasterGain.connect(ctx.destination);
    bgGainNodeRef.current = bgMasterGain;

    // Oscillators for "Server Room" Hum
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 60; // Mains hum freq

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.value = 120; // Muffle it

    osc1.connect(filter1);
    filter1.connect(bgMasterGain);
    osc1.start();

    // High pitched subtle CRT whine
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 15000; // barely audible
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.05; 
    
    osc2.connect(gain2);
    gain2.connect(bgMasterGain);
    osc2.start();

    isBgPlayingRef.current = true;
  };

  const play = (type: SoundType) => {
    // Always try to init on interaction
    initAudio();
    
    if (muted) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'hover':
        // High pitched short blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
        
      case 'click':
        // Lower pitched selection sound
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'confirm':
        // Success chord/arpeggio-ish
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      
      case 'toggle':
        // Mechanical switch sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'transition':
        // Sci-fi swipe/woosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        
        // Add noise burst for texture
        const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
        break;
    }
  };

  const toggleMute = () => {
    initAudio(); 
    
    // Handle background audio fade
    if (bgGainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        if (muted) {
            // Unmuting: Fade in
            bgGainNodeRef.current.gain.cancelScheduledValues(now);
            bgGainNodeRef.current.gain.setValueAtTime(0, now);
            bgGainNodeRef.current.gain.linearRampToValueAtTime(0.02, now + 1); // 1s fade in
        } else {
            // Muting: Fade out
            bgGainNodeRef.current.gain.cancelScheduledValues(now);
            bgGainNodeRef.current.gain.setValueAtTime(bgGainNodeRef.current.gain.value, now);
            bgGainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.5); // 0.5s fade out
        }
    } else if (muted && !isBgPlayingRef.current && audioCtxRef.current) {
        // If unmuting and bg wasn't playing, start it
        startBackgroundDrone(audioCtxRef.current);
    }

    setMuted(!muted);
  };

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
