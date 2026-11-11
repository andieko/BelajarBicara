import React from 'react';
import { X, Check, Clock, MapPin, Users, ArrowRight, Download, BookOpen } from 'lucide-react';
import { ProgramItem } from '../data/programsData.ts';

interface SyllabusModalProps {
  program: ProgramItem | null;
  onClose: () => void;
  onSelectProgramToRegister: (programId: string) => void;
  onOpenPdf: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  program,
  onClose,
  onSelectProgramToRegister,
  onOpenPdf
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-2xl border border-[#E0D8CB] dark:border-[#283344] max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#FAF9F5] dark:bg-[#11161F] border-b border-[#E8E2D6] dark:border-[#283344] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C3A16] dark:text-[#F97316] font-semibold uppercase tracking-wider mb-1">
              <img
                src="/assets/aistudio/favicon_kbb_86ee25d6.png"
                alt="Belajar Bicara"
                className="w-4 h-4 object-contain shrink-0"
              />
              <span>Program {program.code}</span>
              <span aria-hidden="true">·</span>
              <span>{program.area}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#13171F] dark:text-white">
              {program.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#94A3B8] mt-1">
              {program.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal silabus"
            className="p-1.5 rounded-lg text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white hover:bg-[#EAE4D9] dark:hover:bg-[#1E2736] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm bg-white dark:bg-[#151C26]">
          {/* Quick Info bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#FAF9F5] dark:bg-[#1A2330] rounded-lg border border-[#E8E2D6] dark:border-[#283344] text-xs">
            <div>
              <span className="text-[#6B7280] dark:text-[#94A3B8] block text-[11px]">Durasi Kelas:</span>
              <span className="font-semibold text-[#13171F] dark:text-white">{program.duration}</span>
            </div>
            <div>
              <span className="text-[#6B7280] dark:text-[#94A3B8] block text-[11px]">Format:</span>
              <span className="font-semibold text-[#13171F] dark:text-white">{program.format}</span>
            </div>
            <div>
              <span className="text-[#6B7280] dark:text-[#94A3B8] block text-[11px]">Investasi:</span>
              <span className="font-extrabold text-[#E85923] dark:text-[#F97316]">Rp {program.price.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Sasaran Peserta */}
          <div>
            <h4 className="font-bold text-[#13171F] dark:text-white text-sm mb-1.5">
              Sasaran Peserta:
            </h4>
            <p className="text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed">
              {program.recommendedFor}
            </p>
          </div>

          {/* Tujuan Pembelajaran */}
          <div>
            <h4 className="font-bold text-[#13171F] dark:text-white text-sm mb-2">
              Tujuan Pembelajaran:
            </h4>
            <div className="space-y-1.5">
              {program.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[#374151] dark:text-[#E2E8F0]">
                  <Check className="w-4 h-4 text-[#E85923] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rincian Silabus Modul per Sesi */}
          <div>
            <h4 className="font-bold text-[#13171F] dark:text-white text-sm mb-3">
              Rincian Modul & Sesi Praktik:
            </h4>
            <div className="space-y-3">
              {program.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#FAF9F5] dark:bg-[#111722] border border-[#E0D8CB] dark:border-[#283344]"
                >
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-[#E85923] dark:text-[#F97316]">
                      {item.session}
                    </span>
                  </div>
                  <h5 className="font-bold text-[#13171F] dark:text-white mb-2 text-sm">
                    {item.title}
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#4B5563] dark:text-[#CBD5E1]">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#8C3A16] dark:text-[#F97316] font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#FAF9F5] dark:bg-[#11161F] border-t border-[#E8E2D6] dark:border-[#283344] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenPdf();
            }}
            className="w-full sm:w-auto text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] hover:underline flex items-center justify-center gap-1.5 cursor-pointer py-2 px-3"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Halaman Ini di Katalog PDF</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white bg-white dark:bg-[#1E2736] border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-md transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectProgramToRegister(program.id);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Daftar Kelas Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
