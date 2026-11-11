export interface ProgramItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  area: 'Professional Communication Skills' | 'Organizational Communication' | 'Strategic & Crisis Communication' | 'Public Relations & Media';
  categoryKey: 'public-speaking' | 'workplace' | 'leadership' | 'pr-media';
  duration: string;
  recommendedFor: string;
  format: 'Tatap Muka & Online' | 'Tatap Muka (Jakarta)' | 'Online Live Zoom';
  price: number;
  originalPrice: number;
  nextBatches: {
    id: string;
    date: string;
    days: string;
    time: string;
    format: string;
    location: string;
    seatsLeft: number;
  }[];
  objectives: string[];
  topics: string[];
  syllabus: {
    session: string;
    title: string;
    details: string[];
  }[];
  isPopular?: boolean;
}

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'effective-public-speaking',
    code: '09',
    title: 'Effective Public Speaking',
    tagline: 'Kuasai Panggung, Bangun Kredibilitas, dan Bicara dengan Percaya Diri Tinggi',
    area: 'Professional Communication Skills',
    categoryKey: 'public-speaking',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Seluruh profesional, manajer, founder, dan individu yang ingin meningkatkan kemampuan berbicara di depan umum secara meyakinkan.',
    format: 'Tatap Muka & Online',
    price: 2450000,
    originalPrice: 3200000,
    isPopular: true,
    nextBatches: [
      {
        id: 'eps-b1',
        date: '28 - 29 Maret 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'NMARK Training Center, Mega Kuningan, Jakarta Selatan',
        seatsLeft: 4
      },
      {
        id: 'eps-b2',
        date: '11 - 12 April 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 16.30 WIB',
        format: 'Online Live Interactive',
        location: 'Zoom Studio NMARK (HD Multi-Camera)',
        seatsLeft: 7
      },
      {
        id: 'eps-b3',
        date: '25 - 26 April 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'NMARK Training Center, Mega Kuningan, Jakarta Selatan',
        seatsLeft: 10
      }
    ],
    objectives: [
      'Memahami prinsip komunikasi lisan yang efektif dan berdampak.',
      'Meningkatkan rasa percaya diri dan mengatasi kecemasan panggung (stage fright).',
      'Menyusun struktur presentasi yang terarah, memikat, dan mudah diingat audiens.',
      'Menguasai teknik penyampaian persuasif (vocal pacing, pitch, intonasi & bahasa tubuh).',
      'Mengelola audiens heterogen serta memimpin sesi tanya jawab (Q&A) dengan tangkas.'
    ],
    topics: [
      'Prinsip Komunikasi Lisan & Psikologi Audiens',
      'Persiapan, Riset, & Perencanaan Presentasi Berbobot',
      'Struktur & Alur Presentasi: Hook, Story, & Action',
      'Teknik Penyampaian Efektif & Artikulasi Vokal',
      'Bahasa Tubuh, Postur, & Eye Contact yang Berwibawa',
      'Penggunaan Visual Aid & Slide Presentasi yang Menghipnotis',
      'Mengelola Gugup, Audiens Skeptis, & Sesi Q&A Tajam',
      'Praktik Langsung di Panggung & Umpan Balik Konsultatif 1-on-1'
    ],
    syllabus: [
      {
        session: 'Hari 1 (Sesi 1 & 2)',
        title: 'Mindset & Fondasi Komunikasi Lisan',
        details: [
          'Dekonstruksi ketakutan bicara: memahami respons fight-or-flight dan teknik regulasi napas diafragma.',
          'Mendiagnosis profil audiens: kebutuhan, tingkat pengetahuan, dan titik perhatian utama.',
          'Formula kerangka pesan 3 Pilar (Problem - Insight - Resolution).'
        ]
      },
      {
        session: 'Hari 1 (Sesi 3 & 4)',
        title: 'Storytelling & Struktur Narasi Persuasif',
        details: [
          'Teknik membuka presentasi dalam 60 detik pertama yang merebut perhatian.',
          'Storytelling bisnis: mengubah data rumit menjadi narasi emosional yang menggerakkan aksi.',
          'Workshop penyusunan naskah & mini-pitching kelompok.'
        ]
      },
      {
        session: 'Hari 2 (Sesi 5 & 6)',
        title: 'Vocal Delivery & Bahasa Tubuh Berwibawa',
        details: [
          'Teknik modulasi suara: tempo, jeda dramatis (power pause), dan penekanan kata kunci.',
          'Bahasa tubuh panggung: postur netral, gestur tangan terbuka, dan penyapuan kontak mata.',
          'Sinkronisasi slide visual tanpa membaca teks di layar.'
        ]
      },
      {
        session: 'Hari 2 (Sesi 7 & 8)',
        title: 'Simulasi Panggung, Q&A Mastery & Umpan Balik 1-on-1',
        details: [
          'Simulasi presentasi penuh di hadapan peserta dengan rekaman video high-definition.',
          'Teknik menangani pertanyaan menjebak, kritik keras, atau peserta pasif.',
          'Review video rekaman personal dan perumusan Action Plan Pasca-Pelatihan.'
        ]
      }
    ]
  },
  {
    id: 'workplace-communication-skills',
    code: '02',
    title: 'Workplace Communication Skills',
    tagline: 'Keahlian Komunikasi Interpersonal & Kolaborasi Tim di Lingkungan Kerja Modern',
    area: 'Organizational Communication',
    categoryKey: 'workplace',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Seluruh karyawan, staf, supervisor, dan profesional dari berbagai fungsi yang ingin meningkatkan kelancaran koordinasi kerja dan meminimalkan miskomunikasi.',
    format: 'Tatap Muka & Online',
    price: 1950000,
    originalPrice: 2600000,
    nextBatches: [
      {
        id: 'wcs-b1',
        date: '18 - 19 Maret 2027',
        days: 'Kamis - Jumat',
        time: '09.00 - 16.30 WIB',
        format: 'Online Live Interactive',
        location: 'Zoom Studio NMARK',
        seatsLeft: 6
      },
      {
        id: 'wcs-b2',
        date: '15 - 16 April 2027',
        days: 'Kamis - Jumat',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'NMARK Training Center, Mega Kuningan, Jakarta Selatan',
        seatsLeft: 8
      }
    ],
    objectives: [
      'Menguasai keterampilan komunikasi interpersonal yang efektif di tempat kerja.',
      'Meningkatkan kemampuan menyampaikan ide, usulan perbaikan, dan active listening.',
      'Membangun hubungan kerja yang positif, inklusif, dan produktif.',
      'Mengurangi gesekan serta mengelola perbedaan pendapat menjadi solusi kolaboratif.'
    ],
    topics: [
      'Prinsip Dasar Komunikasi Efektif di Era Hybrid/Remote',
      'Komunikasi Verbal & Nonverbal yang Profesional',
      'Active Listening & Empati dalam Dinamika Kerja',
      'Seni Memberikan & Menerima Feedback Tanpa Menyinggung',
      'Komunikasi Lintas Tim & Sinkronisasi Ekspektasi Antar-Divisi',
      'Mengelola Miskomunikasi, Asumsi, & Manajemen Konflik'
    ],
    syllabus: [
      {
        session: 'Hari 1',
        title: 'Fondasi Interpersonal & Mendengarkan Aktif',
        details: [
          'Memetakan 4 gaya komunikasi rekan kerja (Analytical, Driver, Amiable, Expressive).',
          'Active Listening: parafrase, klarifikasi pertanyaan, dan menangkap kebutuhan tersirat.',
          'Etiket komunikasi tertulis (Email, Slack, WhatsApp kerja) agar jelas dan beradab.'
        ]
      },
      {
        session: 'Hari 2',
        title: 'Feedback Konstruktif & Resolusi Konflik',
        details: [
          'Kerangka SBI (Situation - Behavior - Impact) dalam memberikan evaluasi kerja.',
          'Menerima kritik keras secara elegan tanpa defensif.',
          'Simulasi mediasi konflik internal antar departemen dan kesepakatan kolaborasi.'
        ]
      }
    ]
  },
  {
    id: 'leadership-communication',
    code: '03',
    title: 'Leadership Communication',
    tagline: 'Sampaikan Visi, Pimpin Perubahan, dan Satukan Tim Melalui Narasi Kepemimpinan',
    area: 'Strategic & Crisis Communication',
    categoryKey: 'leadership',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Manajer, supervisor, kepala departemen, direktur, dan calon pemimpin organisasi yang membutuhkan kepiawaian komunikasi strategis.',
    format: 'Tatap Muka & Online',
    price: 3100000,
    originalPrice: 4200000,
    isPopular: true,
    nextBatches: [
      {
        id: 'lc-b1',
        date: '20 - 21 Maret 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'Hotel Mulia Senayan / NMARK Executive Lounge',
        seatsLeft: 3
      },
      {
        id: 'lc-b2',
        date: '22 - 23 April 2027',
        days: 'Kamis - Jumat',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'Hotel Mulia Senayan / NMARK Executive Lounge',
        seatsLeft: 5
      }
    ],
    objectives: [
      'Mengembangkan kemampuan komunikasi strategis bagi pemimpin di berbagai jenjang.',
      'Menyampaikan visi, keputusan sulit, dan arahan transformasi secara jernih & meyakinkan.',
      'Memimpin dan menjaga ketenangan komunikasi tim saat menghadapi krisis atau tekanan.',
      'Membangun budaya kepercayaan dan psychological safety dalam organisasi.'
    ],
    topics: [
      'Komunikasi Strategis & Wibawa Pemimpin',
      'Menyampaikan Visi, Road Map, & Pesan Perubahan (Change Management)',
      'Executive Public Speaking & Presentasi Dewan Direksi',
      'Komunikasi dalam Pengambilan Keputusan Kritis',
      'Komunikasi Krisis: Prinsip Transparansi & Perlindungan Reputasi',
      'Pasca-Krisis: Membangun Kembali Moral Tim & Kepercayaan Pemangku Kepentingan'
    ],
    syllabus: [
      {
        session: 'Hari 1',
        title: 'Visi, Storytelling Pemimpin & Townhall Mastery',
        details: [
          'Membingkai narasi perubahan organisasi agar diterima dengan optimisme.',
          'Format briefing townhall dan penyelarasan tujuan strategis perusahaan.',
          'Penyusunan Executive Talking Points untuk presentasi tingkat dewan.'
        ]
      },
      {
        session: 'Hari 2',
        title: 'Komunikasi Situasi Sulit & Ketahanan Krisis',
        details: [
          'Teknik menyampaikan berita buruk (bad news delivery) dengan empati dan integritas.',
          'Simulasi penanganan tekanan pemangku kepentingan dan media.',
          'Personal Leadership Voice Assessment dan rencana pendampingan eksekutif.'
        ]
      }
    ]
  },
  {
    id: 'spokesperson-media-training',
    code: '06',
    title: 'Spokesperson & Media Training',
    tagline: 'Keahlian Juru Bicara Resmi, Menghadapi Wartawan, & Menjaga Citra Organisasi',
    area: 'Public Relations & Media',
    categoryKey: 'pr-media',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Eksekutif, Manajer Humas/PR, Corp Comm, dan pejabat juru bicara organisasi yang berinteraksi langsung dengan media massa.',
    format: 'Tatap Muka (Jakarta)',
    price: 3600000,
    originalPrice: 4800000,
    nextBatches: [
      {
        id: 'smt-b1',
        date: '3 - 4 April 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif Studio',
        location: 'Broadcast Studio NMARK, Jakarta Selatan',
        seatsLeft: 5
      }
    ],
    objectives: [
      'Meningkatkan rasa percaya diri dan kematangan emosional sebagai juru bicara.',
      'Menyampaikan pesan kunci secara ringkas, padat, dan tidak mudah dipelintir.',
      'Menguasai teknik menghadapi wawancara doorstop, siaran live TV, hingga podcast.',
      'Menjaga konsistensi pesan serta membentengi reputasi institusi.'
    ],
    topics: [
      'Peran & Tanggung Jawab Juru Bicara Modern',
      'Message Development & Formulasi Soundbite Berdaya Pikat',
      'Teknik Wawancara Media (Bridging, Flagging, Hooking)',
      'Menangani Pertanyaan Sulit, Agresif, atau Spekulatif',
      'Body Language, Kontak Mata ke Lensa, & Manajemen Vokal Kamera',
      'Simulasi Wawancara Mock Interview di Bawah Sorotan Kamera dengan Umpan Balik Redaktur'
    ],
    syllabus: [
      {
        session: 'Hari 1',
        title: 'Arsitektur Pesan Kunci & Etiket Media',
        details: [
          'Memahami cara kerja dapur redaksi dan apa yang dicari jurnalis dalam sebuah kutipan.',
          'Membuat Message House: Core Statement, 3 Supporting Pillars, dan Bukti Fakta.',
          'Latihan bridging technique untuk mengembalikan pertanyaan jebakan ke pesan inti.'
        ]
      },
      {
        session: 'Hari 2',
        title: 'Simulasi On-Camera & Doorstop Scenarios',
        details: [
          'Simulasi wawancara doorstop dengan reporter agresif dalam skenario krisis.',
          'Simulasi wawancara studio TV 1-on-1 dengan lighting dan mikrofon siaran nyata.',
          'Analisis playback frame-by-frame oleh instruktur mantan jurnalis senior.'
        ]
      }
    ]
  },
  {
    id: 'effective-internal-communication',
    code: '01',
    title: 'Effective Internal Communication',
    tagline: 'Perkuat Saluran Pesan, Tingkatkan Engagement & Kinerja Lintas Departemen',
    area: 'Organizational Communication',
    categoryKey: 'workplace',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Staf & profesional di bidang komunikasi internal, HR, PR, General Affairs, dan pengelola budaya kerja.',
    format: 'Online Live Zoom',
    price: 1850000,
    originalPrice: 2400000,
    nextBatches: [
      {
        id: 'eic-b1',
        date: '23 - 24 April 2027',
        days: 'Jumat - Sabtu',
        time: '09.00 - 16.00 WIB',
        format: 'Online Live Interactive',
        location: 'Zoom Studio NMARK',
        seatsLeft: 9
      }
    ],
    objectives: [
      'Memahami peran strategis komunikasi internal dalam engagement karyawan.',
      'Merancang arsitektur strategi dan saluran komunikasi internal yang efisien.',
      'Menyampaikan pesan pimpinan secara persuasif, transparan, dan terstruktur.',
      'Mengukur efektivitas kampanye komunikasi di dalam organisasi.'
    ],
    topics: [
      'Tantangan Komunikasi Internal di Organisasi Skala Menengah & Besar',
      'Analisis Audiens Karyawan & Segmentasi Kebutuhan',
      'Storytelling Internal & Penguatan Budaya Korporat',
      'Audit Saluran: Townhall, Newsletter, Intranet, & Chat Internal',
      'Metrik & Evaluasi Dampak Komunikasi Internal terhadap Produktivitas'
    ],
    syllabus: [
      {
        session: 'Hari 1',
        title: 'Strategi & Pemetaan Komunikasi Karyawan',
        details: [
          'Mengidentifikasi bottleneck aliran informasi antara pimpinan dan staf lapangan.',
          'Menyusun Kalender Komunikasi Internal tahunan yang terintegrasi.',
          'Menulis pesan internal yang memotivasi dan tidak membosankan.'
        ]
      },
      {
        session: 'Hari 2',
        title: 'Manajemen Kampanye Budaya & Pengukuran ROI',
        details: [
          'Memanfaatkan media internal untuk perubahan perilaku kerja (Safety, Integrity, Innovation).',
          'Alat ukur survei kepuasan komunikasi internal.',
          'Studi kasus transformasi komunikasi internal perusahaan terkemuka.'
        ]
      }
    ]
  },
  {
    id: 'crisis-communication-management',
    code: '07',
    title: 'Crisis Communication Management',
    tagline: 'Identifikasi Risiko, Siapkan Respons Terarah, & Lindungi Reputasi Organisasi',
    area: 'Strategic & Crisis Communication',
    categoryKey: 'leadership',
    duration: '2 Hari (16 Jam Pembelajaran)',
    recommendedFor: 'Manajer, Humas/PR, Corporate Communication, Manajemen Risiko, dan Pimpinan Unit Operasional.',
    format: 'Tatap Muka (Jakarta)',
    price: 3400000,
    originalPrice: 4500000,
    nextBatches: [
      {
        id: 'ccm-b1',
        date: '8 - 9 Mei 2027',
        days: 'Sabtu - Minggu',
        time: '09.00 - 17.00 WIB',
        format: 'Tatap Muka Eksklusif',
        location: 'NMARK Training Center, Mega Kuningan, Jakarta Selatan',
        seatsLeft: 6
      }
    ],
    objectives: [
      'Memahami prinsip, siklus, dan anatomi krisis reputasi di era digital & media sosial.',
      'Mengidentifikasi potensi isu sejak dini (early warning system).',
      'Menyusun strategi respon cepat (golden hour response) dan pesan kunci penenang.',
      'Mengelola komunikasi multi-kanal dan memitigasi penyebaran disinformasi.'
    ],
    topics: [
      'Memahami Krisis & Risiko Reputasi Kontemporer',
      'Siklus Manajemen Krisis: Pre-Crisis, Crisis Response, Post-Crisis',
      'Stakeholder Mapping & Analisis Sentimen Publik',
      'Holding Statement & Strategi Pesan Kunci Krisis',
      'Simulasi & Latihan Meja Bundar (War Room Simulation)',
      'Evaluasi, Rekonsiliasi, & Pemulihan Kepercayaan Pemangku Kepentingan'
    ],
    syllabus: [
      {
        session: 'Hari 1',
        title: 'Protokol Krisis & Early Warning Framework',
        details: [
          'Penyusunan Crisis Communication Manual dan Tim Tanggap Krisis.',
          'Teknik holding statement dalam 30 menit pertama krisis mencuat di media sosial.',
          'Etika hukum dan batasan komunikasi selama investigasi berjalan.'
        ]
      },
      {
        session: 'Hari 2',
        title: 'War Room Simulation & Rekonstruksi Citra',
        details: [
          'Simulasi krisis bertekanan tinggi dengan skenario viral nyata.',
          'Konferensi pers darurat dan tanggapan terhadap tuduhan publik.',
          'Audit pasca krisis dan rencana rekonsiliasi pemangku kepentingan.'
        ]
      }
    ]
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    name: 'Konsep',
    subtitle: 'Prinsip & Kerangka Pikir',
    description: 'Memahami prinsip fundamental dan kerangka pikir komunikasi yang efektif, bukan sekadar teori hafalan, melainkan formula logika yang mudah dipraktikkan.',
    color: 'from-amber-500/20 to-orange-500/10'
  },
  {
    step: '02',
    name: 'Latihan',
    subtitle: 'Aplikasi Terarah Intensif',
    description: 'Mengaplikasikan konsep secara langsung melalui latihan terarah, baik secara individu di depan cermin/kamera maupun diskusi kelompok terfasilitasi.',
    color: 'from-orange-500/20 to-red-500/10'
  },
  {
    step: '03',
    name: 'Simulasi',
    subtitle: 'Situasi Nyata & Kasus',
    description: 'Menghadapi situasi panggung dan dinamika kerja sesungguhnya melalui role-play, presentasi di depan kelas, dan studi kasus bertekanan tinggi.',
    color: 'from-red-500/20 to-rose-500/10'
  },
  {
    step: '04',
    name: 'Umpan Balik',
    subtitle: 'Konsultatif & Personal',
    description: 'Menerima umpan balik konsultatif objektif dari instruktur berpengalaman untuk mendeteksi blind-spot vokal, gestur, dan penyusunan pesan.',
    color: 'from-orange-600/20 to-amber-600/10'
  },
  {
    step: '05',
    name: 'Tindak Lanjut',
    subtitle: 'Rencana Aksi Berkelanjutan',
    description: 'Menyusun rencana aksi dan komitmen penguatan pasca-kelas agar kebiasaan komunikasi baru bertahan lama dan menciptakan dampak riil di karier.',
    color: 'from-emerald-600/20 to-teal-600/10'
  }
];

export const LEARNING_PRINCIPLES = [
  {
    number: '1',
    title: 'Practical & Applicable',
    desc: 'Relevan dengan tuntutan dunia kerja modern dan dapat langsung diterapkan pada hari berikutnya saat Anda memimpin rapat atau berhadapan dengan audiens.'
  },
  {
    number: '2',
    title: 'Context-Based',
    desc: 'Materi disesuaikan dengan kebutuhan nyata, tantangan industri spesifik, serta budaya organisasi tempat Anda berkiprah.'
  },
  {
    number: '3',
    title: 'Interactive',
    desc: 'Mendorong partisipasi aktif peserta, kolaborasi dua arah, serta simulasi panggung hidup—bukan ceramah pasif satu arah.'
  },
  {
    number: '4',
    title: 'Outcome-Oriented',
    desc: 'Berfokus pada transformasi perilaku bicara nyata, peningkatan rasa percaya diri, dan pencapaian hasil komunikasi yang meyakinkan.'
  },
  {
    number: '5',
    title: 'Measurable',
    desc: 'Dilengkapi indikator evaluasi pra dan pasca pelatihan untuk mengukur peningkatan kemajuan teknik bicara secara terukur.'
  }
];

export const SERVICE_LEVELS = [
  {
    level: 'Level 1',
    title: 'Communication Skills Training',
    duration: 'Durasi: 1 – 2 Hari',
    summary: 'Pelatihan terfokus untuk meningkatkan keterampilan komunikasi dasar dan aplikatif yang siap digunakan sehari-hari dalam tugas profesional.',
    features: [
      'Cocok untuk peningkatan skill cepat & taktis',
      'Maksimal 15-20 peserta per angkatan agar interaktif',
      'Modul lengkap & lembar kerja praktik mandiri',
      'Sertifikat kelulusan resmi NMARK'
    ],
    recommended: 'Individu & Tim Fungsional'
  },
  {
    level: 'Level 2',
    title: 'Communication Development Program',
    duration: 'Durasi: 2 – 6 Minggu',
    summary: 'Program pengembangan komprehensif untuk memperkuat kompetensi komunikasi secara terstruktur, bertahap, dan berkelanjutan.',
    features: [
      'Pendampingan intensif berkesinambungan',
      'Sesi coaching personal 1-on-1 mingguan',
      'Tugas proyek nyata berbasis tantangan kerja peserta',
      'Pre & post assessment terstandarisasi'
    ],
    isPopular: true,
    recommended: 'Talenta Unggulan & Calon Pemimpin'
  },
  {
    level: 'Level 3',
    title: 'Communication Consulting & Transformation',
    duration: 'Durasi: 2 – 6 Bulan+',
    summary: 'Pendekatan konsultatif menyeluruh untuk merancang strategi komunikasi korporat, mengelola perubahan budaya, dan memperkuat reputasi organisasi.',
    features: [
      'Audit menyeluruh ekosistem komunikasi organisasi',
      'Penyusunan cetak biru (blueprint) komunikasi korporat',
      'Pelatihan terpadu dari jajaran direksi hingga lini depan',
      'Advisory berkala bersama Senior Communication Consultant'
    ],
    recommended: 'Korporasi, BUMN & Lembaga Publik'
  }
];

export const TRAINERS = [
  {
    name: 'Baskoro Adiwijaya, M.Si.',
    role: 'Senior Communication Consultant & Master Trainer',
    bio: 'Praktisi komunikasi strategis dengan lebih dari 18 tahun pengalaman mendampingi eksekutif BUMN dan Fortune 500 di Indonesia.',
    credentials: 'Ex-News Anchor Nasional, Certified Executive Coach',
    imagePlaceholder: 'BA'
  },
  {
    name: 'Clarissa Natalia, M.I.Kom.',
    role: 'Lead Public Speaking & Voice Coach',
    bio: 'Spesialis vocal delivery, storytelling naratif, dan psikologi panggung. Telah melatih lebih dari 6.000 pembicara profesional dan TEDx speakers.',
    credentials: 'Professional MC, Voice-Over Talent & TEDx Speaker Coach',
    imagePlaceholder: 'CN'
  },
  {
    name: 'Reza Hendrawan, S.Sos.',
    role: 'Crisis Communication & Media Strategist',
    bio: 'Konsultan hubungan media kawakan yang kerap memandu manajemen krisis korporat, perumusan pesan kunci, dan pelatihan juru bicara kementerian.',
    credentials: 'Ex-Redaktur Pelaksana Media Nasional & PR Advisor',
    imagePlaceholder: 'RH'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Sebelum ikut Belajar Bicara NMARK, saya selalu merasa cemas dan sering blank saat presentasi di depan Board of Directors. Setelah mempelajari teknik 3-Pilar dan olah napas, presentasi strategi tahunan saya kemarin disetujui penuh tanpa revisi!',
    author: 'Dimas Satria Pradana',
    title: 'Vice President of Operations',
    company: 'Fintech Unicorn Indonesia',
    program: 'Effective Public Speaking'
  },
  {
    quote: 'Program Workplace Communication ini mengubah cara kerja tim kami. Friksi antardepartemen menurun drastis karena staf kini memahami cara memberi feedback objektif tanpa membuat rekan kerja tersinggung.',
    author: 'Ratna Kusumaningrum',
    title: 'Head of People & Culture',
    company: 'BUMN Sektor Energi',
    program: 'Workplace Communication Skills'
  },
  {
    quote: 'Simulasi kamera di studio NMARK sungguh membuka mata. Kami dilatih menghadapi pertanyaan wartawan yang agresif dengan kepala dingin dan tetap mengarahkan ke pesan kunci. Sangat direkomendasikan bagi jubir organisasi.',
    author: 'Fajar Nugroho',
    title: 'Corporate Secretary & Juru Bicara',
    company: 'Perusahaan Manufaktur Publik (Tbk)',
    program: 'Spokesperson & Media Training'
  }
];

export const FAQS = [
  {
    question: 'Saya orang yang sangat introver dan mudah gugup, apakah program ini cocok untuk pemula?',
    answer: 'Sangat cocok! Lebih dari 65% peserta kami berangkat dari latar belakang introver atau memiliki pengalaman cemas panggung. Metodologi NMARK dirancang secara psikologis bertahap (Konsep -> Latihan tertutup -> Simulasi aman -> Umpan balik privat), sehingga Anda tidak akan dipaksa langsung tampil di luar kesiapan. Instruktur kami memberikan teknik pernapasan dan mindset yang terbukti meredakan gugup.'
  },
  {
    question: 'Bagaimana perbandingan kelas Tatap Muka (Offline) dan Online Live Zoom?',
    answer: 'Kelas Tatap Muka diselenggarakan di NMARK Training Center (Mega Kuningan, Jakarta Selatan) dengan fasilitas panggung mini, lighting profesional, mikrofon panggung, serta rekaman video HD 1-on-1. Sedangkan kelas Online Live Zoom menggunakan setup interaktif multi-camera studio, breakout rooms berpasangan, dan evaluasi langsung lewat layar. Keduanya memiliki rasio praktik minimal 70%.'
  },
  {
    question: 'Apakah saya mendapatkan sertifikat resmi?',
    answer: 'Ya, seluruh peserta yang menyelesaikan minimal 80% sesi dan mengikuti simulasi akhir akan memperoleh Sertifikat Kelulusan Resmi berseri dari NMARK Manajemen Indonesia, yang diakui dan dapat dicantumkan pada portofolio profesional atau LinkedIn Anda.'
  },
  {
    question: 'Apakah NMARK melayani pelatihan in-house khusus untuk perusahaan kami?',
    answer: 'Tentu saja. NMARK secara rutin menyelenggarakan In-House Training (Level 1, 2, atau 3) yang disesuaikan 100% dengan kebutuhan industri, kasus bisnis internal, dan jadwal perusahaan Anda. Anda dapat memilih opsi "Pendaftaran Tim Korporasi" di form atau menghubungi konsultan kami via WhatsApp.'
  },
  {
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung transfer bank resmi (BCA, Mandiri, BNI), QRIS instan, kartu kredit, dan penagihan Corporate Invoice (PO / Surat Perintah Kerja untuk pendaftaran perusahaan dengan termin pembayaran resmi).'
  }
];
