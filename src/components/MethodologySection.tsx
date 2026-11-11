import React from 'react';
import { METHODOLOGY_STEPS, LEARNING_PRINCIPLES } from '../data/programsData.ts';
import { Lightbulb, Dumbbell, PlayCircle, MessageSquareQuote, TrendingUp, CheckCircle } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const stepIcons = [
    <Lightbulb key="1" className="w-5 h-5 text-[#E85923]" />,
    <Dumbbell key="2" className="w-5 h-5 text-[#E85923]" />,
    <PlayCircle key="3" className="w-5 h-5 text-[#E85923]" />,
    <MessageSquareQuote key="4" className="w-5 h-5 text-[#E85923]" />,
    <TrendingUp key="5" className="w-5 h-5 text-[#10B981]" />
  ];

  return (
    <section id="metodologi" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors">
      {/* Editorial Headline */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
          Metodologi Belajar NMARK
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
          Bukan Sekadar Teori: Alur 5-Tahap Transformasi Bicara
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed">
          Setiap sesi dirancang secara sistematis untuk mendorong perubahan perilaku bicara yang nyata, dari rasa cemas di awal hingga kematangan komunikasi yang bertahan seumur hidup.
        </p>
      </div>

      {/* 5-Step Linear Journey */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-16">
        {METHODOLOGY_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className="bg-white dark:bg-[#151C26] rounded-xl p-5 border border-[#E0D8CB] dark:border-[#283344] flex flex-col justify-between relative hover:border-[#E85923]/70 dark:hover:border-[#E85923] transition-colors shadow-2xs group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-2xl font-black text-[#E85923]">
                  {step.step}
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] dark:bg-[#1E2734] border border-[#E8E2D6] dark:border-[#2E3C4E] flex items-center justify-center">
                  {stepIcons[idx]}
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#13171F] dark:text-white group-hover:text-[#E85923] dark:group-hover:text-[#FFA27B] transition-colors">
                {step.name}
              </h3>
              <p className="text-xs font-semibold text-[#8C3A16] dark:text-[#FFA27B] mt-0.5 mb-2.5">
                {step.subtitle}
              </p>

              <p className="text-xs text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F2ECE1] dark:border-[#253040] text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
              Tahap {idx + 1} dari 5
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Quote Banner */}
      <div className="bg-[#13171F] dark:bg-[#0D1219] text-white rounded-xl p-6 sm:p-8 mb-16 relative overflow-hidden border border-transparent dark:border-[#283344]">
        <div className="max-w-3xl relative z-10">
          <p className="text-xs uppercase font-semibold tracking-wider text-[#E85923] mb-2">
            Filosofi NMARK Manajemen Indonesia
          </p>
          <blockquote className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            “Komunikasi yang kuat menggerakkan manusia. Organisasi yang kuat menciptakan masa depan.”
          </blockquote>
          <p className="text-xs text-gray-400 mt-3">
            NMARK Communication Training & Development 2027
          </p>
        </div>
      </div>

      {/* 5 Prinsip Pembelajaran */}
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#13171F] dark:text-white">
            5 Prinsip Pembelajaran yang Kami Pegang Teguh
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] mt-1">
            Standar kurikulum kami dirancang untuk menjamin setiap peserta mendapatkan nilai investasi optimal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEARNING_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-4 rounded-lg bg-[#FAF9F5] dark:bg-[#151C26] border border-[#E5E0D6] dark:border-[#283344] flex flex-col justify-between"
            >
              <div>
                <span className="w-6 h-6 rounded-full bg-[#13171F] dark:bg-white text-white dark:text-[#13171F] text-xs font-bold flex items-center justify-center mb-2.5">
                  {principle.number}
                </span>
                <h4 className="text-sm font-bold text-[#13171F] dark:text-white mb-1.5">
                  {principle.title}
                </h4>
                <p className="text-xs text-[#525E6F] dark:text-[#CBD5E1] leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
