import React, { useState } from 'react';
import { Check, HelpCircle, ArrowRight, RotateCcw, Award, Lightbulb } from 'lucide-react';
import { ProgramItem, PROGRAMS } from '../data/programsData.ts';

interface SpeechAssessmentProps {
  onSelectRecommendedProgram: (programId: string) => void;
}

interface QuestionOption {
  text: string;
  weight: number;
  cat?: string;
  recId?: string;
}

interface Question {
  id: number;
  title: string;
  question: string;
  options: QuestionOption[];
}

export const SpeechAssessment: React.FC<SpeechAssessmentProps> = ({ onSelectRecommendedProgram }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      title: 'Tingkat Kecemasan & Stage Fright',
      question: 'Saat diminta berbicara di depan lebih dari 10 orang atau manajemen senior, apa yang biasanya Anda rasakan?',
      options: [
        { text: 'Jantung berdegup sangat kencang, tangan dingin, dan khawatir tiba-tiba blank atau lupa materi.', weight: 1, cat: 'public-speaking' },
        { text: 'Agak tegang di 2 menit awal, namun perlahan mencair setelah mulai berbicara.', weight: 2, cat: 'public-speaking' },
        { text: 'Tenang dan tidak gugup, tetapi sering bingung bagaimana merangkum ide agar tidak bertele-tele.', weight: 3, cat: 'workplace' },
        { text: 'Sangat terbiasa tampil, namun ingin mengasah wibawa kepemimpinan dan pengaruh persuasif tingkat tinggi.', weight: 4, cat: 'leadership' }
      ]
    },
    {
      id: 2,
      title: 'Struktur Pesan & Alur Materi',
      question: 'Bagaimana cara Anda biasanya mempersiapkan bahan presentasi atau pembicaraan penting?',
      options: [
        { text: 'Membuat slide dengan banyak teks sebagai contekan karena takut lupa apa yang harus diucapkan.', weight: 1, cat: 'public-speaking' },
        { text: 'Mengumpulkan banyak data lengkap, tapi kesulitan menentukan mana poin utama dan mana detail tambahan.', weight: 2, cat: 'workplace' },
        { text: 'Menyusun poin-poin garis besar, namun penyampaian sering melebihi batas waktu yang dialokasikan.', weight: 2, cat: 'workplace' },
        { text: 'Menggunakan storytelling dan pesan kunci terstruktur, namun butuh teknik handling pertanyaan tajam/kritis.', weight: 3, cat: 'leadership' }
      ]
    },
    {
      id: 3,
      title: 'Interaksi & Dinamika Audiens',
      question: 'Saat Anda sedang berbicara, bagaimana respons atau keterlibatan audiens yang Anda rasakan?',
      options: [
        { text: 'Audiens tampak pasif, beberapa melihat ponsel, dan saya bingung cara menarik kembali perhatian mereka.', weight: 1, cat: 'public-speaking' },
        { text: 'Audiens mendengarkan, namun jarang ada yang merespons atau bertanya saat sesi diskusi dibuka.', weight: 2, cat: 'workplace' },
        { text: 'Komunikasi satu arah berjalan baik, tapi saya kesulitan memediasi perdebatan atau pendapat yang berlawanan.', weight: 3, cat: 'leadership' },
        { text: 'Audiens antusias, namun saya ingin membekali diri menghadapi skenario wawancara media atau krisis reputasi.', weight: 4, cat: 'pr-media' }
      ]
    },
    {
      id: 4,
      title: 'Kebutuhan Komunikasi Prioritas',
      question: 'Apa sasaran paling mendesak yang ingin Anda capai dalam 1–3 bulan ke depan?',
      options: [
        { text: 'Bisa tampil percaya diri tanpa gemetar saat presentasi proyek atau pitching ide.', weight: 1, recId: 'effective-public-speaking' },
        { text: 'Komunikasi kerja lancar: memberikan feedback dengan tegas, mengurangi miskomunikasi dengan rekan/atasan.', weight: 2, recId: 'workplace-communication-skills' },
        { text: 'Memimpin tim dengan visi yang jelas, mengarahkan rapat strategis, dan mengambil keputusan berbobot.', weight: 3, recId: 'leadership-communication' },
        { text: 'Mewakili perusahaan sebagai juru bicara resmi di hadapan media massa, publik, atau pemangku kepentingan.', weight: 4, recId: 'spokesperson-media-training' }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...answers, index];
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Determine diagnostic outcome
  const getRecommendation = () => {
    // Check answer 4 first as primary explicit goal
    const q4Choice = answers[3] ?? 0;
    const directRecId = questions[3].options[q4Choice]?.recId || 'effective-public-speaking';
    const recProgram = PROGRAMS.find((p) => p.id === directRecId) || PROGRAMS[0];

    // Score calculation
    const totalScore = answers.reduce((acc, curr, idx) => {
      const weight = questions[idx]?.options[curr]?.weight || 1;
      return acc + weight * 6.25;
    }, 45);

    let persona = 'The Hidden Expert (Kaya Ide, Perlu Keberanian Panggung)';
    let summary = 'Anda memiliki kompetensi teknis yang kuat, namun sering kali pesan hebat Anda tertahan oleh rasa cemas atau ketidakpastian dalam penyampaian. Anda membutuhkan formula panggung bertahap.';

    if (totalScore >= 75) {
      persona = 'The Strategic Influencer (Siap Memimpin Narasi Lebih Tinggi)';
      summary = 'Anda sudah memiliki modal keberanian dasar, kini saatnya mempertajam wibawa narasi kepemimpinan, penanganan situasi sulit, dan pengaruh strategis.';
    } else if (totalScore >= 60) {
      persona = 'The Diligent Communicator (Butuh Struktur & Daya Pikat)';
      summary = 'Anda mampu berbicara di depan orang lain, namun seringkali presentasi Anda terasa datar atau terlalu padat data sehingga audiens cepat lelah.';
    }

    return {
      score: Math.min(Math.round(totalScore), 96),
      persona,
      summary,
      program: recProgram
    };
  };

  const result = isCompleted ? getRecommendation() : null;

  return (
    <section id="assessment" className="py-16 md:py-24 bg-[#F2ECE1]/50 dark:bg-[#0F141C] border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
            Diagnostik Cepat 1 Menit
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
            Cek Level & Gaya Bicara Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1]">
            Jawab 4 pertanyaan sederhana untuk memetakan tantangan komunikasi Anda dan temukan kelas yang paling sesuai dengan kebutuhan karier Anda saat ini.
          </p>
        </div>

        <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-xs border border-[#E0D8CB] dark:border-[#283344] p-6 sm:p-8 md:p-10 transition-colors">
          {!isCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] mb-3">
                <span>Pertanyaan {currentStep + 1} dari {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Selesai</span>
              </div>
              <div className="w-full bg-[#EAE4D9] dark:bg-[#253040] h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-[#E85923] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Header */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#E85923] uppercase tracking-wider block mb-1">
                  Kategori: {questions[currentStep].title}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#13171F] dark:text-white leading-snug">
                  {questions[currentStep].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 rounded-lg border border-[#DCD5C9] dark:border-[#2D3A4B] bg-white dark:bg-[#1A2330] hover:border-[#E85923] dark:hover:border-[#E85923] hover:bg-[#FAF9F5] dark:hover:bg-[#222E3E] transition-all flex items-start gap-3.5 group cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full border border-[#B8AF9F] dark:border-[#4B5563] group-hover:border-[#E85923] group-hover:bg-[#E85923] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold text-[#4B5563] dark:text-[#CBD5E1] transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm font-medium text-[#2D3748] dark:text-[#E2E8F0] group-hover:text-[#13171F] dark:group-hover:text-white leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step Navigation */}
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-[#EAE4D9] dark:border-[#283344] flex justify-between items-center">
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    Kembali ke pertanyaan sebelumnya
                  </button>
                </div>
              )}
            </div>
          ) : result ? (
            /* Results Presentation */
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#EAE4D9] dark:border-[#283344] gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider">
                    Hasil Diagnostik Mandiri
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#13171F] dark:text-white mt-1">
                    {result.persona}
                  </h3>
                </div>
                <div className="flex items-center gap-3 bg-[#FAF9F5] dark:bg-[#1A2330] px-4 py-2.5 rounded-lg border border-[#E0D8CB] dark:border-[#2D3A4B]">
                  <div className="text-right">
                    <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wider font-semibold">Skor Kesiapan</div>
                    <div className="text-2xl font-extrabold text-[#13171F] dark:text-white tabular-nums leading-none mt-0.5">
                      {result.score}<span className="text-xs text-[#E85923] font-normal"> / 100</span>
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-[#E85923]" />
                </div>
              </div>

              {/* Diagnostic Breakdown */}
              <div className="mt-6 p-4 rounded-lg bg-[#FAF9F5] dark:bg-[#1A2330] border border-[#E0D8CB] dark:border-[#2D3A4B] text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-[#13171F] dark:text-white mb-1">
                  <Lightbulb className="w-4 h-4 text-[#E85923]" />
                  <span>Analisis Potensi Komunikasi Anda:</span>
                </div>
                {result.summary}
              </div>

              {/* Recommended Course Card */}
              <div className="mt-6 bg-[#13171F] dark:bg-[#0D1219] text-white rounded-xl p-6 relative overflow-hidden border border-[#2B323D] dark:border-[#2D3A4B]">
                <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-white/10 mb-4">
                  <span className="font-semibold text-[#E85923] uppercase tracking-wider">
                    Rekomendasi Kelas Utama
                  </span>
                  <span>Kode Program: {result.program.code}</span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">
                  {result.program.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                  {result.program.tagline}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 mb-5 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E85923]" />
                    <span>Durasi: {result.program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E85923]" />
                    <span>Format: {result.program.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E85923]" />
                    <span>Investasi: Rp {result.program.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E85923]" />
                    <span>Jadwal terdekat: {result.program.nextBatches[0]?.date}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectRecommendedProgram(result.program.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] rounded-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Daftar Kelas Ini Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tes Ulang</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
