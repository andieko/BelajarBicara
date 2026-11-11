import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable > 0) {
        const percentage = (scrollY / totalScrollable) * 100;
        setScrollProgress(Math.min(100, Math.max(0, percentage)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3.5px] bg-[#E8E2D6]/40 dark:bg-[#283344]/50 pointer-events-none"
      role="progressbar"
      aria-label="Reading depth progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-[#E85923] via-[#F97316] to-[#EA580C] transition-[width] duration-100 ease-out shadow-[0_0_8px_rgba(232,89,35,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
