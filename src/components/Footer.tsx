import React from 'react';
import { FileText, Phone, Mail, MapPin, ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onOpenPdf: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdf, onScrollToSection, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#13171F] text-gray-300 pt-16 pb-12 border-t border-[#232B36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/kbbLogo_dark_8c5b8668.png"
                alt="Kelas Belajar Bicara - NMARK Indonesia"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Program resmi pelatihan komunikasi dan public speaking dari PT NMARK Manajemen Indonesia yang berfokus pada peningkatan rasa percaya diri dan kinerja profesional.
            </p>
            <div className="text-xs text-[#E85923] font-semibold italic">
              “Bicara Jadi Lebih Bermakna · Building Better Communicators.”
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-white block">
              Navigasi Halaman
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onScrollToSection('program-kelas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Program Kelas 2027
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('metodologi')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Metodologi 5-Tahap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pilihan Model Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('assessment')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cek Level Bicara
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('pendaftaran')}
                  className="hover:text-[#E85923] font-semibold transition-colors cursor-pointer"
                >
                  Formulir Pendaftaran
                </button>
              </li>
            </ul>
          </div>

          {/* Dokumen & Download */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-white block">
              Dokumen Resmi
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={onOpenPdf}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[#E85923]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Katalog Program 2027 (PDF)</span>
                </button>
              </li>
              <li>
                <a
                  href="/assets/aistudio/Katalog_Program_NMARK_2027_18047bfc.pdf"
                  download="Katalog_Program_NMARK_2027.pdf"
                  className="hover:text-white transition-colors"
                >
                  Unduh Dokumen Brosur
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-gray-400 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E85923]" />
                  <span>Syarat & Ketentuan Kelas</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-gray-400 hover:underline"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kebijakan Privasi Peserta</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak Kantor */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-white block">
              Kantor & Kontak
            </span>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E85923] shrink-0 mt-0.5" />
                <span>NMARK Tower, Kawasan Mega Kuningan, Jakarta Selatan 12950</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E85923] shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=628181494240&text=Halo%20NMARK,%20saya%20ingin%20tanya%20informasi%20kelas%20Belajar%20Bicara."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="font-semibold text-white">+62 818-1494-240</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded font-medium">WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E85923] shrink-0" />
                <span>admission@nmarkmanagement.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © 2027 PT NMARK Manajemen Indonesia. Hak Cipta Dilindungi Undang-Undang.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
