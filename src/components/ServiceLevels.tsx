import React from 'react';
import { SERVICE_LEVELS } from '../data/programsData.ts';
import { Check, ArrowRight, Layers } from 'lucide-react';

interface ServiceLevelsProps {
  onSelectLevel: (levelTitle: string) => void;
  onOpenPdf: () => void;
}

export const ServiceLevels: React.FC<ServiceLevelsProps> = ({ onSelectLevel, onOpenPdf }) => {
  return (
    <section id="layanan" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8E2D6] dark:border-[#222B38] gap-4">
        <div>
          <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
            Pilihan Model Layanan
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
            Fleksibilitas Format untuk Setiap Kebutuhan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1] max-w-2xl">
            Dari pelatihan intensif akhir pekan untuk individu, hingga program transformasi komunikasi strategis berskala organisasi.
          </p>
        </div>

        <button
          onClick={onOpenPdf}
          className="text-xs font-semibold text-[#8C3A16] dark:text-[#FFA27B] hover:text-[#E85923] underline underline-offset-4 cursor-pointer"
        >
          Lihat Halaman 3 Katalog PDF &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {SERVICE_LEVELS.map((service, index) => (
          <div
            key={service.level}
            className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
              service.isPopular
                ? 'bg-white dark:bg-[#151C26] border-[#E85923] shadow-md ring-1 ring-[#E85923]/30'
                : 'bg-white dark:bg-[#151C26] border-[#E0D8CB] dark:border-[#283344]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono font-bold text-[#E85923] uppercase">
                  {service.level}
                </span>
                <span className="text-[#6B7280] dark:text-[#94A3B8] font-medium">
                  {service.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#13171F] dark:text-white tracking-tight mb-2">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed mb-6">
                {service.summary}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#F0EBE1] dark:border-[#253040] mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#94A3B8] block mb-1">
                  Fitur Layanan:
                </span>
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2D3748] dark:text-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#E85923] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EBE1] dark:border-[#253040]">
              <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mb-3">
                <span className="font-semibold text-[#13171F] dark:text-white">Sasaran:</span> {service.recommended}
              </div>
              <button
                onClick={() => onSelectLevel(service.title)}
                className={`w-full py-2.5 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  service.isPopular
                    ? 'bg-[#E85923] hover:bg-[#D44A17] text-white shadow-xs'
                    : 'bg-[#13171F] dark:bg-[#202A38] hover:bg-[#E85923] text-white'
                }`}
              >
                <span>Konsultasikan Model Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
