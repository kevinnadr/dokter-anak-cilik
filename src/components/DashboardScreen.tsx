import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Lock, LockOpen, Volume2, Loader } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/audio';

// Micro-avatar generated for Budi
import boyDoctorAvatar from '../assets/images/boy_doctor_avatar_1780110824805.png';

interface DashboardScreenProps {
  userName: string;
  level: number;
  xp: number;
  patientsCheckedToday: number;
  totalPatients: number;
  onNavigateTo: (screenName: 'patient-selection' | 'mini-quiz' | 'piala' | 'doctor-intro') => void;
  onNavigateToBeranda: () => void;
}

export function DashboardScreen({
  userName,
  level,
  xp,
  patientsCheckedToday,
  totalPatients,
  onNavigateTo,
  onNavigateToBeranda,
}: DashboardScreenProps) {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  
  const allPatientsExamined = patientsCheckedToday >= totalPatients && totalPatients > 0;
  
  const xpMax = 500;
  const xpPercentage = Math.min((xp / xpMax) * 100, 100);

  const handleAction = (screen: 'patient-selection' | 'mini-quiz' | 'piala' | 'doctor-intro') => {
    playSuccessSound();
    onNavigateTo(screen);
  };

  const playCardAudio = (cardId: string) => {
    playClickSound();
    const audioElement = audioRefs.current[cardId];
    if (audioElement) {
      setPlayingAudioId(cardId);
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {
        setPlayingAudioId(null);
      });
    }
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
            className="bg-brand-surface-lowest hover:bg-neutral-50/50 border border-neutral-200/80 rounded-3xl p-5 shadow-xs cursor-pointer flex items-center justify-between gap-3 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 text-left flex-1">
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
            
            {/* Audio Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playCardAudio('periksa-pasien');
              }}
              disabled={playingAudioId === 'periksa-pasien'}
              className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 shrink-0 transition-all"
              title="Dengarkan deskripsi"
            >
              {playingAudioId === 'periksa-pasien' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            
            {/* Watermark Cross Icon background offset */}
            <div className="text-5xl opacity-5 text-neutral-900 select-none pointer-events-none font-bold">
              +
            </div>
          </motion.div>

          {/* Card 2: Mini Quiz */}
          <motion.div
            whileHover={allPatientsExamined ? { scale: 1.01, y: -2 } : {}}
            onClick={() => allPatientsExamined && handleAction('mini-quiz')}
            className={`rounded-3xl p-5 shadow-xs flex items-center justify-between gap-3 transition-all group relative overflow-hidden ${
              allPatientsExamined
                ? 'bg-brand-surface-lowest hover:bg-neutral-50/50 border border-neutral-200/80 cursor-pointer'
                : 'bg-neutral-100 border border-neutral-200/50 cursor-not-allowed opacity-70'
            }`}
          >
            <div className="flex items-center gap-4 text-left flex-1">
              <div className="p-4 bg-amber-100 rounded-2xl text-amber-500 relative">
                ⭐
                {!allPatientsExamined && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-bold leading-snug transition-colors ${
                    allPatientsExamined
                      ? 'text-brand-on-surface group-hover:text-amber-500'
                      : 'text-neutral-500'
                  }`}>
                    Mini Quiz
                  </h3>
                  {!allPatientsExamined && (
                    <Lock className="w-4 h-4 text-neutral-400" />
                  )}
                </div>
                <p className={`text-xs font-semibold mt-1 ${
                  allPatientsExamined
                    ? 'text-neutral-400'
                    : 'text-neutral-500'
                }`}>
                  {allPatientsExamined
                    ? 'Uji pengetahuanmu dan dapatkan piala emas!'
                    : `Selesaikan ${totalPatients - patientsCheckedToday} pasien lagi untuk membuka`}
                </p>
              </div>
            </div>
            
            {/* Audio Play Button */}
            {allPatientsExamined && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playCardAudio('mini-quiz');
                }}
                disabled={playingAudioId === 'mini-quiz'}
                className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 shrink-0 transition-all"
                title="Dengarkan deskripsi"
              >
                {playingAudioId === 'mini-quiz' ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
            
            <div className="text-4xl opacity-5 text-neutral-900 select-none pointer-events-none font-bold">
              ?
            </div>
          </motion.div>


        </div>
      </div>
      
      {/* Hidden Audio Elements */}
      <audio
        ref={(el) => {
          if (el) audioRefs.current['periksa-pasien'] = el;
        }}
        src="/assets/audio/dashboard-periksa-pasien.mp3"
        onEnded={() => setPlayingAudioId(null)}
      />
      <audio
        ref={(el) => {
          if (el) audioRefs.current['mini-quiz'] = el;
        }}
        src="/assets/audio/dashboard-mini-quiz.mp3"
        onEnded={() => setPlayingAudioId(null)}
      />
    </div>
  );
}
