import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2, Lock, AlertTriangle, Phone, Mail, Printer, ArrowRight } from 'lucide-react';

export type LegalTabType = 'terms' | 'privacy';

interface LegalInfoModalProps {
  isOpen: boolean;
  initialTab?: LegalTabType;
  onClose: () => void;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-2xl border border-[#DCD5C9] dark:border-[#283344] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-[#13171F] dark:text-[#F3F4F6]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-[#FAF9F5] dark:bg-[#11161F] border-b border-[#E8E2D6] dark:border-[#283344] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] dark:bg-[#1A2330] p-1.5 flex items-center justify-center border border-[#DCD5C9] dark:border-[#2E3C4E] shadow-xs shrink-0">
              <img
                src="/assets/aistudio/favicon_kbb_86ee25d6.png"
                alt="Logo Belajar Bicara"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider">
                <span>Dokumen Resmi NMARK Indonesia</span>
                <span aria-hidden="true">·</span>
                <span>Tahun 2027</span>
              </div>
              <h2 id="legal-modal-title" className="text-base sm:text-xl font-bold text-[#13171F] dark:text-white leading-tight">
                Pusat Informasi Kebijakan & Ketentuan
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Cetak dokumen ini"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white bg-white dark:bg-[#1E2736] border border-[#DCD5C9] dark:border-[#2E3C4E] rounded-md transition-colors cursor-pointer"
              title="Cetak Halaman"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela informasi"
              className="p-2 text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white hover:bg-[#EAE4D9] dark:hover:bg-[#1E2736] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E2D6] dark:border-[#283344] bg-[#FAF9F5] dark:bg-[#11161F] px-4 sm:px-6 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#E85923] text-[#E85923] dark:text-[#F97316] bg-white/70 dark:bg-[#151C26]'
                : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Syarat & Ketentuan Kelas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#E85923] text-[#E85923] dark:text-[#F97316] bg-white/70 dark:bg-[#151C26]'
                : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Kebijakan Privasi Peserta</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed bg-white dark:bg-[#151C26]">
          {activeTab === 'terms' ? (
            /* ================= SYARAT & KETENTUAN KELAS ================= */
            <div className="space-y-6 text-[#374151] dark:text-[#D1D5DB] animate-in fade-in duration-150">
              <div className="border-b border-[#E8E2D6] dark:border-[#283344] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#13171F] dark:text-white">
                  Syarat & Ketentuan Kepesertaan Program Pelatihan Belajar Bicara
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1">
                  Berlaku untuk seluruh program reguler, eksekutif, dan korporasi PT NMARK Manajemen Indonesia (Katalog 2027).
                </p>
              </div>

              {/* Pasal 1 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">1</span>
                  Ketentuan Pendaftaran & Alokasi Kursi
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    1.1. Calon peserta wajib mengisi formulir pendaftaran resmi dengan data identitas yang valid dan dapat dipertanggungjawabkan (nama lengkap untuk pencetakan sertifikat, email aktif, dan nomor WhatsApp).
                  </p>
                  <p>
                    1.2. Alokasi kursi pada setiap batch pelatihan ditentukan berdasarkan urutan pembayaran yang telah terkonfirmasi (*first-paid, first-secured*).
                  </p>
                  <p>
                    1.3. Guna menjaga kualitas interaksi intensif dan rasio praktik minimal 70%, NMARK membatasi kapasitas maksimal 16-20 peserta per batch untuk kelas Tatap Muka dan 24 peserta untuk kelas Online Live Zoom.
                  </p>
                </div>
              </div>

              {/* Pasal 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">2</span>
                  Pembayaran, Faktur & Penagihan Korporasi
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    2.1. Seluruh transaksi pembayaran individu atau kelompok dilakukan melalui transfer ke rekening resmi: <strong>Bank Mandiri 137-00-1988202-7 a.n. PT NMARK MANAJEMEN INDONESIA</strong>. NMARK tidak bertanggung jawab atas transaksi di luar nomor rekening resmi tersebut.
                  </p>
                  <p>
                    2.2. Untuk pendaftaran korporasi / institusi pemerintah, konfirmasi keikutsertaan dapat menggunakan Purchase Order (PO) atau Surat Perintah Kerja (SPK) resmi dengan termin penagihan *Corporate Invoice* sesuai kesepakatan tertulis.
                  </p>
                  <p>
                    2.3. Bukti pembayaran wajib dikonfirmasikan melalui tim admission atau melalui WhatsApp resmi (+62 818-1494-240) untuk penerbitan E-Ticket resmi.
                  </p>
                </div>
              </div>

              {/* Pasal 3 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">3</span>
                  Kebijakan Pindah Jadwal (Reschedule) & Pengalihan Tiket
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    3.1. <strong>Bebas Biaya Reschedule:</strong> Peserta dapat mengajukan perpindahan ke batch lain tanpa dikenakan biaya administrasi jika permohonan diajukan selambat-lambatnya 7 (tujuh) hari kalender sebelum tanggal pelaksanaan kelas dimulai.
                  </p>
                  <p>
                    3.2. <strong>Pengalihan Tiket (Transferable):</strong> Jika peserta berhalangan hadir mendadak, tiket kepesertaan dapat dialihkan kepada rekan kerja atau pihak lain dengan memberitahukan tim admission minimal 24 jam sebelum kelas dimulai.
                  </p>
                  <p>
                    3.3. <strong>Kebijakan Pembatalan & Refund:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Pembatalan H-14 atau lebih sebelum pelaksanaan: Pengembalian dana 80% (20% biaya administrasi & persiapan logistik).</li>
                    <li>Pembatalan antara H-13 hingga H-7: Pengembalian dana 50%.</li>
                    <li>Pembatalan H-6 atau kurang: Tidak dapat dilakukan refund, namun tiket berhak dijadwalkan ulang ke batch berikutnya dalam kurun waktu maksimal 6 bulan.</li>
                  </ul>
                </div>
              </div>

              {/* Pasal 4 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">4</span>
                  Standar Kehadiran & Penerbitan Sertifikat Kelulusan
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    4.1. Sertifikat Kelulusan Resmi dari NMARK Manajemen Indonesia hanya akan diterbitkan bagi peserta yang memenuhi kehadiran minimal 80% dari total jam pembelajaran serta berpartisipasi aktif dalam sesi simulasi praktik akhir.
                  </p>
                  <p>
                    4.2. Sertifikat dilengkapi nomor seri verifikasi resmi dan dapat diverifikasi keasliannya melalui sekretariat admission NMARK.
                  </p>
                </div>
              </div>

              {/* Pasal 5 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">5</span>
                  Hak Kekayaan Intelektual (HAKI) Materi
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    5.1. Seluruh modul, workbook, slide visual, metode 5-tahap, dan materi audiovisual yang dibagikan selama pelatihan merupakan hak kekayaan intelektual terdaftar milik PT NMARK Manajemen Indonesia.
                  </p>
                  <p>
                    5.2. Peserta dilarang keras merekam penuh sesi tanpa izin, memperbanyak, mendistribusikan ulang, atau mengomersialkan materi tersebut tanpa izin tertulis dari manajemen NMARK.
                  </p>
                </div>
              </div>

              {/* Pasal 6 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBEFEA] dark:bg-[#2A1D18] text-[#E85923] dark:text-[#F97316] text-xs flex items-center justify-center font-bold">6</span>
                  Keadaan Kahar (Force Majeure)
                </h4>
                <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                  <p>
                    Apabila terjadi hal-hal di luar kendali wajar para pihak (bencana alam, kerusuhan, kebijakan darurat pemerintah terkait kesehatan, atau gangguan teknis infrastruktur nasional), NMARK berhak menjadwalkan ulang kelas ke waktu yang disepakati tanpa penalti dari kedua belah pihak.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ================= KEBIJAKAN PRIVASI PESERTA ================= */
            <div className="space-y-6 text-[#374151] dark:text-[#D1D5DB] animate-in fade-in duration-150">
              <div className="border-b border-[#E8E2D6] dark:border-[#283344] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#13171F] dark:text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Kebijakan Privasi & Perlindungan Data Peserta Belajar Bicara</span>
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1">
                  Disusun berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).
                </p>
              </div>

              {/* Komitmen Kerahasiaan Rekaman Bicara */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                <div className="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Jaminan Kerahasiaan Rekaman Praktik Bicara (Speech Recording Privacy)</span>
                </div>
                <p className="leading-relaxed">
                  Kami memahami bahwa berbicara di depan publik dan proses latihan mengatasi gugup membutuhkan ruang yang aman (*safe psychological space*). Seluruh rekaman video latihan Anda selama kelas <strong>HANYA digunakan untuk evaluasi personal instruktur kepada Anda</strong>. NMARK <strong>TIDAK PERNAH</strong> mempublikasikan cuplikan video latihan peserta ke media sosial atau sarana promosi tanpa persetujuan tertulis (*explicit written consent*) dari Anda.
                </p>
              </div>

              {/* Bagian 1 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base">
                  1. Informasi yang Kami Kumpulkan
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p>Kami hanya mengumpulkan data yang secara sadar Anda berikan saat melakukan pendaftaran kelas, asesmen bicara, atau interaksi konsultasi:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Identitas Pribadi:</strong> Nama lengkap peserta (termasuk gelar profesional jika ingin dicantumkan di sertifikat resmi).</li>
                    <li><strong>Informasi Kontak:</strong> Alamat surat elektronik (email), nomor telepon WhatsApp, dan alamat pengiriman kit fisik.</li>
                    <li><strong>Data Profesional:</strong> Nama perusahaan, divisi kerja, atau jabatan (berguna untuk penyesuaian studi kasus kelas).</li>
                    <li><strong>Data Evaluasi Bicara:</strong> Hasil asesmen diagnostik gaya bicara dan rekaman simulasi selama kelas berlangsung.</li>
                  </ul>
                </div>
              </div>

              {/* Bagian 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base">
                  2. Tujuan & Dasar Pemrosesan Data
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p>Data pribadi Anda diproses secara sah untuk tujuan-tujuan berikut:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Memproses verifikasi pendaftaran, penerbitan invoice resmi, dan pengiriman E-Ticket batch kelas.</li>
                    <li>Menerbitkan dan mengarsipkan Sertifikat Kelulusan resmi dengan kode seri unik.</li>
                    <li>Mengirimkan informasi operasional kelas, tautan Zoom, materi pra-pelatihan, dan panduan lokasi.</li>
                    <li>Memberikan umpan balik evaluasi teknik bicara 1-on-1 dari tim instruktur bersertifikasi NMARK.</li>
                    <li>Kepatuhan terhadap ketentuan hukum dan pelaporan perpajakan transaksi di Indonesia.</li>
                  </ul>
                </div>
              </div>

              {/* Bagian 3 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base">
                  3. Perlindungan & Keamanan Data
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p>
                    PT NMARK Manajemen Indonesia menerapkan pengamanan fisik, teknis, dan manajerial berstandar tinggi (enkripsi SSL/TLS, akses berjenjang hanya bagi staf admission dan instruktur berwenang, serta pemantauan akses berkala). Kami <strong>TIDAK PERNAH menjual, menyewakan, atau menukar data pribadi peserta</strong> kepada pihak ketiga mana pun untuk tujuan pemasaran produk di luar ekosistem pelatihan NMARK.
                  </p>
                </div>
              </div>

              {/* Bagian 4 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base">
                  4. Hak-Hak Anda sebagai Pemilik Data
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p>Sesuai dengan ketentuan UU PDP, Anda memiliki hak penuh untuk:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Meminta salinan data pribadi yang kami simpan mengenai diri Anda.</li>
                    <li>Meminta perbaikan atau pembaruan nama atau kontak jika terdapat kekeliruan data pada sertifikat.</li>
                    <li>Meminta penghapusan data kontak promosi (berhenti berlangganan informasi batch baru / *unsubscribe*).</li>
                    <li>Menolak penggunaan data rekaman bicara untuk keperluan apa pun di luar evaluasi privat kelas.</li>
                  </ul>
                </div>
              </div>

              {/* Bagian 5 */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#13171F] dark:text-white text-sm sm:text-base">
                  5. Kontak Petugas Pelindungan Data (Data Protection Officer)
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p>
                    Jika Anda memiliki pertanyaan, keberatan, atau ingin mengajukan permohonan hak atas data pribadi Anda, silakan hubungi kontak resmi kami:
                  </p>
                  <div className="p-3.5 rounded-lg bg-[#FAF9F5] dark:bg-[#111722] border border-[#E8E2D6] dark:border-[#283344] text-xs space-y-1">
                    <div><strong>PT NMARK Manajemen Indonesia</strong></div>
                    <div>Sekretariat Admission & Perlindungan Data Peserta</div>
                    <div>Alamat: NMARK Tower, Kawasan Mega Kuningan, Jakarta Selatan 12950</div>
                    <div>Email: <a href="mailto:admission@nmarkmanagement.com" className="text-[#E85923] hover:underline">admission@nmarkmanagement.com</a></div>
                    <div>WhatsApp Resmi: <a href="https://api.whatsapp.com/send?phone=628181494240" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">+62 818-1494-240</a></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF9F5] dark:bg-[#11161F] border-t border-[#E8E2D6] dark:border-[#283344] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#6B7280] dark:text-[#94A3B8] text-center sm:text-left">
            Terakhir Diperbarui: Januari 2027 · PT NMARK Manajemen Indonesia
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activeTab === 'terms' ? (
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Lihat Kebijakan Privasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('terms')}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Lihat Syarat & Ketentuan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-[#13171F] dark:bg-[#E85923] hover:bg-[#E85923] dark:hover:bg-[#D44A17] rounded-md transition-colors cursor-pointer"
            >
              Saya Mengerti & Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
