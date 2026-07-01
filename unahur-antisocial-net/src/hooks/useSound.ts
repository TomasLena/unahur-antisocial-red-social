import { useMemo } from 'react';
import bipSound from '../assets/bip.mp3';

export const useSound = () => {
  const audio = useMemo(() => {
    const a = new Audio(bipSound);
    a.volume = 1.0; 
    return a;
  }, []);

  const playBip = () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return { playBip };
};