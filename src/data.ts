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
    image: '👧',
    age: '6 Tahun',
    status: 'sick',
    symptom: 'Badan panas, lemas. Demam tinggi yang perlu diturunkan.',
    roomNumber: 1,
    requiredTools: ['thermometer'],
    results: {
      temperature: 38.5,
    },
  },
  {
    id: 2,
    name: 'Siti',
    image: '👧',
    age: '7 Tahun',
    status: 'sick',
    symptom: 'Batuk terus-menerus, tenggorokan gatal. Perlu pemeriksaan dada.',
    roomNumber: 2,
    requiredTools: ['stethoscope'],
    results: {
      heartRate: 92,
    },
  },
  {
    id: 3,
    name: 'Andi',
    image: '👦',
    age: '8 Tahun',
    status: 'sick',
    symptom: 'Hidung tersumbat, bersin-bersin. Pilek yang mengganggu.',
    roomNumber: 3,
    requiredTools: ['thermometer', 'otoscope'],
    results: {
      temperature: 37.2,
      earStatus: 'Normal',
    },
  },
  {
    id: 4,
    name: 'Rina',
    image: '👧',
    age: '7 Tahun',
    status: 'sick',
    symptom: 'Perut mual, buang air besar tidak normal. Diare yang perlu dicek.',
    roomNumber: 4,
    requiredTools: ['thermometer'],
    results: {
      temperature: 36.8,
    },
  },
  {
    id: 5,
    name: 'Dito',
    image: '👦',
    age: '9 Tahun',
    status: 'sick',
    symptom: 'Jadwal rutin vaksin. Imunisasi untuk melindungi dari penyakit berbahaya.',
    roomNumber: 5,
    requiredTools: ['sphygmomanometer', 'syringe'],
    results: {
      bloodPressure: '110/70',
      vaccineGiven: true,
    },
  },
  {
    id: 6,
    name: 'Bruno',
    image: '👦',
    age: '8 Tahun',
    status: 'sick',
    symptom: 'Tenggorokan sakit saat menelan. Radang yang perlu diperiksa dengan teliti.',
    roomNumber: 6,
    requiredTools: ['otoscope'],
    results: {
      throatStatus: 'Meradang',
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Dokter anak bekerja di rumah sakit, klinik, dan puskesmas.',
    options: [
      { key: 'Benar', text: 'Benar' },
      { key: 'Salah', text: 'Salah' },
    ],
    correctAnswer: 'Benar',
    explanation: 'Dokter anak tidak hanya ada di satu tempat saja, mereka tersebar di berbagai fasilitas kesehatan supaya semua anak bisa mudah mendapatkan pertolongan.',
    funFact: 'Di Indonesia ada ribuan puskesmas yang tersebar sampai ke pelosok desa, jadi anak-anak yang tinggal jauh dari kota pun tetap bisa ketemu dokter anak. Dokter anak sengaja ditempatkan di banyak tempat supaya tidak ada anak yang susah dapat pelayanan kesehatan.',
  },
  {
    id: 2,
    question: 'Termometer digunakan untuk memeriksa telinga.',
    options: [
      { key: 'Benar', text: 'Benar' },
      { key: 'Salah', text: 'Salah' },
    ],
    correctAnswer: 'Salah',
    explanation: 'Termometer hanya bisa mengukur panas badan, tidak bisa melihat ke dalam telinga. Makanya dokter pakai alat berbeda yaitu otoskop yang punya cahaya kecil untuk menerangi bagian dalam telinga.',
    funFact: 'Fakta menariknya, otoskop itu punya lampu kecil di ujungnya yang bisa menerangi bagian dalam telinga yang gelap. Dokter bisa melihat gendang telinga kamu dari luar tanpa harus menyentuhnya sama sekali!',
  },
  {
    id: 3,
    question: 'Dokter anak bisa mengobati anak yang terkena diare.',
    options: [
      { key: 'Benar', text: 'Benar' },
      { key: 'Salah', text: 'Salah' },
    ],
    correctAnswer: 'Benar',
    explanation: 'Diare membuat tubuh anak kehilangan banyak cairan dan bisa berbahaya, makanya dokter anak perlu menanganinya dengan cepat dan tepat.',
    funFact: 'Diare adalah salah satu penyebab kematian terbesar pada anak-anak di dunia. Dalam sehari tubuh bisa kehilangan banyak sekali cairan akibat diare, makanya dokter anak harus segera menanganinya sebelum tubuh kekurangan cairan.',
  },
  {
    id: 4,
    question: 'Di bawah ini yang bukan tempat dokter anak bekerja adalah...',
    options: [
      { key: 'A', text: 'Rumah sakit' },
      { key: 'B', text: 'Klinik' },
      { key: 'C', text: 'Mall' },
      { key: 'D', text: 'Puskesmas' },
    ],
    correctAnswer: 'C',
    explanation: 'Mall adalah tempat belanja dan hiburan, bukan tempat pelayanan kesehatan. Dokter anak butuh peralatan medis khusus yang hanya ada di fasilitas kesehatan.',
    funFact: 'Fakta menariknya, di beberapa negara maju seperti Amerika sudah mulai ada klinik kecil di dalam mall. Tapi tetap bukan tempat utama dokter anak bekerja karena peralatan medis lengkap tidak mungkin dipindahkan ke mall.',
  },
  {
    id: 5,
    question: 'Alat yang digunakan dokter untuk mengukur tekanan darah adalah...',
    options: [
      { key: 'A', text: 'Stetoskop' },
      { key: 'B', text: 'Termometer' },
      { key: 'C', text: 'Otoskop' },
      { key: 'D', text: 'Tensimeter' },
    ],
    correctAnswer: 'D',
    explanation: 'Tensimeter punya cara kerja khusus yaitu memompa manset di lengan untuk mengukur seberapa kuat darah mengalir di dalam tubuh.',
    funFact: 'Fakta menariknya, tekanan darah normal anak berbeda dengan orang dewasa. Tekanan darah anak jauh lebih rendah dan terus berubah seiring pertumbuhan, makanya dokter anak perlu rutin mengeceknya setiap kunjungan.',
  },
  {
    id: 6,
    question: 'Salah satu tugas dokter anak adalah...',
    options: [
      { key: 'A', text: 'Mencabut gigi' },
      { key: 'B', text: 'Operasi tulang' },
      { key: 'C', text: 'Memberikan vaksin' },
      { key: 'D', text: 'Operasi otak' },
    ],
    correctAnswer: 'C',
    explanation: 'Vaksin berisi zat khusus yang mengajarkan tubuh cara melawan penyakit tertentu sebelum penyakit itu datang menyerang.',
    funFact: 'Fakta menariknya, vaksin pertama di dunia ditemukan pada tahun 1796 oleh dokter bernama Edward Jenner untuk melawan penyakit cacar. Berkat vaksin, penyakit cacar berhasil diberantas total dari muka bumi pada tahun 1980!',
  },
  {
    id: 7,
    question: 'Dokter anak memberikan vaksin kepada anak-anak dengan tujuan...',
    options: [
      { key: 'A', text: 'Supaya anak cepat tinggi' },
      { key: 'B', text: 'Supaya tubuh terlindungi dari penyakit' },
      { key: 'C', text: 'Supaya anak tidak ngantuk' },
      { key: 'D', text: 'Supaya anak lebih pintar' },
    ],
    correctAnswer: 'B',
    explanation: 'Vaksin bukan obat penyembuh, tapi pencegah. Dengan vaksin, tubuh sudah siap duluan sebelum kuman berbahaya masuk.',
    funFact: 'Fakta menariknya, saat kamu divaksin tubuhmu sebenarnya sedang "berlatih perang" melawan penyakit. Vaksin mengajarkan sistem imun cara mengenali musuh, jadi kalau kuman aslinya datang, tubuh sudah tahu cara mengalahkannya.',
  },
  {
    id: 8,
    question: 'Alat yang digunakan dokter untuk memeriksa telinga disebut...',
    options: [
      { key: 'A', text: 'Stetoskop' },
      { key: 'B', text: 'Tensimeter' },
      { key: 'C', text: 'Termometer' },
      { key: 'D', text: 'Otoskop' },
    ],
    correctAnswer: 'D',
    explanation: 'Telinga letaknya di dalam dan gelap, jadi dokter butuh alat dengan lampu kecil seperti otoskop untuk bisa melihat dengan jelas kondisi di dalamnya.',
    funFact: 'Fakta menariknya, gendang telinga manusia itu sangat tipis, hanya sekitar 0,1 mm! Setipis selembar kertas. Makanya dokter harus pakai otoskop yang punya perbesaran khusus supaya bisa melihatnya dengan jelas.',
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
