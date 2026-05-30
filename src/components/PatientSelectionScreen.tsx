import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, UserCheck, Lock } from 'lucide-react';
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
  
  const handleSelect = (patient: Patient) => {
    if (patient.status === 'healthy') {
      playClickSound();
      return; // Andy is already healthy
    }
    playSuccessSound();
    onSelectPatient(patient);
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
          <h1 className="text-2xl font-bold text-brand-on-surface">
            Pilih Ruang Pasien
          </h1>
          <p className="text-sm font-semibold text-neutral-400 mt-1">
            Ada teman cilik yang sedang tidak enak badan dan butuh bantuanmu!
          </p>
        </div>

        {/* Room Grid selection */}
        <div className="grid grid-cols-2 gap-4">
          {patients.map((patient, idx) => {
            const isSick = patient.status === 'sick';
            
            return (
              <motion.div
                key={patient.id}
                whileHover={isSick ? { scale: 1.03, y: -4 } : {}}
                whileTap={isSick ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(patient)}
                className={`relative p-5 rounded-3xl border-2 text-center flex flex-col items-center justify-between min-h-[190px] shadow-sm transition-all cursor-pointer ${
                  isSick
                    ? 'bg-brand-surface-lowest hover:border-brand-primary border-brand-primary/20 hover:shadow-md'
                    : 'bg-neutral-100 border-neutral-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Visual badge top */}
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-neutral-200/50 flex flex-col items-center justify-center font-bold text-brand-primary">
                  🚪
                </div>

                {/* Room title */}
                <div className="mt-3">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                    Ruang {patient.roomNumber}
                  </p>
                  <h3 className="text-base font-bold text-brand-on-surface mt-0.5">
                    Pasien: {patient.name}
                  </h3>
                </div>

                {/* Room status / symptom excerpt */}
                <div className="mt-4 w-full">
                  {isSick ? (
                    <div className="bg-orange-50 border border-orange-200 text-orange-700 py-1 px-2.5 rounded-full text-[11px] font-bold">
                      🤒 Butuh Dokter
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 py-1 px-2.5 rounded-full text-[11px] font-bold flex items-center justify-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Sehat/Kosong
                    </div>
                  )}
                </div>

                {/* Hover/Access instruction helper text on bottom */}
                {isSick && (
                  <span className="text-[10px] text-neutral-400 font-bold mt-2">
                    {patient.age} • Ketuk Masuk
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Detailed case board preview */}
        <div className="bg-blue-50/50 border border-brand-primary/10 rounded-2xl p-4.5 text-left space-y-2 mt-4">
          <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">Pemberitahuan Klinik 🔔</p>
          <div className="space-y-1.5 text-xs font-semibold text-brand-on-surface/80">
            {patients.filter(p => p.status === 'sick').map(p => (
              <p key={p.id}>🩺 <strong>{p.name}</strong>: {p.symptom}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
