import React from 'react';
import { TRAINERS, TESTIMONIALS } from '../data/programsData.ts';
import { Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndTrainers: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF9F5] dark:bg-[#0D1117] border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Trainers */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
              Instruktur & Master Coach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
              Belajar Langsung dari Praktisi Komunikasi Senior
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1]">
              Bukan sekadar akademisi teori, melainkan mantan jurnalis senior, konsultan PR korporat, dan eksekutif coach berpengalaman membina ribuan pembicara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.name}
                className="bg-white dark:bg-[#151C26] rounded-xl p-6 border border-[#E0D8CB] dark:border-[#283344] flex flex-col justify-between hover:border-[#13171F] dark:hover:border-gray-400 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#13171F] dark:bg-[#202B39] text-[#E85923] dark:text-[#FFA27B] font-bold text-sm flex items-center justify-center shrink-0 border border-white/20 dark:border-white/10">
                      {trainer.imagePlaceholder}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#13171F] dark:text-white">
                        {trainer.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#E85923] dark:text-[#FFA27B] mt-0.5">
                        {trainer.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] dark:border-[#253040] text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                  <span className="font-semibold text-[#13171F] dark:text-white">Kualifikasi:</span> {trainer.credentials}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Tangible Testimonials */}
        <div>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
              Cerita Transformasi Alumni
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
              Dampak Riil di Lingkungan Kerja & Panggung Nyata
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1]">
              Bukti nyata bagaimana keterampilan bicara membuka jalan promosi karier, kesepakatan bisnis, dan pengaruh kepemimpinan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((testi, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#151C26] rounded-xl p-6 sm:p-7 border border-[#E0D8CB] dark:border-[#283344] flex flex-col justify-between relative shadow-2xs"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#E85923]/40 mb-3" />
                  <p className="text-xs sm:text-sm text-[#2D3748] dark:text-[#E2E8F0] leading-relaxed italic mb-6">
                    “{testi.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] dark:border-[#253040]">
                  <div className="font-bold text-sm text-[#13171F] dark:text-white">
                    {testi.author}
                  </div>
                  <div className="text-xs text-[#525E6F] dark:text-[#CBD5E1]">
                    {testi.title} · {testi.company}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-[#8C3A16] dark:text-[#FFA27B]">
                    Alumni: {testi.program}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
