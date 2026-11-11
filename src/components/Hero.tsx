import React, { useState } from 'react';
import { ArrowRight, FileDown, Sparkles, CheckCircle2, Mic, Volume2, ShieldCheck, PlayCircle } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onOpenPdf: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onOpenPdf, onExplorePrograms }) => {
  const [activeDrill, setActiveDrill] = useState<'hook' | 'vocal' | 'filler'>('hook');

  const drills = {
    hook: {
      title: 'Hook 60 Detik Pertama',
      subtitle: 'Merebut 100% perhatian audiens sejak kalimat pembuka.',
      step: 'Hindari: "Selamat pagi, perkenalkan nama saya... hari ini saya akan..."',
      fix: 'Gunakan: "Tahukah Anda, 73% proyek gagal bukan karena teknis, melainkan 1 kalimat miskomunikasi? Dalam 10 menit ke depan, kita bedah solusinya."',
      tag: 'Teknik Alur Presentasi'
    },
    vocal: {
      title: 'Power Pause & Pacing',
      subtitle: 'Hentikan tempo terburu-buru dan berikan bobot pada kata kunci.',
      step: 'Hindari: Bicara tanpa titik koma seperti dikejar waktu karena cemas.',
      fix: 'Gunakan: Ambil jeda 2 detik (power pause) tepat sebelum menyampaikan angka atau kesimpulan terpenting. Audiens akan otomatis menatap Anda.',
      tag: 'Modulasi Vokal'
    },
    filler: {
      title: 'Menghilangkan "Eee...", "Uhm...", "Jadi..."',
      subtitle: 'Mengganti kata pengisi dengan keheningan percaya diri.',
      step: 'Masalah: Otak mencari kata berikutnya saat mulut terus mengeluarkan suara.',
      fix: 'Solusi: Tutup bibir rapat-rapat saat berpikir. Keheningan selama 1-2 detik terasa seperti ketenangan strategis di mata audiens.',
      tag: 'Kontrol Gugup'
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#E8E2D6]/80 dark:border-[#222B38]">
      {/* Background Subtle Geometric Pattern inspired by NMARK Catalog Cover */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" className="text-[#13171F] dark:text-white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Sub-kicker metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-4">
          <img
            src="/assets/aistudio/favicon_kbb_86ee25d6.png"
            alt="Belajar Bicara"
            className="w-4 h-4 object-contain inline-block shrink-0"
          />
          <span>Belajar Bicara</span>
          <span aria-hidden="true" className="text-[#D6CEBF] dark:text-[#4A5568]">·</span>
          <span>NMARK Manajemen Indonesia</span>
          <span aria-hidden="true" className="text-[#D6CEBF] dark:text-[#4A5568]">·</span>
          <span>Program 2027</span>
          <span aria-hidden="true" className="text-[#D6CEBF] dark:text-[#4A5568]">·</span>
          <span className="text-[#13171F] dark:text-[#E2E8F0]">Bicara Jadi Lebih Bermakna</span>
        </div>

        {/* 2-Column Desktop Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#13171F] dark:text-white leading-[1.15] tracking-tight [text-wrap:balance]">
              Bicara Lebih Percaya Diri. Sampaikan Ide yang <span className="text-[#E85923] underline decoration-[#E85923]/30 decoration-wavy underline-offset-6">Menggerakkan</span>.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed max-w-2xl">
              Tingkatkan wibawa dan kemampuan berbicara Anda melalui metodologi 5-tahap NMARK: mulai dari mengatasi rasa cemas, menyusun struktur narasi persuasif, hingga penguasaan panggung nyata dengan evaluasi konsultatif 1-on-1.
            </p>

            {/* Key benefits list without decorative icons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#2D3748] dark:text-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E85923] shrink-0" />
                <span>Kurikulum Berbasis 70% Praktik & Simulasi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E85923] shrink-0" />
                <span>Umpan Balik Personal & Rekaman Video HD</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E85923] shrink-0" />
                <span>Sertifikasi Resmi NMARK Manajemen Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E85923] shrink-0" />
                <span>Pilihan Kelas Tatap Muka & Online Interaktif</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Pilih Jadwal & Daftar Kelas</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenPdf}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-[#13171F] dark:text-white bg-white dark:bg-[#1A222E] hover:bg-[#F2ECE1] dark:hover:bg-[#253040] border border-[#DCD5C9] dark:border-[#374151] rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileDown className="w-4 h-4 text-[#E85923]" />
                <span>Unduh Brosur Katalog (PDF)</span>
              </button>
            </div>

            {/* Micro reassurance unboxed text */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#94A3B8]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Garansi kepuasan belajar · Kuota dibatasi maks 15 peserta per kelas demi efektivitas</span>
            </div>
          </div>

          {/* Right Column: Interactive Micro-Coaching Card (Visual Anchor) */}
          <div className="lg:col-span-5">
            <div className="bg-[#13171F] text-white rounded-xl p-6 sm:p-7 shadow-xl border border-[#2B323D] relative overflow-hidden">
              {/* Subtle top indicator bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#E85923]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">
                    Preview Materi Praktik Belajar Bicara
                  </span>
                </div>
                <span className="text-xs text-[#E85923] font-mono font-medium">MODUL 09</span>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Simulasi 3 Teknik Bicara Berdampak
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Klik teknik di bawah untuk melihat perbedaan instan cara bicara sebelum & sesudah dilatih:
                </p>
              </div>

              {/* Segmented Controller (Interactive Functional Tabs) */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg mb-5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveDrill('hook')}
                  className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                    activeDrill === 'hook'
                      ? 'bg-[#E85923] text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Hook 60 Detik
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDrill('vocal')}
                  className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                    activeDrill === 'vocal'
                      ? 'bg-[#E85923] text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Power Pause
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDrill('filler')}
                  className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                    activeDrill === 'filler'
                      ? 'bg-[#E85923] text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Hapus Filler
                </button>
              </div>

              {/* Active Drill Display */}
              <div className="bg-[#1C222C] rounded-lg p-4 border border-white/5">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>{drills[activeDrill].tag}</span>
                  <span className="text-[#E85923]">Metode NMARK</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  {drills[activeDrill].title}
                </h4>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  {drills[activeDrill].subtitle}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="p-2.5 rounded bg-red-950/30 border border-red-500/20 text-red-200">
                    <span className="font-semibold text-red-300 block mb-0.5">Pola Umum yang Sering Terjadi:</span>
                    {drills[activeDrill].step}
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                    <span className="font-semibold text-emerald-300 block mb-0.5">Teknik yang Dilatih di Kelas:</span>
                    {drills[activeDrill].fix}
                  </div>
                </div>
              </div>

              {/* Micro-CTA bottom of card */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Ingin praktik langsung dengan mentor?
                </div>
                <button
                  onClick={onExplorePrograms}
                  className="text-xs font-semibold text-[#E85923] hover:text-[#FFA27B] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Kurikulum Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metrics Strip in a Full-Width Row Below */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D6] dark:border-[#222B38] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#13171F] dark:text-white tabular-nums tracking-tight">
              12.500<span className="text-[#E85923]">+</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#4B5563] dark:text-[#CBD5E1] mt-1">
              Alumni Profesional & Eksekutif
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
              Telah mengikuti pelatihan sejak 2018
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#13171F] dark:text-white tabular-nums tracking-tight">
              180<span className="text-[#E85923]">+</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#4B5563] dark:text-[#CBD5E1] mt-1">
              Mitra Korporasi & Lembaga
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
              BUMN, Multinasional, & Startup Unicorn
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#13171F] dark:text-white tabular-nums tracking-tight">
              98.4<span className="text-[#E85923]">%</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#4B5563] dark:text-[#CBD5E1] mt-1">
              Indeks Kepuasan Peserta
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
              Evaluasi materi, instruktur & fasilitas
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#13171F] dark:text-white tabular-nums tracking-tight">
              70<span className="text-[#E85923]">%</span> : 30<span className="text-[#6B7280] dark:text-[#94A3B8]">%</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#4B5563] dark:text-[#CBD5E1] mt-1">
              Porsi Praktik & Simulasi Langsung
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
              Maksimal 15 peserta per batch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
