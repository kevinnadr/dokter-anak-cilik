import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Thermometer, ShieldAlert, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/audio';

// Dynamic female doctor avatar route
import femaleDoctorAvatar from '../assets/images/female_doctor_avatar_1780110850688.png';

interface DoctorIntroScreenProps {
  onNext: () => void;
  userName?: string;
}

export function DoctorIntroScreen({ onNext, userName }: DoctorIntroScreenProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Cards with details of doctor tools
  const introCards = [
    {
      id: 1,
      title: 'Periksa Jantung',
      description: "Dokter menggunakan stetoskop untuk mendengarkan detak jantungmu yang hebat! 'Dag-dig-dug!'",
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-100" />,
      colorClass: 'border-rose-200 bg-rose-50 hover:bg-rose-100/50',
      activeColor: 'ring-rose-300 border-rose-400 bg-rose-50',
      tagline: "Detak jantung sehatmu menyanyi gembira!"
    },
    {
      id: 2,
      title: 'Cek Suhu Tubuh',
      description: 'Termometer membantu dokter tahu apakah tubuhmu sedang butuh istirahat hangat atau siap bermain lari-larian.',
      icon: <Thermometer className="w-6 h-6 text-cyan-500" />,
      colorClass: 'border-cyan-200 bg-cyan-50 hover:bg-cyan-100/50',
      activeColor: 'ring-cyan-300 border-cyan-400 bg-cyan-50',
      tagline: 'Suhu normal itu dingin segar seperti semangka!'
    },
    {
      id: 3,
      title: 'Teman Kesehatanmu',
      description: 'Dokter bukan orang yang menakutkan. Kami adalah tim rhasiamu untuk melawan kuman jahat!',
      icon: <ShieldAlert className="w-6 h-6 text-emerald-500 fill-emerald-100" />,
      colorClass: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100/50',
      activeColor: 'ring-emerald-300 border-emerald-400 bg-emerald-50',
      tagline: 'Persahabatan sehat tanpa rasa takut!'
    }
  ];

  const handleCardClick = (id: number) => {
    playClickSound();
    setActiveCard(id === activeCard ? null : id);
  };

  const handleNext = () => {
    playSuccessSound();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[92vh] max-w-md mx-auto p-5 select-none font-quicksand pb-2">
      
      {/* Top Female Doctor Avatar Illustration */}
      <div className="relative w-full flex flex-col items-center pt-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-48 h-48 rounded-full border-4 border-brand-primary/20 bg-cyan-100 overflow-hidden shadow-md"
        >
          <img
            src={femaleDoctorAvatar}
            alt="Dokter Anak Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Floating audio speaker suggestion for narrative hook */}
        <div className="absolute right-10 top-10 bg-brand-surface-lowest text-brand-primary p-2 rounded-full shadow-md border border-neutral-100 hover:scale-110 cursor-pointer">
          📢
        </div>
      </div>

      {/* Narrative Dialogue Coach Spec Bubble */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full relative bg-brand-surface-lowest rounded-3xl p-5 border border-brand-primary/10 shadow-sm mt-3"
      >
        {/* Quote Bubble arrow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-brand-surface-lowest border-t border-l border-brand-primary/10" />
        
        <h3 className="text-xl font-bold text-brand-primary text-center">
          Halo, Dokter {userName || 'Anak'}!
        </h3>
        <p className="text-brand-on-surface/90 text-sm md:text-base font-semibold text-center mt-2 leading-relaxed">
          Aku dokter (doktr asli) ! Disini aku bakalan ngenalin ke kamu tentang profesi dokter anak. Yuk, kenalan lebih dekat dengan profesi dokter anak! Tekan kartu-kartu di bawah ini untuk tahu lebih banyak ya!
        </p>
      </motion.div>

      {/* Tool Cards list */}
      <div className="w-full space-y-3 mt-4">
        {introCards.map((card, idx) => {
          const isActive = activeCard === card.id;
          return (
            <motion.div
              key={card.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => handleCardClick(card.id)}
              className={`rounded-2xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-300 relative ${
                isActive ? card.activeColor + ' ring-4' : card.colorClass
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-brand-surface-lowest rounded-xl shadow-inner shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-base font-bold text-brand-on-surface">
                    {card.title}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-500 mt-1 leading-normal">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Show funny fun fact on active toggle */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-dashed border-neutral-300/60 text-left text-xs font-bold text-brand-primary flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                    <span>{card.tagline}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Progress & Lower Next Trigger */}
      <div className="w-full mt-6 space-y-4">
        {/* Soft rounded animated progress pill trail */}
        <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '40%' }}
            transition={{ duration: 1 }}
            className="h-full bg-brand-primary rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-container"
          />
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-brand-primary text-white font-bold text-lg py-3.5 px-6 rounded-2xl shadow-lg border-b-4 border-[#004d6c] active:border-b-0 cursor-pointer flex items-center justify-center gap-2 transition-all"
        >
          Lanjut <ArrowRight className="w-5 h-5" />
        </motion.button>
        
        <p className="text-xs font-bold text-neutral-400 text-center uppercase tracking-widest mt-1">
          Petualangan Belajar Dimulai!
        </p>
      </div>

    </div>
  );
}
