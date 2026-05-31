import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Award, Sparkles, Volume2, ArrowLeft } from 'lucide-react';
import { ScreenType, Patient, UserProfile } from './types';
import { INITIAL_PATIENTS, REWARD_BADGES } from './data';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DoctorIntroScreen } from './components/DoctorIntroScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { PatientSelectionScreen } from './components/PatientSelectionScreen';
import { ExamScreen } from './components/ExamScreen';
import { MiniQuizScreen } from './components/MiniQuizScreen';
import { PialaScreen } from './components/PialaScreen';
import { playClickSound, playSuccessSound } from './utils/audio';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('welcome');
  const [userName, setUserName] = useState('');
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(450);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientsCheckedToday, setPatientsCheckedToday] = useState(0);
  
  // Track unlocked reward IDs
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  
  // Confetti celebration state triggers
  const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);
  const [earnedBadgeName, setEarnedBadgeName] = useState<string | null>(null);

  // Sound selection toggle state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Start sequence
  const handleStartApp = (name: string) => {
    setUserName(name);
    setUnlockedBadges(['badge-welcome']);
    setScreen('doctor-intro');
  };

  // Skip or conclude introduction screen
  const handleCompleteIntro = () => {
    setUnlockedBadges((prev) => [...prev, 'badge-learn']);
    setScreen('dashboard');
  };

  // Add XP and level up if it passes 500
  const addXp = (amount: number, badgeId?: string) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      if (nextXp >= 500) {
        setLevel((l) => l + 1);
        setShowLevelUpAlert(true);
        playSuccessSound();
        return nextXp - 500;
      }
      return nextXp;
    });

    if (badgeId && !unlockedBadges.includes(badgeId)) {
      setUnlockedBadges((prev) => [...prev, badgeId]);
      const badgeDetails = REWARD_BADGES.find((b) => b.id === badgeId);
      if (badgeDetails) {
        setEarnedBadgeName(badgeDetails.title);
        setTimeout(() => setEarnedBadgeName(null), 4000);
      }
    }
  };

  // Checkup is completed for a patient
  const handleCompleteCheckup = (patientId: number, xpEarned: number, badgeId?: string) => {
    addXp(xpEarned, badgeId);
    
    // update state of checked patient to Healthy
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status: 'healthy' } : p))
    );
    
    setPatientsCheckedToday((prev) => Math.min(prev + 1, 5));
    setScreen('dashboard');
    setSelectedPatient(null);
  };

  // Complete the Mini Quiz
  const handleCompleteQuiz = (xpEarned: number, badgeId?: string) => {
    addXp(xpEarned, badgeId);
    setScreen('dashboard');
  };

  // Navigation handlers for global tabs
  const handleTabClick = (targetTab: 'beranda' | 'belajar' | 'piala') => {
    playClickSound();
    if (screen === 'welcome') return; // Cannot navigate from lockscreen
    
    if (targetTab === 'beranda') {
      setScreen('dashboard');
    } else if (targetTab === 'belajar') {
      setScreen('doctor-intro');
    } else if (targetTab === 'piala') {
      setScreen('piala');
    }
  };

  // Render components according to active state context
  const renderActiveScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStartApp} />;
      
      case 'doctor-intro':
        return <DoctorIntroScreen onNext={handleCompleteIntro} userName={userName} />;
      
      case 'dashboard':
        return (
          <DashboardScreen
            userName={userName}
            level={level}
            xp={xp}
            patientsCheckedToday={patientsCheckedToday}
            totalPatients={patients.length}
            onNavigateTo={(target) => {
              if (target === 'patient-selection') setScreen('patient-selection');
              if (target === 'mini-quiz') setScreen('mini-quiz');
              if (target === 'piala') setScreen('piala');
            }}
            onNavigateToBeranda={() => setScreen('dashboard')}
          />
        );
      
      case 'patient-selection':
        return (
          <PatientSelectionScreen
            patients={patients}
            onSelectPatient={(p) => {
              setSelectedPatient(p);
              setScreen('exam');
            }}
            onBack={() => setScreen('dashboard')}
          />
        );
      
      case 'exam':
        if (!selectedPatient) return null;
        return (
          <ExamScreen
            patient={selectedPatient}
            onCompleteCheckup={handleCompleteCheckup}
            onBack={() => setScreen('patient-selection')}
          />
        );
      
      case 'mini-quiz':
        return (
          <MiniQuizScreen
            userName={userName}
            onCompleteQuiz={handleCompleteQuiz}
            onBack={() => setScreen('dashboard')}
          />
        );
      
      case 'piala':
        return (
          <PialaScreen
            unlockedList={unlockedBadges}
            onBack={() => setScreen('dashboard')}
          />
        );
      
      default:
        return <WelcomeScreen onStart={handleStartApp} />;
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-linear-to-b from-brand-surface-low to-sky-100 flex items-center justify-center p-0 sm:p-6 select-none relative overflow-x-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-secondary-container/25 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Medical Tablet Mockup frame wrapper */}
      <div id="tablet-mockup-frame" className="w-full max-w-md bg-brand-bg md:bg-brand-bg rounded-none sm:rounded-[3rem] shadow-none sm:shadow-2xl border-0 sm:border-[12px] border-white overflow-hidden flex flex-col justify-between min-h-[96vh] sm:min-h-[85vh] relative bg-slate-50">
        
        {/* Playful mini glass speaker or header bar */}
        <div className="bg-brand-surface-low/60 border-b border-brand-primary/5 py-3 px-6 flex items-center justify-between text-xs font-semibold shrink-0">
          <span className="flex items-center gap-1 text-slate-500">
            🏥 <strong>Dinas Kesehatan Cilik</strong>
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#81dc5a] animate-pulse" />
            <span className="text-brand-primary font-bold">Online</span>
          </div>
        </div>

        {/* Global Alert Notification on Unlocking New Reward Badge */}
        <AnimatePresence>
          {earnedBadgeName && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 10, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              className="absolute top-14 left-4 right-4 bg-linear-to-r from-amber-400 to-amber-500 text-white rounded-2xl py-3 px-4.5 shadow-xl font-bold flex items-center gap-3 z-50 text-xs text-left"
            >
              <div className="bg-white/20 p-2 rounded-xl text-lg animate-bounce">
                🏅
              </div>
              <div>
                <p className="text-white/80 font-semibold uppercase">Lencana Baru Dibuka!</p>
                <p className="text-white font-black text-sm">Capaian: {earnedBadgeName} ✨</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Level Up Modal Overlay pop */}
        <AnimatePresence>
          {showLevelUpAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLevelUpAlert(false)}
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-6 z-50 pointer-events-auto"
            >
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-3xl p-6 text-center max-w-xs shadow-2xl space-y-4 border-2 border-brand-primary"
              >
                <span className="text-5xl animate-bounce">⚡</span>
                <h3 className="text-2xl font-black text-brand-primary">Level Up!</h3>
                <p className="text-sm font-semibold text-neutral-500">
                  Selamat! Kompetensi penanganan medis klinik anak-mu meningkat demi menolong banyak jiwa!
                </p>
                <div className="bg-brand-surface-low border border-brand-primary/15 py-1.5 px-4 rounded-full text-brand-primary font-bold inline-block text-xs uppercase tracking-wider">
                  Level {level} Tercapai 🎉
                </div>
                <button
                  onClick={() => setShowLevelUpAlert(false)}
                  className="w-full bg-[#00658c] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-sm hover:opacity-90"
                >
                  Hebat, Lanjutkan!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main interactive viewport container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative min-h-[70vh]">
          {renderActiveScreen()}
        </div>

        {/* Dynamic bottom tabs (Hidden on welcome gate screen for strict UX flow consistency) */}
        {screen !== 'welcome' && (
          <div className="bg-brand-surface-lowest border-t border-neutral-100 py-3.5 px-6 flex justify-around shrink-0 shadow-inner rounded-t-[2.5rem] mt-auto">
            
            {/* Tab 1: Beranda */}
            <button
              onClick={() => handleTabClick('beranda')}
              className={`flex flex-col items-center gap-1 group text-xs font-bold outline-none cursor-pointer ${
                screen === 'dashboard' || screen === 'patient-selection' || screen === 'exam'
                  ? 'text-brand-primary'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${
                screen === 'dashboard' || screen === 'patient-selection' || screen === 'exam'
                  ? 'bg-brand-primary/10'
                  : 'group-hover:bg-neutral-50'
              }`}>
                <Home className="w-5 h-5" />
              </div>
              <span>Beranda</span>
            </button>

            {/* Tab 2: Belajar */}
            <button
              onClick={() => handleTabClick('belajar')}
              className={`flex flex-col items-center gap-1 group text-xs font-bold outline-none cursor-pointer ${
                screen === 'doctor-intro'
                  ? 'text-brand-primary'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${
                screen === 'doctor-intro'
                  ? 'bg-brand-primary/10'
                  : 'group-hover:bg-neutral-50'
              }`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <span>Belajar</span>
            </button>

            {/* Tab 3: Piala */}
            <button
              onClick={() => handleTabClick('piala')}
              className={`flex flex-col items-center gap-1 group text-xs font-bold outline-none cursor-pointer ${
                screen === 'piala' || screen === 'mini-quiz'
                  ? 'text-brand-primary'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${
                screen === 'piala' || screen === 'mini-quiz'
                  ? 'bg-brand-primary/10'
                  : 'group-hover:bg-neutral-50'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <span>Piala</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
