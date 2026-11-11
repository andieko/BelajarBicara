import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calendar, Clock, MapPin, Users, Check, Sparkles } from 'lucide-react';
import { ProgramItem, PROGRAMS } from '../data/programsData.ts';

interface ProgramsGridProps {
  onSelectProgram: (programId: string, batchId?: string) => void;
  onViewSyllabus: (program: ProgramItem) => void;
  onOpenPdf: () => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  onSelectProgram,
  onViewSyllabus,
  onOpenPdf
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Program' },
    { id: 'public-speaking', label: 'Public Speaking & Bicara' },
    { id: 'workplace', label: 'Komunikasi Kerja & Tim' },
    { id: 'leadership', label: 'Kepemimpinan & Krisis' },
    { id: 'pr-media', label: 'Humas & Media' }
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.categoryKey === selectedCategory);

  return (
    <section id="program-kelas" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E2D6] dark:border-[#222B38] gap-4">
        <div>
          <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
            Portofolio Pelatihan NMARK 2027
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
            Pilihan Program & Jadwal Kelas
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1] max-w-2xl">
            Kurikulum terstruktur berbasis simulasi panggung dan kasus nyata untuk memperkuat kapabilitas bicara individu, tim, dan organisasi.
          </p>
        </div>

        {/* Interactive Filter Control (functional tabs with clean segmented styling) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9DE] dark:bg-[#1A222D] rounded-lg border border-transparent dark:border-[#2D3A4B]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-[#253041] text-[#13171F] dark:text-white shadow-xs'
                  : 'text-[#5A6472] dark:text-[#9CA3AF] hover:text-[#13171F] dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPrograms.map((program) => {
          const nearestBatch = program.nextBatches[0];

          return (
            <div
              key={program.id}
              className={`bg-white dark:bg-[#151C26] rounded-xl border flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                program.isPopular
                  ? 'border-[#E85923]/60 dark:border-[#E85923] ring-1 ring-[#E85923]/20 dark:ring-[#E85923]/30'
                  : 'border-[#E0D8CB] dark:border-[#283344]'
              }`}
            >
              {/* Card Header & Content */}
              <div className="p-6">
                {/* Clean unboxed metadata with bullet separator */}
                <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#94A3B8] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#E85923]">PROG {program.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[140px]">{program.area}</span>
                  </div>
                  {program.isPopular && (
                    <span className="text-[11px] font-semibold text-[#8C3A16] dark:text-[#FFA27B] bg-[#FBEFEA] dark:bg-[#2D1B14] px-2 py-0.5 rounded border border-transparent dark:border-[#F97316]/20">
                      Paling Diminati
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#13171F] dark:text-white tracking-tight hover:text-[#E85923] dark:hover:text-[#FFA27B] transition-colors leading-snug">
                  {program.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed line-clamp-2">
                  {program.tagline}
                </p>

                {/* Key specs strip */}
                <div className="mt-4 pt-4 border-t border-[#F0EBE1] dark:border-[#253040] space-y-2 text-xs text-[#4B5563] dark:text-[#CBD5E1]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#E85923] shrink-0" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#E85923] shrink-0" />
                    <span className="truncate">{program.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#E85923] shrink-0" />
                    <span className="truncate">{program.recommendedFor}</span>
                  </div>
                </div>

                {/* Nearest Batch Box */}
                {nearestBatch && (
                  <div className="mt-4 p-3 rounded-lg bg-[#FAF9F5] dark:bg-[#1C2533] border border-[#E8E2D6] dark:border-[#2D3A4B] text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#13171F] dark:text-white mb-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E85923]" />
                        <span>Batch Terdekat:</span>
                      </div>
                      <span className="text-[#E85923] dark:text-[#F97316] font-bold">
                        Sisa {nearestBatch.seatsLeft} Kursi
                      </span>
                    </div>
                    <div className="text-[#4B5563] dark:text-[#E2E8F0] font-medium">
                      {nearestBatch.date} ({nearestBatch.days})
                    </div>
                    <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] truncate mt-0.5">
                      {nearestBatch.location}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280] dark:text-[#94A3B8] block">
                    Materi Inti:
                  </span>
                  {program.topics.slice(0, 3).map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#374151] dark:text-[#CBD5E1]">
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Pricing & Action Buttons */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#F0EBE1] dark:border-[#253040] flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] block">Investasi Peserta</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#13171F] dark:text-white tabular-nums">
                        Rp {program.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-[#9CA3AF] line-through tabular-nums">
                        Rp {program.originalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-transparent dark:border-emerald-500/20">
                    Hemat {Math.round(((program.originalPrice - program.price) / program.originalPrice) * 100)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewSyllabus(program)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#13171F] dark:text-white bg-[#F2ECE1] dark:bg-[#202A38] hover:bg-[#EAE4D9] dark:hover:bg-[#293547] rounded-md transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#E85923]" />
                    <span>Silabus Lengkap</span>
                  </button>

                  <button
                    onClick={() => onSelectProgram(program.id, nearestBatch?.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-[#13171F] dark:bg-[#E85923] hover:bg-[#E85923] dark:hover:bg-[#D44A17] rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Daftar Kelas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate In-House banner below grid */}
      <div className="mt-12 bg-[#FAF9F5] dark:bg-[#151C26] rounded-xl border border-[#E0D8CB] dark:border-[#283344] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div>
          <span className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider block mb-1">
            Layanan In-House & Korporasi
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#13171F] dark:text-white">
            Butuh Pelatihan Khusus untuk Tim atau Manajemen Perusahaan Anda?
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] mt-1 max-w-2xl">
            Kami menyediakan program in-house yang dikustomisasi sesuai konteks industri perbankan, telekomunikasi, BUMN, teknologi, hingga kementerian.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPdf}
            className="px-4 py-2.5 text-xs font-semibold text-[#13171F] dark:text-white bg-white dark:bg-[#1E2734] border border-[#DCD5C9] dark:border-[#374151] hover:bg-[#F2ECE1] dark:hover:bg-[#283344] rounded-md transition-all cursor-pointer whitespace-nowrap"
          >
            Pelajari Katalog 2027
          </button>
          <button
            onClick={() => onSelectProgram('in-house')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] rounded-md transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            Konsultasi In-House
          </button>
        </div>
      </div>
    </section>
  );
};
