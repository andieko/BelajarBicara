import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.tsx';

interface NavbarProps {
  onOpenPdf: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf, onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Program Kelas', id: 'program-kelas' },
    { label: 'Metodologi 5-Tahap', id: 'metodologi' },
    { label: 'Model Layanan', id: 'layanan' },
    { label: 'Cek Level Bicara', id: 'assessment' },
    { label: 'FAQ', id: 'faq' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF9F5]/95 dark:bg-[#0D1117]/95 backdrop-blur-md border-b border-[#E8E2D6] dark:border-[#222B38] shadow-xs'
          : 'bg-[#FAF9F5] dark:bg-[#0D1117] border-b border-[#E8E2D6]/60 dark:border-[#222B38]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Brand Logo (Theme-adaptive official logos) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0 py-1"
            aria-label="Kelas Belajar Bicara - Beranda"
          >
            <img
              src="/assets/aistudio/kbbLogo_light_88986273.png"
              alt="Kelas Belajar Bicara - Bicara Jadi Lebih Bermakna"
              className="h-10 sm:h-12 w-auto object-contain block dark:hidden transition-transform group-hover:scale-[1.02]"
            />
            <img
              src="/assets/aistudio/kbbLogo_dark_8c5b8668.png"
              alt="Kelas Belajar Bicara - Bicara Jadi Lebih Bermakna"
              className="h-10 sm:h-12 w-auto object-contain hidden dark:block transition-transform group-hover:scale-[1.02]"
            />
            <div className="hidden xl:flex flex-col border-l border-[#DCD5C9] dark:border-[#283344] pl-3 leading-tight">
              <span className="text-[11px] font-bold text-[#13171F] dark:text-[#E2E8F0]">
                NMARK Indonesia
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                Program Resmi 2027
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#4B5563] dark:text-[#9CA3AF]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="hover:text-[#13171F] dark:hover:text-white hover:underline underline-offset-4 decoration-[#E85923] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] hover:text-[#E85923] transition-colors whitespace-nowrap shrink-0 cursor-pointer px-2.5 py-1 rounded bg-[#FBEFEA] dark:bg-[#2A1D18] hover:bg-[#F7E2D9] dark:hover:bg-[#38241D] border border-transparent dark:border-[#F97316]/20"
              title="Buka Dokumen Resmi Katalog Program 2027 (PDF)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Katalog PDF</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action + Theme Switcher */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => onScrollToSection('pendaftaran')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#13171F] dark:bg-[#E85923] hover:bg-[#E85923] dark:hover:bg-[#D44A17] active:scale-[0.98] rounded-md transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Daftar Kelas Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => onScrollToSection('pendaftaran')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E85923] rounded-md whitespace-nowrap"
            >
              Daftar
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#4B5563] dark:text-gray-300 hover:text-[#13171F] dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E2D6] dark:border-[#222B38] bg-[#FAF9F5] dark:bg-[#11161F] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScrollToSection(link.id);
                }}
                className="text-left px-3 py-2 text-sm font-medium text-[#13171F] dark:text-[#E2E8F0] hover:bg-[#F2ECE1] dark:hover:bg-[#1A222E] rounded-md"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPdf();
              }}
              className="flex items-center gap-2 text-left px-3 py-2 text-sm font-medium text-[#8C3A16] dark:text-[#F97316] hover:bg-[#FBEFEA] dark:hover:bg-[#2A1D18] rounded-md"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat Katalog Lengkap NMARK (PDF)</span>
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=628181494240&text=Halo%20NMARK,%20saya%20ingin%20tanya%20informasi%20kelas%20Belajar%20Bicara."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-left px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WhatsApp: +62 818-1494-240</span>
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToSection('pendaftaran');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#13171F] dark:bg-[#E85923] rounded-md"
            >
              <span>Formulir Pendaftaran Kelas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
