import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
        isDark
          ? 'bg-[#1E2632] border-[#364252] text-[#F3F4F6] hover:bg-[#283342] hover:border-[#F97316]/50'
          : 'bg-[#F2ECE1] border-[#DCD5C9] text-[#13171F] hover:bg-[#EAE4D9] hover:border-[#B8AF9F]'
      } ${className}`}
      aria-label={isDark ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap Kontras Tinggi (Dark Mode)'}
      title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap (High Contrast)'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-[#5A6472] transition-transform duration-200 rotate-0 scale-100" />
        )}
      </div>
      {showLabel && (
        <span className="whitespace-nowrap">
          {isDark ? 'Mode Terang' : 'Mode Gelap'}
        </span>
      )}
    </button>
  );
};
