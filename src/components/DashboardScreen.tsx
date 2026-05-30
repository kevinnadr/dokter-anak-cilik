import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/audio';

// Micro-avatar generated for Budi
import boyDoctorAvatar from '../assets/images/boy_doctor_avatar_1780110824805.png';

interface DashboardScreenProps {
  userName: string;
  level: number;
  xp: number;
  patientsCheckedToday: number;
  onNavigateTo: (screenName: 'patient-selection' | 'mini-quiz' | 'piala' | 'doctor-intro') => void;
  onNavigateToBeranda: () => void;
}

export function DashboardScreen({
  userName,
  level,
  xp,
  patientsCheckedToday,
  onNavigateTo,
  onNavigateToBeranda,
}: DashboardScreenProps) {
  
  const xpMax = 500;
  const xpPercentage = Math.min((xp / xpMax) * 100, 100);

  const handleAction = (screen: 'patient-selection' | 'mini-quiz' | 'piala' | 'doctor-intro') => {
    playSuccessSound();
    onNavigateTo(screen);
  };

  return (
    <div className="flex flex-col justify-between min-h-[92vh] max-w-md mx-auto p-5 select-none font-quicksand pb-2">
      <div className="space-y-6">
        {/* Top Header Row with Name & Tiny Avatar representation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-14 h-14 rounded-full border-2 border-brand-primary/30 p-0.5 overflow-hidden bg-brand-surface-lowest shadow-sm"
            >
              <img
                src={boyDoctorAvatar}
                alt="Mini Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-brand-primary leading-tight">
                Halo, Dokter {userName}!
              </h2>
              <p className="text-xs font-bold text-neutral-400">
                Siap membantu pasien hari ini?
              </p>
            </div>
          </div>
          
          <button
            onClick={() => handleAction('piala')}
            className="w-10 h-10 bg-brand-surface-lowest border border-neutral-200/80 rounded-full flex items-center justify-center text-brand-tertiary shadow-sm text-lg hover:scale-105 active:scale-95"
          >
            ★
          </button>
        </div>

        {/* Level XP Progress Hub */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-surface-lowest border border-brand-primary/10 rounded-3xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between text-sm font-bold text-brand-on-surface">
            <span className="flex items-center gap-1.5 text-brand-primary font-bold">
              ✨ Level {level}: Dokter Hebat
            </span>
            <span className="text-neutral-400">
              {xp}/{xpMax} XP
            </span>
          </div>
          
          {/* Progress Bar with glowing neon cyan stripe look */}
          <div className="w-full h-5 bg-neutral-100 rounded-full mt-3 overflow-hidden p-0.5 border border-neutral-200/50">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-linear-to-r from-brand-primary to-cyan-400 rounded-full relative"
            >
              {/* Candystripe animated layout pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-pulse" />
            </motion.div>
          </div>
          
          <p className="text-[11px] font-semibold text-neutral-400 mt-2 text-right">
            Dapatkan XP dengan merawat pasien & kuis!
          </p>
        </motion.div>

        {/* Action Hub Cards (Examine and Quiz) */}
        <div className="space-y-4">
          
          {/* Card 1: Periksa Pasien */}
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            onClick={() => handleAction('patient-selection')}
            className="bg-brand-surface-lowest hover:bg-neutral-50/50 border border-neutral-200/80 rounded-3xl p-5 shadow-xs cursor-pointer flex items-center justify-between gap-4 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="p-4 bg-sky-100 rounded-2xl text-brand-primary">
                🏥
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-on-surface leading-snug group-hover:text-brand-primary transition-colors">
                  Periksa Pasien
                </h3>
                <p className="text-xs font-semibold text-neutral-400 mt-1">
                  Bantu teman-teman yang sedang sakit di klinik!
                </p>
              </div>
            </div>
            
            {/* Watermark Cross Icon background offset */}
            <div className="text-5xl opacity-5 text-neutral-900 select-none pointer-events-none font-bold mr-2">
              +
            </div>
          </motion.div>

          {/* Card 2: Mini Quiz */}
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            onClick={() => handleAction('mini-quiz')}
            className="bg-brand-surface-lowest hover:bg-neutral-50/50 border border-neutral-200/80 rounded-3xl p-5 shadow-xs cursor-pointer flex items-center justify-between gap-4 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="p-4 bg-amber-100 rounded-2xl text-amber-500">
                ⭐
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-on-surface leading-snug group-hover:text-amber-500 transition-colors">
                  Mini Quiz
                </h3>
                <p className="text-xs font-semibold text-neutral-400 mt-1">
                  Uji pengetahuanmu dan dapatkan piala emas!
                </p>
              </div>
            </div>
            
            <div className="text-4xl opacity-5 text-neutral-900 select-none pointer-events-none font-bold mr-2">
              ?
            </div>
          </motion.div>

          {/* Bento Box Green Card 3: Weekly Challenge */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-linear-to-b from-[#81dc5a] to-[#246d00] text-white rounded-3xl p-6 shadow-md text-left relative overflow-hidden"
          >
            {/* Soft decorative sun ray */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl text-white">
                <Calendar className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white leading-snug">
                  Tantangan Mingguan
                </h3>
                <p className="text-sm font-semibold text-white/90 mt-1 leading-normal max-w-xs">
                  Selesaikan 5 pemeriksaan untuk lencana spesial minggu ini!
                </p>
              </div>
            </div>

            {/* Sub progress bar */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold whitespace-nowrap">
                Progres: {patientsCheckedToday}/5 Sembuh
              </span>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-tertiary-container transition-all"
                  style={{ width: `${(patientsCheckedToday / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-5">
              <motion.button
                onClick={() => handleAction('patient-selection')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-brand-surface-lowest hover:bg-neutral-50 text-brand-secondary font-bold text-sm py-3 px-6 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1"
              >
                Mulai Sekarang 🚀
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
