import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, CalendarCheck, ShieldCheck } from 'lucide-react';
import { RewardBadge } from '../types';
import { REWARD_BADGES } from '../data';
import { playClickSound } from '../utils/audio';

interface PialaScreenProps {
  unlockedList: string[];
  onBack: () => void;
}

export function PialaScreen({ unlockedList, onBack }: PialaScreenProps) {
  
  const handleBack = () => {
    playClickSound();
    onBack();
  };

  return (
    <div className="flex flex-col justify-between min-h-[85vh] max-w-md mx-auto p-5 select-none font-quicksand pb-2 text-center">
      <div className="space-y-6">
        
        {/* Back navigation and header */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-brand-surface-lowest border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-brand-primary font-bold shadow-sm cursor-pointer"
          >
            ←
          </button>
          <h2 className="text-xl font-bold text-brand-primary">Lembah Piala</h2>
        </div>

        {/* Hero Section */}
        <div className="text-center">
          <span className="text-5xl">🏆</span>
          <h1 className="text-2xl font-black text-brand-on-surface mt-3">
            Piala Dokter Kecil
          </h1>
          <p className="text-xs font-semibold text-neutral-400 mt-1 max-w-xs mx-auto">
            Selesaikan tantangan di klinik untuk melengkapi koleksi bintang lencana medalmu!
          </p>
        </div>

        {/* Grid display of all standard reward medals */}
        <div className="grid grid-cols-2 gap-4">
          {REWARD_BADGES.map((badge, idx) => {
            const isUnlocked = unlockedList.includes(badge.id);
            
            return (
              <motion.div
                key={badge.id}
                whileHover={isUnlocked ? { scale: 1.04, rotate: [0, -3, 3, 0] } : {}}
                className={`p-4 rounded-3xl border-2 transition-all relative flex flex-col items-center justify-between min-h-[160px] text-center ${
                  isUnlocked
                    ? 'bg-brand-surface-lowest border-amber-300 shadow-md'
                    : 'bg-neutral-100/75 border-neutral-200/60 opacity-60'
                }`}
              >
                {/* Visual Circle frame holding badging iconography */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3.5xl ${
                  isUnlocked
                    ? 'bg-amber-100 border border-amber-300 animate-pulse'
                    : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {isUnlocked ? badge.icon : '🔒'}
                </div>

                {/* Badge typography labels */}
                <div className="mt-2.5">
                  <h3 className="text-sm font-extrabold text-brand-on-surface leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-neutral-400 mt-0.5 leading-snug max-w-[120px] mx-auto">
                    {badge.description}
                  </p>
                </div>

                {/* Locked vs Unlocked status pill */}
                <div className="mt-3.5 w-full">
                  {isUnlocked ? (
                    <span className="bg-amber-500 text-white font-bold py-0.5 px-3 rounded-full text-[9px] uppercase tracking-wider block">
                      🏅 Dibuka!
                    </span>
                  ) : (
                    <span className="bg-neutral-200 text-neutral-500 font-bold py-0.5 px-3 rounded-full text-[9px] uppercase tracking-wider block">
                      Belum Terbuka
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Doctor oath summary trivia at the bottom */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-left flex items-start gap-3 mt-4">
          <div className="p-2 bg-emerald-500 text-white rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Janji Dokter Cilik 📜</p>
            <p className="text-[11px] font-semibold text-emerald-950/80 mt-0.5 leading-relaxed">
              "Aku berjanji akan rajin mencuci tangan, sikat gigi sebelum tidur, makan buah segar, dan rajin berolahraga agar tumbuh sehat & hebat!"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
