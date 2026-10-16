import React, { useState, useEffect } from 'react';
import { calculateScrollProgress } from '../utils/portfolioLogic';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const currentProgress = calculateScrollProgress(scrollY, scrollHeight, innerHeight);
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-neutral-950/60 pointer-events-none"
      role="progressbar"
      aria-label="Scroll Journey Progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Elegant Violet Progress Indicator with Luminous Leading Edge */}
      <div
        className="h-full bg-gradient-to-r from-violet-700 via-violet-500 to-indigo-400 relative transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(139,92,246,0.85)]"
        style={{ width: `${progress}%` }}
      >
        {/* Luminous Pulseless Glow Tip at Leading Edge */}
        {progress > 0 && progress < 99.8 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-violet-200 shadow-[0_0_10px_2px_rgba(168,85,247,0.9)]" />
        )}
      </div>
    </div>
  );
};
