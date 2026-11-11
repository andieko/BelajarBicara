import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Tag,
  CreditCard,
  Download,
  Send,
  Sparkles,
  Users,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Check
} from 'lucide-react';
import { ProgramItem, PROGRAMS } from '../data/programsData.ts';
import { SuccessToast } from './SuccessToast.tsx';

interface RegistrationFormProps {
  selectedProgramId: string | null;
  selectedBatchId?: string | null;
  onProgramChange: (id: string) => void;
  onOpenLegal?: (tab: 'terms' | 'privacy') => void;
}

// Informative tooltip helper component for input context and data accuracy
const FieldTooltip: React.FC<{ content: string }> = ({ content }) => {
  return (
    <span className="relative inline-flex items-center group ml-1.5 align-middle select-none">
      <span
        tabIndex={0}
        aria-label="Bantuan informasi kolom"
        className="text-[#9CA3AF] hover:text-[#E85923] dark:text-[#6B7280] dark:hover:text-[#F97316] transition-colors focus:outline-none cursor-help inline-flex items-center"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </span>
      <span
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus-within:flex flex-col items-center z-50 pointer-events-none w-56 sm:w-64 text-center animate-in fade-in zoom-in-95 duration-150"
      >
        <span className="bg-[#13171F] dark:bg-[#1E2736] text-white text-[11px] font-normal leading-relaxed py-1.5 px-3 rounded-md shadow-xl border border-white/10 dark:border-white/15">
          {content}
        </span>
        <span className="w-2 h-2 bg-[#13171F] dark:bg-[#1E2736] rotate-45 -mt-1 border-r border-b border-white/10 dark:border-white/15" />
      </span>
    </span>
  );
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedProgramId,
  selectedBatchId,
  onProgramChange,
  onOpenLegal
}) => {
  // Current chosen program
  const activeProgram = PROGRAMS.find((p) => p.id === selectedProgramId) || PROGRAMS[0];

  // Form states
  const [participantType, setParticipantType] = useState<'individual' | 'group' | 'corporate'>('individual');
  const [chosenBatchId, setChosenBatchId] = useState<string>(
    selectedBatchId || activeProgram.nextBatches[0]?.id || ''
  );

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [learningGoal, setLearningGoal] = useState('Mengatasi gugup & tampil percaya diri');
  const [groupSize, setGroupSize] = useState<number>(2);

  // Add-ons
  const [addPrivateCoaching, setAddPrivateCoaching] = useState(false);
  const [addPrintedKit, setAddPrintedKit] = useState(false);

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent?: number; fixedDiscount?: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync batch when active program changes
  useEffect(() => {
    if (activeProgram.nextBatches.length > 0) {
      if (!activeProgram.nextBatches.some((b) => b.id === chosenBatchId)) {
        setChosenBatchId(activeProgram.nextBatches[0].id);
      }
    }
  }, [activeProgram]);

  useEffect(() => {
    if (selectedBatchId) {
      setChosenBatchId(selectedBatchId);
    }
  }, [selectedBatchId]);

  const selectedBatch = activeProgram.nextBatches.find((b) => b.id === chosenBatchId) || activeProgram.nextBatches[0];

  // Pricing math
  const basePricePerPerson = activeProgram.price;
  const count = participantType === 'group' ? groupSize : 1;
  const rawSubtotal = basePricePerPerson * count;

  // Group discount 10%
  const groupDiscount = participantType === 'group' ? rawSubtotal * 0.1 : 0;

  // Add-on fees
  const privateCoachingFee = addPrivateCoaching ? 450000 * count : 0;
  const printedKitFee = addPrintedKit ? 150000 * count : 0;
  const totalBeforePromo = rawSubtotal - groupDiscount + privateCoachingFee + printedKitFee;

  // Promo discount calculation
  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      promoDiscount = Math.round(totalBeforePromo * (appliedPromo.discountPercent / 100));
    } else if (appliedPromo.fixedDiscount) {
      promoDiscount = appliedPromo.fixedDiscount;
    }
  }

  const finalTotal = Math.max(totalBeforePromo - promoDiscount, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();

    if (!code) {
      setPromoError('Silakan masukkan kode voucher.');
      return;
    }

    if (code === 'BICARA2027') {
      setAppliedPromo({ code, discountPercent: 15 });
    } else if (code === 'EARLYBIRD') {
      setAppliedPromo({ code, discountPercent: 10 });
    } else if (code === 'NMARKHEBAT') {
      setAppliedPromo({ code, fixedDiscount: 250000 });
    } else {
      setPromoError('Kode voucher tidak valid atau telah kadaluarsa.');
      setAppliedPromo(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.';
    if (!email.trim()) {
      errors.email = 'Alamat email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid.';
    }
    if (!whatsapp.trim()) {
      errors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (whatsapp.replace(/\D/g, '').length < 9) {
      errors.whatsapp = 'Nomor WhatsApp minimal 9 digit.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate clean booking ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `NMARK-BB-${activeProgram.code}-${randomNum}`;
    setRegistrationCode(code);
    setIsSubmitted(true);
    setShowSuccessToast(true);
  };

  // WhatsApp concierge generator
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Halo Tim Admission NMARK Manajemen Indonesia,\n\nSaya ingin mengonfirmasi pendaftaran kelas Belajar Bicara:\n` +
      `• Kode Registrasi: ${registrationCode}\n` +
      `• Program: ${activeProgram.title} (${activeProgram.code})\n` +
      `• Batch: ${selectedBatch?.date} (${selectedBatch?.format})\n` +
      `• Nama Peserta: ${fullName}\n` +
      `• Email: ${email}\n` +
      `• No. WhatsApp: ${whatsapp}\n` +
      `• Instansi/Profesi: ${company || '-'}\n` +
      `• Total Investasi: Rp ${finalTotal.toLocaleString('id-ID')}\n\n` +
      `Mohon panduan instruksi pembayaran & invoice resmi. Terima kasih!`
    );
    return `https://api.whatsapp.com/send?phone=628181494240&text=${text}`;
  };

  // Download plain ticket summary
  const handleDownloadTicket = () => {
    const content = `=====================================================
KONFIRMASI PENDAFTARAN KELAS BELAJAR BICARA
NMARK MANAJEMEN INDONESIA - KATALOG PROGRAM 2027
=====================================================
Kode Registrasi : ${registrationCode}
Tanggal Daftar  : ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
Status          : Menunggu Verifikasi Pembayaran

RINCIAN PROGRAM:
• Program       : ${activeProgram.title} (Kode: ${activeProgram.code})
• Area Program  : ${activeProgram.area}
• Durasi        : ${activeProgram.duration}
• Jadwal Batch  : ${selectedBatch?.date}
• Waktu         : ${selectedBatch?.time}
• Format        : ${selectedBatch?.format}
• Lokasi        : ${selectedBatch?.location}

DATA PESERTA:
• Nama Lengkap  : ${fullName}
• Email         : ${email}
• WhatsApp      : ${whatsapp}
• Profesi/Kantor: ${company || 'Independen / Pribadi'}
• Sasaran Belajar: ${learningGoal}
• Jumlah Orang  : ${count} Peserta

RINCIAN INVESTASI:
• Biaya Program : Rp ${rawSubtotal.toLocaleString('id-ID')}
${participantType === 'group' ? `• Diskon Tim (10%): -Rp ${groupDiscount.toLocaleString('id-ID')}\n` : ''}${addPrivateCoaching ? `• Add-on 1-on-1 Coaching: +Rp ${privateCoachingFee.toLocaleString('id-ID')}\n` : ''}${addPrintedKit ? `• Add-on Modul Fisik: +Rp ${printedKitFee.toLocaleString('id-ID')}\n` : ''}${appliedPromo ? `• Kupon Promo (${appliedPromo.code}): -Rp ${promoDiscount.toLocaleString('id-ID')}\n` : ''}• TOTAL PEMBAYARAN: Rp ${finalTotal.toLocaleString('id-ID')}

REKENING RESMI NMARK MANAJEMEN INDONESIA:
Bank Mandiri Cabang Sudirman
No. Rekening : 137-00-1988202-7
Atas Nama    : PT NMARK MANAJEMEN INDONESIA

Silakan konfirmasi bukti transfer via WhatsApp Official: +62 818-1494-240.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tiket-Pendaftaran-${registrationCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="pendaftaran" className="py-16 md:py-24 bg-white dark:bg-[#0D1117] border-b border-[#E8E2D6] dark:border-[#222B38] transition-colors relative">
      {/* Instant Success Toast Notification */}
      <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Pendaftaran Berhasil Dikirim!"
        message={`Terima kasih ${fullName || 'Bpk/Ibu'}, reservasi kursi Anda untuk kelas ${activeProgram.title} berhasil diamankan.`}
        registrationCode={registrationCode}
        programTitle={activeProgram.title}
        batchInfo={`${selectedBatch?.date} (${selectedBatch?.format})`}
        onViewTicket={() => {
          const ticketEl = document.getElementById('e-ticket-card');
          if (ticketEl) {
            ticketEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
        duration={7500}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
            Pendaftaran Mudah & Cepat
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
            Formulir Pendaftaran Kelas Belajar Bicara
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#CBD5E1]">
            Pilih program, tentukan jadwal batch yang cocok, dan lengkapi data dalam 2 menit.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Program & Batch Selection */}
            <div className="bg-[#FAF9F5] dark:bg-[#151C26] rounded-xl p-6 sm:p-8 border border-[#E0D8CB] dark:border-[#283344] transition-colors">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8E2D6] dark:border-[#283344]">
                <span className="w-7 h-7 rounded-full bg-[#13171F] dark:bg-white text-white dark:text-[#13171F] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-lg font-bold text-[#13171F] dark:text-white">
                  Pilih Program & Jadwal Batch
                </h3>
              </div>

              {/* Participant Type Switcher */}
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-[#CBD5E1] flex items-center mb-2">
                  <span>Tipe Kepesertaan:</span>
                  <FieldTooltip content="Pilih 'Individu' untuk diri sendiri, 'Grup' untuk tim 2-5 orang (otomatis diskon 10%), atau 'In-House' untuk pelatihan tertutup di kantor perusahaan." />
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-[#EFE9DE] dark:bg-[#1A222D] rounded-lg border border-transparent dark:border-[#2E3C4E]">
                  <button
                    type="button"
                    onClick={() => setParticipantType('individual')}
                    className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                      participantType === 'individual'
                        ? 'bg-white dark:bg-[#253041] text-[#13171F] dark:text-white shadow-xs'
                        : 'text-[#5A6472] dark:text-[#9CA3AF] hover:text-[#13171F] dark:hover:text-white'
                    }`}
                  >
                    Individu (1 Orang)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipantType('group')}
                    className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                      participantType === 'group'
                        ? 'bg-white dark:bg-[#253041] text-[#13171F] dark:text-white shadow-xs'
                        : 'text-[#5A6472] dark:text-[#9CA3AF] hover:text-[#13171F] dark:hover:text-white'
                    }`}
                  >
                    Grup (Diskon 10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipantType('corporate')}
                    className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer truncate ${
                      participantType === 'corporate'
                        ? 'bg-white dark:bg-[#253041] text-[#13171F] dark:text-white shadow-xs'
                        : 'text-[#5A6472] dark:text-[#9CA3AF] hover:text-[#13171F] dark:hover:text-white'
                    }`}
                  >
                    In-House Kantor
                  </button>
                </div>
              </div>

              {/* Program Select Dropdown */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                  <span>Pilihan Program Komunikasi:</span>
                  <FieldTooltip content="Pilih topik spesialisasi pelatihan komunikasi dari Katalog Resmi NMARK 2027 sesuai target kompetensi yang ingin Anda kuasai." />
                </label>
                <select
                  value={activeProgram.id}
                  onChange={(e) => onProgramChange(e.target.value)}
                  title="Pilih program pelatihan komunikasi yang ingin Anda ikuti"
                  className="w-full bg-white dark:bg-[#1C2533] border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#13171F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent"
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.id} className="dark:bg-[#1C2533] dark:text-white">
                      [{prog.code}] {prog.title} — Rp {prog.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1.5">
                  <span>Area: {activeProgram.area}</span>
                  <span aria-hidden="true">·</span>
                  <span>Durasi: {activeProgram.duration}</span>
                </div>
              </div>

              {/* Batch Schedule Selector */}
              {participantType !== 'corporate' ? (
                <div>
                  <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-2">
                    <span>Pilih Jadwal Batch yang Tersedia:</span>
                    <FieldTooltip content="Pilih jadwal terdekat yang cocok. Tersedia opsi Tatap Muka di NMARK Training Center (Mega Kuningan) atau Online Live Interactive via Zoom." />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeProgram.nextBatches.map((batch) => {
                      const isSelected = chosenBatchId === batch.id;
                      return (
                        <div
                          key={batch.id}
                          onClick={() => setChosenBatchId(batch.id)}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-white dark:bg-[#202B39] border-[#E85923] shadow-xs ring-1 ring-[#E85923]'
                              : 'bg-white/60 dark:bg-[#1C2533] border-[#DCD5C9] dark:border-[#2E3C4E] hover:border-[#13171F] dark:hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-semibold text-[#13171F] dark:text-white">{batch.days}</span>
                            <span className={`text-[11px] font-bold ${batch.seatsLeft <= 5 ? 'text-[#E85923]' : 'text-emerald-700 dark:text-emerald-400'}`}>
                              Sisa {batch.seatsLeft} Kursi
                            </span>
                          </div>
                          <div className="text-sm font-bold text-[#13171F] dark:text-white mb-1">
                            {batch.date}
                          </div>
                          <div className="text-xs text-[#525E6F] dark:text-[#CBD5E1] mb-1">
                            {batch.time}
                          </div>
                          <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] truncate">
                            {batch.format} · {batch.location}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#FBEFEA] dark:bg-[#2C1C17] border border-[#F5C7B5] dark:border-[#4D281E] text-xs text-[#8C3A16] dark:text-[#FFA27B] leading-relaxed">
                  <span className="font-semibold block mb-1">Permintaan Jadwal Khusus In-House Training:</span>
                  Tim konsultan NMARK akan menghubungi Anda dalam waktu 1x24 jam untuk mendiskusikan penyesuaian kurikulum, durasi (1-2 hari atau program berkelanjutan), serta jadwal di kantor perusahaan Anda.
                </div>
              )}

              {/* Group Size Slider if Group */}
              {participantType === 'group' && (
                <div className="mt-5 pt-4 border-t border-[#E8E2D6] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center">
                    <span>Jumlah Peserta Grup:</span>
                    <FieldTooltip content="Tentukan jumlah anggota tim (2 sampai 5 orang). Setiap peserta berhak mendapatkan potongan diskon rombongan 10% secara langsung." />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded">
                      Diskon Otomatis 10%
                    </span>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      title="Tentukan jumlah peserta dalam pendaftaran rombongan"
                      className="bg-white dark:bg-[#1C2533] dark:text-white border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-md px-3 py-1.5 text-xs font-bold text-[#13171F]"
                    >
                      <option value={2}>2 Peserta</option>
                      <option value={3}>3 Peserta</option>
                      <option value={4}>4 Peserta</option>
                      <option value={5}>5 Peserta</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Participant Information */}
            <div className="bg-[#FAF9F5] dark:bg-[#151C26] rounded-xl p-6 sm:p-8 border border-[#E0D8CB] dark:border-[#283344] transition-colors">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8E2D6] dark:border-[#283344]">
                <span className="w-7 h-7 rounded-full bg-[#13171F] dark:bg-white text-white dark:text-[#13171F] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-bold text-[#13171F] dark:text-white">
                  Data Calon Peserta
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                    <span>Nama Lengkap (Sesuai Sertifikat)</span>
                    <span className="text-[#E85923] ml-0.5">*</span>
                    <FieldTooltip content="Pastikan ejaan nama dan gelar profesional sudah benar karena akan dicetak langsung pada Sertifikat Resmi kelulusan NMARK." />
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Rian Anggoro, S.Kom."
                    title="Masukkan nama lengkap beserta gelar untuk dicetak pada sertifikat kelulusan resmi"
                    className={`w-full bg-white dark:bg-[#1C2533] text-[#13171F] dark:text-white border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent ${
                      formErrors.fullName ? 'border-red-500' : 'border-[#DCD5C9] dark:border-[#2E3C4E]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                    <span>Alamat Email Aktif</span>
                    <span className="text-[#E85923] ml-0.5">*</span>
                    <FieldTooltip content="Email ini digunakan untuk mengirimkan E-Ticket konfirmasi, invoice pembayaran, tautan asesmen pra-kelas, dan modul PDF." />
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    title="Masukkan alamat email aktif Anda untuk menerima konfirmasi pendaftaran dan materi digital"
                    className={`w-full bg-white dark:bg-[#1C2533] text-[#13171F] dark:text-white border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent ${
                      formErrors.email ? 'border-red-500' : 'border-[#DCD5C9] dark:border-[#2E3C4E]'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                    <span>Nomor WhatsApp Aktif</span>
                    <span className="text-[#E85923] ml-0.5">*</span>
                    <FieldTooltip content="Nomor WhatsApp digunakan tim admission untuk verifikasi instan, undangan grup belajar batch, dan pengingat jadwal kelas." />
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0812-XXXX-XXXX"
                    title="Nomor WhatsApp aktif untuk koordinasi kelas dan pengiriman tautan Zoom/lokasi"
                    className={`w-full bg-white dark:bg-[#1C2533] text-[#13171F] dark:text-white border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent ${
                      formErrors.whatsapp ? 'border-red-500' : 'border-[#DCD5C9] dark:border-[#2E3C4E]'
                    }`}
                  />
                  {formErrors.whatsapp && (
                    <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{formErrors.whatsapp}</span>
                  )}
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-1 block">
                    Link grup belajar & jadwal akan dikirimkan via WhatsApp.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                    <span>Profesi / Instansi / Perusahaan</span>
                    <FieldTooltip content="Informasi profesi dan instansi membantu Master Trainer menyiapkan studi kasus dan simulasi presentasi yang relevan dengan industri Anda." />
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Contoh: Product Manager di PT XYZ"
                    title="Informasi pekerjaan atau instansi tempat Anda berkarya saat ini"
                    className="w-full bg-white dark:bg-[#1C2533] text-[#13171F] dark:text-white border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Learning goal question */}
              <div className="mt-5 pt-4 border-t border-[#E8E2D6] dark:border-[#283344]">
                <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                  <span>Tujuan Utama yang Ingin Anda Capai di Program Ini:</span>
                  <FieldTooltip content="Tujuan prioritas ini menjadi acuan Master Trainer dalam memberikan umpan balik personal dan rencana aksi perbaikan bicara Anda." />
                </label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  title="Pilih fokus keterampilan yang paling ingin Anda tingkatkan"
                  className="w-full bg-white dark:bg-[#1C2533] text-[#13171F] dark:text-white border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85923] focus:border-transparent"
                >
                  <option value="Mengatasi gugup & tampil percaya diri di depan umum" className="dark:bg-[#1C2533]">
                    Mengatasi rasa gugup / demam panggung & tampil lebih berwibawa
                  </option>
                  <option value="Menyusun alur presentasi persuasif & berbobot" className="dark:bg-[#1C2533]">
                    Menyusun struktur presentasi bisnis & storytelling yang meyakinkan
                  </option>
                  <option value="Memperbaiki artikulasi vokal & bahasa tubuh" className="dark:bg-[#1C2533]">
                    Mengasah modulasi suara, jeda dramatis, serta gestur tubuh profesional
                  </option>
                  <option value="Memimpin meeting tim & komunikasi kepemimpinan" className="dark:bg-[#1C2533]">
                    Memimpin meeting lintas departemen & memberikan feedback tanpa ofensif
                  </option>
                  <option value="Persiapan menjadi pembicara resmi / juru bicara" className="dark:bg-[#1C2533]">
                    Persiapan menjadi representatif organisasi di depan media atau publik
                  </option>
                </select>
              </div>
            </div>

            {/* Step 3: Add-ons & Investment Summary */}
            <div className="bg-[#FAF9F5] dark:bg-[#151C26] rounded-xl p-6 sm:p-8 border border-[#E0D8CB] dark:border-[#283344] transition-colors">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8E2D6] dark:border-[#283344]">
                <span className="w-7 h-7 rounded-full bg-[#13171F] dark:bg-white text-white dark:text-[#13171F] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-lg font-bold text-[#13171F] dark:text-white">
                  Opsi Tambahan & Rincian Investasi
                </h3>
              </div>

              {/* Value Add-ons */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-[#CBD5E1] flex items-center">
                  <span>Pilihan Fasilitas Ekstra (Opsional):</span>
                  <FieldTooltip content="Pilih layanan pendukung tambahan seperti sesi mentoring privat 1-on-1 atau pengiriman paket workbook fisik ke alamat Anda." />
                </label>

                <div
                  onClick={() => setAddPrivateCoaching(!addPrivateCoaching)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    addPrivateCoaching
                      ? 'bg-white dark:bg-[#202B39] border-[#E85923] shadow-xs'
                      : 'bg-white/60 dark:bg-[#1C2533] border-[#DCD5C9] dark:border-[#2E3C4E] hover:bg-white dark:hover:bg-[#222E3E]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    addPrivateCoaching ? 'bg-[#E85923] border-[#E85923] text-white' : 'border-[#9CA3AF] dark:border-gray-500'
                  }`}>
                    {addPrivateCoaching && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#13171F] dark:text-white">
                      <span>1-on-1 Private Coaching Session (60 Menit)</span>
                      <span className="text-[#E85923] dark:text-[#FFA27B]">+ Rp 450.000</span>
                    </div>
                    <p className="text-[#525E6F] dark:text-[#CBD5E1] mt-0.5">
                      Sesi privat daring bersama Master Trainer pasca-kelas untuk review spesifik presentasi kerja Anda.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setAddPrintedKit(!addPrintedKit)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    addPrintedKit
                      ? 'bg-white dark:bg-[#202B39] border-[#E85923] shadow-xs'
                      : 'bg-white/60 dark:bg-[#1C2533] border-[#DCD5C9] dark:border-[#2E3C4E] hover:bg-white dark:hover:bg-[#222E3E]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    addPrintedKit ? 'bg-[#E85923] border-[#E85923] text-white' : 'border-[#9CA3AF] dark:border-gray-500'
                  }`}>
                    {addPrintedKit && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#13171F] dark:text-white">
                      <span>Printed Workbook Hardcover & Sertifikat Fisik Berbingkai</span>
                      <span className="text-[#E85923] dark:text-[#FFA27B]">+ Rp 150.000</span>
                    </div>
                    <p className="text-[#525E6F] dark:text-[#CBD5E1] mt-0.5">
                      Buku panduan cetak eksklusif & map sertifikat resmi dikirimkan langsung ke alamat rumah/kantor Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Voucher Code Form */}
              <div className="mb-6 p-4 rounded-lg bg-white dark:bg-[#1C2533] border border-[#DCD5C9] dark:border-[#2E3C4E]">
                <label className="text-xs font-semibold text-[#13171F] dark:text-white flex items-center mb-1.5">
                  <span>Punya Kode Voucher / Promo?</span>
                  <FieldTooltip content="Masukkan kode voucher diskon resmi seperti BICARA2027 (potongan 15%) atau EARLYBIRD (potongan 10%) lalu tekan tombol Terapkan." />
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Masukkan kode: BICARA2027 atau EARLYBIRD"
                    title="Ketik kode promo atau voucher diskon untuk mendapatkan potongan harga pendaftaran"
                    className="flex-1 bg-[#FAF9F5] dark:bg-[#151C26] border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-md px-3 py-2 text-xs text-[#13171F] dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#E85923]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#13171F] dark:bg-[#E85923] hover:bg-[#E85923] dark:hover:bg-[#D44A17] rounded-md transition-colors cursor-pointer"
                  >
                    Terapkan
                  </button>
                </div>
                {promoError && (
                  <span className="text-xs text-red-600 dark:text-red-400 mt-1.5 block">{promoError}</span>
                )}
                {appliedPromo && (
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 mt-1.5 block font-medium">
                    ✓ Voucher {appliedPromo.code} berhasil diterapkan!
                  </span>
                )}
                <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] mt-1.5">
                  Tips coba gunakan: <span className="font-mono text-[#8C3A16] dark:text-[#FFA27B] font-semibold">BICARA2027</span> (Diskon 15%) atau <span className="font-mono text-[#8C3A16] dark:text-[#FFA27B] font-semibold">EARLYBIRD</span> (Diskon 10%).
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="p-4 rounded-lg bg-white dark:bg-[#1C2533] border border-[#DCD5C9] dark:border-[#2E3C4E] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#4B5563] dark:text-[#CBD5E1]">
                  <span>Biaya Program ({activeProgram.title} x {count})</span>
                  <span className="tabular-nums font-medium">Rp {rawSubtotal.toLocaleString('id-ID')}</span>
                </div>

                {participantType === 'group' && (
                  <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Diskon Pendaftaran Grup (10%)</span>
                    <span className="tabular-nums font-medium">- Rp {groupDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                {addPrivateCoaching && (
                  <div className="flex items-center justify-between text-[#4B5563] dark:text-[#CBD5E1]">
                    <span>1-on-1 Private Coaching Session</span>
                    <span className="tabular-nums font-medium">+ Rp {privateCoachingFee.toLocaleString('id-ID')}</span>
                  </div>
                )}

                {addPrintedKit && (
                  <div className="flex items-center justify-between text-[#4B5563] dark:text-[#CBD5E1]">
                    <span>Workbook Hardcover & Sertifikat Fisik</span>
                    <span className="tabular-nums font-medium">+ Rp {printedKitFee.toLocaleString('id-ID')}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Potongan Kode Voucher ({appliedPromo.code})</span>
                    <span className="tabular-nums font-medium">- Rp {promoDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E8E2D6] dark:border-[#283344] flex items-baseline justify-between text-base">
                  <span className="font-bold text-[#13171F] dark:text-white">Total Investasi</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#13171F] dark:text-white tabular-nums">
                      Rp {finalTotal.toLocaleString('id-ID')}
                    </span>
                    <span className="block text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                      Termasuk materi, e-certificate, & rekaman kelas
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-base font-bold text-white bg-[#E85923] hover:bg-[#D44A17] active:scale-[0.99] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Selesaikan Pendaftaran Kelas</span>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div className="text-center mt-3 text-xs text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                  Dengan mendaftar, Anda menyetujui{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal?.('terms')}
                    className="text-[#E85923] dark:text-[#FFA27B] hover:underline font-semibold cursor-pointer inline"
                  >
                    Syarat & Ketentuan Kelas
                  </button>{' '}
                  dan{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal?.('privacy')}
                    className="text-[#E85923] dark:text-[#FFA27B] hover:underline font-semibold cursor-pointer inline"
                  >
                    Kebijakan Privasi Peserta
                  </button>{' '}
                  PT NMARK Manajemen Indonesia.
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Instant Success & Ticket Confirmation View */
          <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-md border border-[#E0D8CB] dark:border-[#283344] p-6 sm:p-10 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-700/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#FFA27B] uppercase tracking-wider mb-1">
                Pendaftaran Berhasil Dibuat
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#13171F] dark:text-white">
                Selamat Bergabung di Belajar Bicara!
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] mt-2">
                Simpan nomor registrasi Anda dan lakukan konfirmasi pembayaran untuk mengamankan kursi batch Anda.
              </p>
            </div>

            {/* E-Ticket Card */}
            <div id="e-ticket-card" className="max-w-xl mx-auto bg-[#FAF9F5] dark:bg-[#1C2533] rounded-xl border border-[#DCD5C9] dark:border-[#2E3C4E] p-6 mb-8 relative scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D6] dark:border-[#2E3C4E] mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/kbbLogo_light_88986273.png"
                    alt="Belajar Bicara"
                    className="h-9 w-auto object-contain block dark:hidden"
                  />
                  <img
                    src="/assets/aistudio/kbbLogo_dark_8c5b8668.png"
                    alt="Belajar Bicara"
                    className="h-9 w-auto object-contain hidden dark:block"
                  />
                  <div>
                    <span className="text-[10px] font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase block">Kode Registrasi:</span>
                    <span className="text-base sm:text-lg font-mono font-bold text-[#E85923] dark:text-[#FFA27B]">{registrationCode}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-semibold text-[#6B7280] dark:text-[#94A3B8] uppercase block">Status:</span>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/50 px-2 py-0.5 rounded">
                    Menunggu Pembayaran
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#374151] dark:text-[#E2E8F0]">
                <div className="flex justify-between py-1 border-b border-[#E8E2D6]/60 dark:border-[#283344]">
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">Nama Calon Peserta:</span>
                  <span className="font-semibold text-[#13171F] dark:text-white">{fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D6]/60 dark:border-[#283344]">
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">Program Dipilih:</span>
                  <span className="font-semibold text-[#13171F] dark:text-white">{activeProgram.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D6]/60 dark:border-[#283344]">
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">Jadwal Batch:</span>
                  <span className="font-semibold text-[#13171F] dark:text-white">{selectedBatch?.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D6]/60 dark:border-[#283344]">
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">Waktu & Format:</span>
                  <span className="font-semibold text-[#13171F] dark:text-white">{selectedBatch?.time} ({selectedBatch?.format})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D6]/60 dark:border-[#283344]">
                  <span className="text-[#6B7280] dark:text-[#94A3B8]">Lokasi:</span>
                  <span className="font-semibold text-[#13171F] dark:text-white">{selectedBatch?.location}</span>
                </div>
                <div className="flex justify-between py-1 pt-2">
                  <span className="font-bold text-[#13171F] dark:text-white">Total Investasi:</span>
                  <span className="text-base font-extrabold text-[#E85923] dark:text-[#FFA27B] tabular-nums">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-5 p-3.5 bg-white dark:bg-[#151C26] rounded-lg border border-[#DCD5C9] dark:border-[#2E3C4E] text-xs">
                <span className="font-semibold text-[#13171F] dark:text-white block mb-1">
                  Rekening Resmi NMARK Manajemen Indonesia:
                </span>
                <div className="font-mono text-[#13171F] dark:text-white">
                  Bank Mandiri: <span className="font-bold">137-00-1988202-7</span>
                </div>
                <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                  a.n. PT NMARK MANAJEMEN INDONESIA
                </div>
              </div>
            </div>

            {/* Actions for Participant */}
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs text-center"
              >
                <Send className="w-4 h-4" />
                <span>Konfirmasi via WhatsApp Resmi</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadTicket}
                className="py-3 px-4 text-xs font-semibold text-[#13171F] dark:text-white bg-[#F2ECE1] dark:bg-[#202A38] hover:bg-[#EAE4D9] dark:hover:bg-[#2A374A] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E85923]" />
                <span>Unduh Bukti Tiket</span>
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessToast(false);
                  setIsSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setWhatsapp('');
                  setCompany('');
                }}
                className="text-xs text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white underline cursor-pointer"
              >
                Daftarkan Peserta Tambahan Lainnya
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
