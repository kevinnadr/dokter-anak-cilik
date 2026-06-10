import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Lightbulb, Volume2, Loader } from 'lucide-react';
import { TRIVIA_TIPS } from '../data';
import { playClickSound, playSuccessSound } from '../utils/audio';

// Dynamic boy doctor avatar route
import boyDoctorAvatar from '../assets/video/welkam.mp4';
import greetingAudio from '../assets/audio/welkamfix.mp3';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [errorHighlight, setErrorHighlight] = useState(false);
  const [isPlayingGreeting, setIsPlayingGreeting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Rotate tips every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TRIVIA_TIPS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    if (!name.trim()) {
      playClickSound();
      setErrorHighlight(true);
      setTimeout(() => setErrorHighlight(false), 800);
      return;
    }
    playSuccessSound();
    onStart(name.trim());
  };

  const cycleTip = () => {
    playClickSound();
    setTipIndex((prev) => (prev + 1) % TRIVIA_TIPS.length);
  };

  const playGreetingAudio = () => {
    playClickSound();
    if (audioRef.current) {
      setIsPlayingGreeting(true);
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        setIsPlayingGreeting(false);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-md mx-auto p-4 pt-8 select-none font-quicksand text-center space-y-4">
      {/* Decorative top blobs and image container */}
      <div className="relative w-full flex justify-center mt-2">
        {/* Playful organic backdrop blobs */}
        <div className="absolute top-0 right-10 w-20 h-20 bg-brand-secondary-container/50 rounded-full blur-xl -z-10 animate-pulse" />
        <div className="absolute top-12 left-10 w-16 h-16 bg-brand-primary-container/40 rounded-full blur-xl -z-10" />

        {/* Doctor Icon frame - tactile shadow & rounded look */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="relative w-52 h-52 md:w-60 md:h-60 rounded-[2rem] bg-brand-surface-lowest overflow-hidden border-4 border-brand-surface-low shadow-xl"
        >
          <video
            src={boyDoctorAvatar}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </div>

      {/* Hero Welcome Greetings */}
      <div className="space-y-1 relative">
        <div className="flex items-center justify-center gap-3">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-brand-primary"
          >
            Halo Dokter Kecil!
          </motion.h1>
          
          <motion.button
            onClick={playGreetingAudio}
            disabled={isPlayingGreeting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 disabled:cursor-not-allowed shadow-md transition-all"
            title="Dengarkan sapaan"
          >
            {isPlayingGreeting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </motion.button>
        </div>
        
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-brand-on-surface/80 text-sm md:text-base font-medium max-w-xs mx-auto leading-snug"
        >
          Aku temanmu hari ini! Boleh aku tahu namamu? Yuk, ketik namamu di bawah ini ya!
        </motion.p>
      </div>

      {/* Input Field and Action Button */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-3 px-2"
      >
        {/* Name input with custom focus state */}
        <div className={`relative flex items-center bg-brand-surface-lowest rounded-2xl border-2 transition-all duration-300 shadow-sm ${
          errorHighlight ? 'border-red-500 bg-red-50 scale-102 shake-animation' : 'border-neutral-200 focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10'
        }`}>
          <div className="pl-4 text-brand-primary">
            <User className="w-5 h-5" />
          </div>
          <input
            id="input-name"
            type="text"
            placeholder="Siapa namamu?"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorHighlight) setErrorHighlight(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleStart();
            }}
            className="w-full py-3 px-3 text-base font-semibold bg-transparent border-none outline-none text-brand-on-surface placeholder:text-neutral-400"
          />
        </div>

        {/* Tactile 3D Action Button */}
        <motion.button
          id="btn-ayo-mulai"
          onClick={handleStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98, y: 2 }}
          className="w-full bg-brand-primary text-white font-bold text-lg py-3 px-6 rounded-2xl shadow-lg border-b-4 border-[#004d6c] active:border-b-0 cursor-pointer flex items-center justify-center gap-2"
        >
          Ayo Mulai! 🚀
        </motion.button>

        <p className="text-[11px] font-semibold text-neutral-400">
          Gratis & Menyenangkan untuk Semua Anak
        </p>
      </motion.div>

      {/* Bottom Educational Trivia Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={cycleTip}
        className="w-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-2xl p-3 flex items-start gap-3 shadow-sm cursor-pointer transition-colors relative overflow-hidden group"
      >
        <div className="p-2.5 bg-amber-400/25 rounded-xl text-amber-600 shrink-0">
          <Lightbulb className="w-6 h-6 animate-bounce" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Tips Sehat Hari Ini</p>
          <p className="text-sm font-semibold text-amber-900 mt-0.5 leading-snug">
            {TRIVIA_TIPS[tipIndex]}
          </p>
          <p className="text-[10px] text-amber-600 mt-1 font-medium transition-opacity group-hover:opacity-100">
            Klik untuk tips lainnya! 💡
          </p>
        </div>
        
        {/* Subtle decorative shining dot */}
        <div className="absolute right-0 bottom-0 w-8 h-8 rounded-full bg-amber-200/20 blur-md pointer-events-none" />
      </motion.div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={greetingAudio}
        onEnded={() => setIsPlayingGreeting(false)}
      />
    </div>
  );
}
