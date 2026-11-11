import React from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = '/assets/aistudio/Katalog_Program_NMARK_2027_18047bfc.pdf';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-2xl border border-[#DCD5C9] dark:border-[#283344] w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF9F5] dark:bg-[#11161F] border-b border-[#E8E2D6] dark:border-[#283344] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-white dark:bg-[#1E2736] p-1.5 flex items-center justify-center shrink-0 border border-[#DCD5C9] dark:border-white/10 shadow-xs">
              <img
                src="/assets/aistudio/favicon_kbb_86ee25d6.png"
                alt="Logo Belajar Bicara"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#13171F] dark:text-white leading-tight">
                Katalog Program 2027 — NMARK Manajemen Indonesia
              </h3>
              <p className="text-[11px] sm:text-xs text-[#6B7280] dark:text-[#94A3B8]">
                Communication Training & Development · 6 Halaman Resmi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Katalog_Program_NMARK_2027.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white hover:bg-[#EAE4D9] dark:hover:bg-[#1E2736] rounded-md transition-colors"
              title="Buka di tab baru"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              aria-label="Tutup pratinjau PDF"
              className="p-2 text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white hover:bg-[#EAE4D9] dark:hover:bg-[#1E2736] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-[#1A202C] dark:bg-[#0D1117] relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&view=FitH`}
            title="Katalog Program NMARK 2027"
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#FAF9F5] dark:bg-[#11161F] border-t border-[#E8E2D6] dark:border-[#283344] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] dark:text-[#94A3B8] gap-2">
          <span>
            Sumber Resmi: NMARK Management & Communication Consulting Indonesia (2027).
          </span>
          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              download="Katalog_Program_NMARK_2027.pdf"
              className="sm:hidden text-xs font-semibold text-[#E85923] dark:text-[#F97316] underline"
            >
              Unduh File PDF
            </a>
            <button
              onClick={onClose}
              className="px-3.5 py-1 text-xs font-semibold text-[#13171F] dark:text-[#F3F4F6] hover:bg-[#EAE4D9] dark:hover:bg-[#1E2736] rounded transition-colors"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
