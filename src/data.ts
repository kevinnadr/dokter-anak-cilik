import { QuizQuestion, Patient, RewardBadge } from './types';

export const TRIVIA_TIPS = [
  'Tahukah kamu? Mencuci tangan dengan sabun bisa mengusir kuman nakal dari jari-jarimu!',
  'Tahukah kamu? Wortel sangat baik untuk kesehatan mata kita karena kaya akan Vitamin A!',
  'Tahukah kamu? Tidur malam selama 9-10 jam membuat tubuhmu tumbuh tinggi dan kuat!',
  'Tahukah kamu? Minum air putih yang cukup membantu tubuh kita tetap segar saat bermain!',
  'Tahukah kamu? Buah apel bisa membantu gigimu tetap bersih dan kuat setelah digigit!',
  'Tahukah kamu? Tertawa gembira itu menyehatkan jantung dan membuat hari-harimu ceria!',
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Budi',
    image: '👦',
    age: '6 Tahun',
    status: 'sick',
    symptom: 'Kasus Batuk: Dada terasa sesak dan batuk berdahak.',
    roomNumber: 1,
    requiredTools: ['stethoscope'],
    results: {
      heartRate: 95,
    },
  },
  {
    id: 2,
    name: 'Siti',
    image: '👧',
    age: '5 Tahun',
    status: 'sick',
    symptom: 'Kasus Pilek: Hidung tersumbat dan badan terasa hangat.',
    roomNumber: 2,
    requiredTools: ['thermometer', 'otoscope'],
    results: {
      temperature: 37.8,
      earStatus: 'Kotor',
    },
  },
  {
    id: 3,
    name: 'Andi',
    image: '👦',
    age: '7 Tahun',
    status: 'sick',
    symptom: 'Kasus Demam: Badan sangat panas setelah main hujan.',
    roomNumber: 3,
    requiredTools: ['thermometer'],
    results: {
      temperature: 39.1,
    },
  },
  {
    id: 4,
    name: 'Rina',
    image: '👧',
    age: '6 Tahun',
    status: 'sick',
    symptom: 'Kasus Radang: Tenggorokan sakit saat menelan makanan.',
    roomNumber: 4,
    requiredTools: ['otoscope'],
    results: {
      throatStatus: 'Meradang',
    },
  },
  {
    id: 5,
    name: 'Dito',
    image: '👦',
    age: '5 Tahun',
    status: 'sick',
    symptom: 'Kasus Vaksin: Jadwal imunisasi rutin agar kebal penyakit.',
    roomNumber: 5,
    requiredTools: ['sphygmomanometer', 'syringe'],
    results: {
      bloodPressure: '110/70',
      vaccineGiven: true,
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berapa kali kita harus menyikat gigi dalam sehari?',
    options: [
      { key: 'A', text: 'Hanya saat mandi pagi' },
      { key: 'B', text: 'Pagi setelah sarapan dan malam sebelum tidur' },
      { key: 'C', text: 'Seminggu sekali saja' },
    ],
    correctAnswer: 'B',
    explanation: 'Sikat gigi minimal 2 kali sehari menjaga gigimu tetap bersih dan mengusir kuman makanan!',
    funFact: 'Menyikat gigi sebelum tidur sangat krusial karena kuman lebih aktif saat mulut kita diam di malam hari.',
  },
  {
    id: 2,
    question: 'Sebelum makan, apa langkah kebersihan paling penting yang harus dilakukan?',
    options: [
      { key: 'A', text: 'Mencuci tangan dengan sabun dan air mengalir' },
      { key: 'B', text: 'Langsung makan saja' },
      { key: 'C', text: 'Mengelap tangan ke celana' },
    ],
    correctAnswer: 'A',
    explanation: 'Mencuci tangan dengan sabun membunuh kuman penyebab sakit perut!',
    funFact: 'Kuman di tangan kita bisa berpindah ke makanan jika kita lupa cuci tangan pakai sabun!',
  },
  {
    id: 3,
    question: 'Mana makanan yang memberikan energi paling sehat untuk tumbuh kuat?',
    options: [
      { key: 'A', text: 'Permen manis dan coklat berlebih' },
      { key: 'B', text: 'Sayuran hijau dan buah-buahan segar' },
      { key: 'C', text: 'Keripik asin pedas setiap hari' },
    ],
    correctAnswer: 'B',
    explanation: 'Buah dan sayur memiliki segudang vitamin yang membuat imun kamu kebal dari kuman.',
    funFact: 'Buah brokoli terlihat seperti pohon kecil bertenaga yang membawa vitamin pelindung tubuh!',
  },
  {
    id: 4,
    question: 'Mengapa kita harus tidur malam yang cukup (9-10 jam)?',
    options: [
      { key: 'A', text: 'Agar bisa mimpi bermain game seharian' },
      { key: 'B', text: 'Supaya tubuh punya waktu untuk memperbaiki diri, tumbuh, dan mengumpulkan energi' },
      { key: 'C', text: 'Hanya karena disuruh oleh ayah dan ibu saja' },
    ],
    correctAnswer: 'B',
    explanation: 'Saat kita tidur nyenyak, otak kita beristirahat dan sel-sel tubuh tumbuh lebih cepat.',
    funFact: 'Tidur nyenyak membuat ingatan kita lebih kuat sehingga kita jadi lebih pintar di sekolah!',
  },
  {
    id: 5,
    question: 'Benar atau Salah: Mandi pakai sabun itu tidak penting dan boleh dilewatkan.',
    options: [
      { key: 'Benar', text: 'Benar' },
      { key: 'Salah', text: 'Salah' },
    ],
    correctAnswer: 'Salah',
    explanation: 'Mandi pakai sabun sangat penting untuk menghilangkan kuman dan kotoran yang menempel di tubuh kita seharian.',
    funFact: 'Kulit kita melepaskan ribuan sel kulit mati setiap hari, dan sabun membantu membersihkannya!',
  },
  {
    id: 6,
    question: 'Benar atau Salah: Minum air putih yang banyak setiap hari sangat baik untuk kesehatan tubuh kita.',
    options: [
      { key: 'Benar', text: 'Benar' },
      { key: 'Salah', text: 'Salah' },
    ],
    correctAnswer: 'Benar',
    explanation: 'Air putih membantu tubuh tetap terhidrasi, melancarkan peredaran darah, dan membuat otak tetap fokus.',
    funFact: 'Tubuh kita terdiri dari sekitar 60% air, lho!',
  },
];

export const REWARD_BADGES: RewardBadge[] = [
  {
    id: 'badge-welcome',
    title: 'Dokter Kecil Baru',
    description: 'Berhasil mendaftarkan nama dan siap melakukan pemeriksaan.',
    icon: '🚀',
    unlockedAt: null,
  },
  {
    id: 'badge-learn',
    title: 'Sahabat Stetoskop',
    description: 'Selesai mempelajari semua materi dasar dokter anak.',
    icon: '🏥',
    unlockedAt: null,
  },
  {
    id: 'badge-heart',
    title: 'Pahlawan Jantung Sehat',
    description: 'Berhasil menguji detak jantung pasien pertamamu!',
    icon: '❤️',
    unlockedAt: null,
  },
  {
    id: 'badge-temp',
    title: 'Detektif Suhu Tubuh',
    description: 'Menggunakan termometer untuk mendeteksi suhu hangat pasien.',
    icon: '🌡️',
    unlockedAt: null,
  },
  {
    id: 'badge-patient-healed',
    title: 'Sembuh Sempurna',
    description: 'Berhasil merawat teman cilik di klinik hingga sehat.',
    icon: '🌈',
    unlockedAt: null,
  },
  {
    id: 'badge-quiz-master',
    title: 'Juara Pengetahuan Sehat',
    description: 'Menjawab kuis kesehatan dengan skor sempurna!',
    icon: '🏆',
    unlockedAt: null,
  },
];
