import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, UserCheck, Lock, Volume2, Loader } from 'lucide-react';
import { Patient } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface PatientSelectionScreenProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onBack: () => void;
}

export function PatientSelectionScreen({
  patients,
  onSelectPatient,
  onBack,
}: PatientSelectionScreenProps) {
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [isPlayingInstruction, setIsPlayingInstruction] = useState(false);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const instructionAudioRef = useRef<HTMLAudioElement>(null);
  
  const handleSelect = (patient: Patient) => {
    if (patient.status === 'healthy') {
      playClickSound();
      return; // Patient is already healthy
    }
    playSuccessSound();
    onSelectPatient(patient);
  };

  const playRoomAudio = (roomNumber: number) => {
    playClickSound();
    const audioElement = audioRefs.current[roomNumber];
    if (audioElement) {
      setPlayingAudioId(roomNumber);
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {
        setPlayingAudioId(null);
      });
    }
  };

  const playInstructionAudio = () => {
    playClickSound();
    if (instructionAudioRef.current) {
      setIsPlayingInstruction(true);
      instructionAudioRef.current.currentTime = 0;
      instructionAudioRef.current.play().catch(() => {
        setIsPlayingInstruction(false);
      });
    }
  };

  const handleBack = () => {
    playClickSound();
    onBack();
  };

  return (
    <div className="flex flex-col justify-between min-h-[85vh] max-w-md mx-auto p-5 select-none font-quicksand pb-2 text-center">
      <div className="space-y-6">
        
        {/* Back and Title bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-brand-surface-lowest border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-brand-primary font-bold shadow-sm cursor-pointer"
          >
            ←
          </button>
          <h2 className="text-xl font-bold text-brand-primary">Pilih Ruang Klinik</h2>
        </div>

        {/* Headline */}
        <div className="text-left">
          <div className="flex items-start gap-2 mb-1">
            <h1 className="text-2xl font-bold text-brand-on-surface flex-1">
              Pilih Ruang Pasien
            </h1>
            <button
              onClick={playInstructionAudio}
              disabled={isPlayingInstruction}
              className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 shrink-0 transition-all"
              title="Dengarkan instruksi"
            >
              {isPlayingInstruction ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-sm font-semibold text-neutral-400 mt-1">
            Ada teman cilik yang sedang tidak enak badan dan butuh bantuanmu!
          </p>
        </div>

        {/* Room Grid selection - 2 columns for 6 patients */}
        <div className="grid grid-cols-2 gap-4">
          {patients.map((patient) => {
            const isSick = patient.status === 'sick';
            
            return (
              <motion.div
                key={patient.id}
                whileHover={isSick ? { scale: 1.05, y: -3 } : {}}
                whileTap={isSick ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(patient)}
                className={`relative p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between min-h-[160px] shadow-sm transition-all ${
                  isSick
                    ? 'bg-brand-surface-lowest hover:border-brand-primary border-brand-primary/20 hover:shadow-md cursor-pointer'
                    : 'bg-neutral-100 border-neutral-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Visual badge */}
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-neutral-200/50 flex items-center justify-center font-bold text-brand-primary text-lg">
                  🚪
                </div>

                {/* Room and Patient info */}
                <div className="mt-2 w-full">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                    Ruang {patient.roomNumber}
                  </p>
                  <h3 className="text-sm font-bold text-brand-on-surface mt-1">
                    {patient.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-neutral-400 mt-0.5">
                    {patient.age}
                  </p>
                </div>

                {/* Status badge */}
                <div className="mt-2 w-full">
                  {isSick ? (
                    <div className="bg-orange-50 border border-orange-200 text-orange-700 py-0.5 px-2 rounded-full text-[9px] font-bold">
                      🤒 Butuh Dokter
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 py-0.5 px-2 rounded-full text-[9px] font-bold flex items-center justify-center gap-0.5">
                      <UserCheck className="w-2.5 h-2.5" /> Sehat
                    </div>
                  )}
                </div>

                {/* Audio button for sick patients */}
                {isSick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playRoomAudio(patient.roomNumber);
                    }}
                    disabled={playingAudioId === patient.roomNumber}
                    className="mt-2 p-1.5 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 transition-all"
                    title="Dengarkan gejala"
                  >
                    {playingAudioId === patient.roomNumber ? (
                      <Loader className="w-3 h-3 animate-spin" />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Detailed case board preview - DISABLED */}
        {/* <div className="bg-blue-50/50 border border-brand-primary/10 rounded-2xl p-4.5 text-left space-y-2 mt-4">
          <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">Pemberitahuan Klinik 🔔</p>
          <div className="space-y-1.5 text-xs font-semibold text-brand-on-surface/80">
            {patients.filter(p => p.status === 'sick').map(p => (
              <p key={p.id}>🩺 <strong>{p.name}</strong>: {p.symptom}</p>
            ))}
          </div>
        </div> */}

      </div>

      {/* Hidden Audio Elements for each room */}
      {patients.map((patient) => (
        <audio
          key={`room-audio-${patient.roomNumber}`}
          ref={(el) => {
            if (el) audioRefs.current[patient.roomNumber] = el;
          }}
          src={`/assets/audio/patient-ruang-${patient.roomNumber}.mp3`}
          onEnded={() => setPlayingAudioId(null)}
        />
      ))}

      {/* Instruction/Headline Audio Element */}
      <audio
        ref={instructionAudioRef}
        src="/assets/audio/patient-selection-instruction.mp3"
        onEnded={() => setIsPlayingInstruction(false)}
      />
    </div>
  );
}
