import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Thermometer, ShieldCheck, HelpCircle, Sparkles, Volume2, Search, Activity, Pipette } from 'lucide-react';
import { Patient, ToolType } from '../types';
import { playClickSound, playHeartbeatSound, playSuccessSound, playCorrectSound, playIncorrectSound } from '../utils/audio';
import { FullBodyPatient } from './FullBodyPatient';

interface ExamScreenProps {
  patient: Patient;
  onCompleteCheckup: (patientId: number, xpEarned: number, badgeUnlockedId?: string) => void;
  onBack: () => void;
}

const TOOL_DETAILS = {
  stethoscope: { name: 'Stetoskop', icon: '🩺', desc: 'Stetoskop digunakan untuk mendengarkan detak jantung dan pernapasan paru-paru.' },
  thermometer: { name: 'Termometer', icon: '🌡️', desc: 'Termometer mengukur suhu tubuh untuk mengecek apakah pasien demam.' },
  otoscope: { name: 'Otoskop', icon: '🔦', desc: 'Otoskop adalah senter khusus untuk memeriksa kebersihan telinga dan radang tenggorokan.' },
  sphygmomanometer: { name: 'Tensimeter', icon: '🫀', desc: 'Tensimeter mengukur tekanan darah pasien untuk memastikan tubuhnya fit.' },
  syringe: { name: 'Suntikan', icon: '💉', desc: 'Suntikan memberikan cairan obat atau vaksin penting langsung ke dalam tubuh agar kebal.' },
};

const AVAILABLE_TOOLS: ToolType[] = ['stethoscope', 'thermometer', 'otoscope', 'sphygmomanometer', 'syringe'];

export function ExamScreen({ patient, onCompleteCheckup, onBack }: ExamScreenProps) {
  const [activeTool, setActiveTool] = useState<ToolType | 'none'>('none');
  const [showToolInfo, setShowToolInfo] = useState<ToolType | 'none'>('none');
  
  const [toolsDone, setToolsDone] = useState<Record<string, boolean>>({});
  const [toolsProgress, setToolsProgress] = useState<Record<string, number>>({});
  const [isScanning, setIsScanning] = useState<Record<string, boolean>>({});
  
  const [showWrongToolPopup, setShowWrongToolPopup] = useState<ToolType | null>(null);

  const [showPrescriptionPad, setShowPrescriptionPad] = useState(false);
  const [isDraggingTool, setIsDraggingTool] = useState<boolean>(false);
  const [showTutorialHand, setShowTutorialHand] = useState<boolean>(true);
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const [showSoundTip, setShowSoundTip] = useState(true);

  // Check if all required tools are done
  useEffect(() => {
    if (patient.requiredTools.length === 0) return;
    const allDone = patient.requiredTools.every(tool => toolsDone[tool]);
    if (allDone) {
      setTimeout(() => setShowPrescriptionPad(true), 800);
    }
  }, [toolsDone, patient.requiredTools]);

  // Master Simulation Loop
  useEffect(() => {
    let interval: any;
    const activeScanTool = Object.keys(isScanning).find(k => isScanning[k]);
    
    if (activeScanTool) {
      interval = setInterval(() => {
        if (activeScanTool === 'stethoscope') playHeartbeatSound(patient.id === 1);
        else playClickSound();

        setToolsProgress(prev => {
          const current = prev[activeScanTool] || 0;
          if (current >= 100) {
            setIsScanning(s => ({ ...s, [activeScanTool]: false }));
            setToolsDone(d => ({ ...d, [activeScanTool]: true }));
            playSuccessSound();
            clearInterval(interval);
            return { ...prev, [activeScanTool]: 100 };
          }
          return { ...prev, [activeScanTool]: current + 20 }; // faster progress (2 seconds total)
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isScanning, patient.id]);

  const handleToolDrop = (tool: ToolType, info: any) => {
    setIsDraggingTool(false);
    if (toolsDone[tool]) return; // Already finished this tool
    
    // Get the element at the drop coordinate
    const element = document.elementFromPoint(info.point.x, info.point.y);
    const dropTargetBox = element?.closest('[data-droptarget]');
    const dropTargetTool = dropTargetBox?.getAttribute('data-droptarget');

    // Only allow drop if it's dropped on the corresponding box
    if (dropTargetTool === tool) {
      setIsScanning(prev => ({ ...prev, [tool]: true }));
      setShowSoundTip(false);
      setShowTutorialHand(false);
      setActiveTool(tool);
    } else if (dropTargetTool && dropTargetTool !== tool) {
      // Dropped on a different tool box, or dragged the wrong tool to a box
      playIncorrectSound();
      setShowWrongToolPopup(tool);
    } else {
      // If it's dropped on the glowing patient avatar, check if it's required
      const isDroppedOnAvatar = element?.closest('#patient-avatar-drop-zone');
      if (isDroppedOnAvatar) {
        if (patient.requiredTools.includes(tool)) {
          setIsScanning(prev => ({ ...prev, [tool]: true }));
          setShowSoundTip(false);
          setShowTutorialHand(false);
          setActiveTool(tool);
        } else {
           playIncorrectSound();
           setShowWrongToolPopup(tool);
        }
      } else {
        // Dropped randomly on the screen, snap back
        setActiveTool('none');
      }
    }
  };

  const prescriptions = [
    { key: 'sirup', icon: '🥤', title: 'Sirup Batuk & Demam', correctForId: [1, 3] },
    { key: 'tetes', icon: '💧', title: 'Obat Tetes Hidung & Telinga', correctForId: [2] },
    { key: 'permen', icon: '🍬', title: 'Permen Pelega Tenggorokan', correctForId: [4] },
    { key: 'sertifikat', icon: '📜', title: 'Buku Sertifikat Imunisasi', correctForId: [5] },
    { key: 'junkfood', icon: '🍿', title: 'Es Krim & Keripik Pedas', correctForId: [] } // Trap!
  ];

  const handlePrescriptionClick = (key: string, correctIds: number[]) => {
    setSelectedPrescription(key);
    if (correctIds.includes(patient.id)) {
      playCorrectSound();
      setShowCertificate(true);
    } else {
      playIncorrectSound();
      alert('Aduh! Tindakan atau resep ini kurang tepat untuk gejala teman kita. Coba pilih resep yang lain ya!');
      setSelectedPrescription(null);
    }
  };

  const handleFinishAdventure = () => {
    playSuccessSound();
    onCompleteCheckup(patient.id, 50, 'badge-patient-healed');
  };

  return (
    <div className="flex flex-col justify-between min-h-[92vh] max-w-md mx-auto p-5 select-none font-quicksand pb-2 overflow-y-auto no-scrollbar">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-brand-surface-lowest border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-brand-primary font-bold shadow-sm cursor-pointer">←</button>
        <span className="bg-brand-primary/10 text-brand-primary py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">
          Pemeriksaan Aktif: {patient.name}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
        <AnimatePresence>
          {showSoundTip && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="absolute top-2 w-full bg-cyan-50 border border-brand-primary/20 p-2.5 rounded-xl z-20 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-brand-primary animate-bounce shrink-0" />
              <p className="text-[11px] font-semibold text-brand-primary-container leading-normal text-left">
                Nyalakan suara! Seret (drag) alat yang <b>benar</b> ke arah <strong>{patient.name}</strong> untuk memeriksa!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patient Avatar Drop Zone */}
        <div id="patient-avatar-drop-zone" className={`relative w-full max-w-[280px] h-80 rounded-[3rem] bg-gradient-to-b from-brand-surface-lowest to-brand-primary/5 overflow-hidden flex flex-col items-center justify-center shadow-inner mb-4 mt-8 transition-colors duration-300 ${isDraggingTool ? 'border-4 border-brand-primary bg-brand-primary/10 shadow-[0_0_30px_rgba(0,188,212,0.4)]' : 'border-4 border-brand-primary/10'}`}>
          
          <FullBodyPatient 
            id={patient.id} 
            name={patient.name}
            faceEmoji={patient.image} 
            isSick={!showPrescriptionPad} 
          />
          
          {/* Glowing pulse ring backdrop when dragging */}
          <AnimatePresence>
            {isDraggingTool && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-brand-primary/20 pointer-events-none"
              />
            )}
          </AnimatePresence>
          
          {isScanning['stethoscope'] && (
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="w-16 h-16 text-rose-500/85 fill-rose-500 animate-pulse" />
            </motion.div>
          )}
          {isScanning['thermometer'] && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/10 pointer-events-none">
              <Thermometer className="w-20 h-20 text-cyan-500 animate-bounce" />
            </div>
          )}
          {isScanning['otoscope'] && (
            <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20 pointer-events-none">
              <Search className="w-20 h-20 text-amber-500 animate-pulse" />
            </div>
          )}
          {isScanning['sphygmomanometer'] && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 pointer-events-none">
              <Activity className="w-20 h-20 text-blue-500 animate-pulse" />
            </div>
          )}
          {isScanning['syringe'] && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 pointer-events-none">
              <Pipette className="w-20 h-20 text-emerald-500 animate-bounce" />
            </div>
          )}
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-brand-on-surface">{patient.name} ({patient.age})</h3>
          <p className="text-xs font-semibold text-neutral-500 mt-1 max-w-xs leading-normal">
            🤒 "Keluhan: {patient.symptom}"
          </p>
        </div>

        {/* Diagnostics Monitor for Required Tools */}
        <div className="w-full grid grid-cols-2 gap-3 mb-2">
          {patient.requiredTools.map(toolKey => {
            const isDone = toolsDone[toolKey];
            const isScn = isScanning[toolKey];
            const prog = toolsProgress[toolKey] || 0;
            const details = TOOL_DETAILS[toolKey];
            
            return (
              <div key={toolKey} data-droptarget={toolKey} className={`p-3 rounded-2xl border transition-colors duration-300 ${isDraggingTool && !isDone && activeTool === toolKey ? 'border-brand-primary shadow-[0_0_15px_rgba(0,188,212,0.5)]' : ''} ${isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-brand-surface-lowest border-neutral-200'}`}>
                <div className="flex items-center gap-1.5 mb-1.5 pointer-events-none">
                  <span className="text-sm">{details.icon}</span>
                  <p className="text-[10px] font-bold uppercase text-neutral-500">{details.name}</p>
                </div>
                {isScn ? (
                  <div className="space-y-1 pointer-events-none">
                    <p className="text-[11px] font-bold text-brand-primary animate-pulse">Memeriksa...</p>
                    <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary" style={{ width: `${prog}%` }} />
                    </div>
                  </div>
                ) : isDone ? (
                  <p className="text-xs font-extrabold text-emerald-600 mt-1 pointer-events-none">
                    ✓ Selesai
                  </p>
                ) : (
                  <p className="text-[10px] font-semibold text-neutral-400 mt-1 pointer-events-none">Menunggu...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!showPrescriptionPad ? (
        <div className="w-full mt-2 space-y-3 shrink-0 relative">
          
          {/* Tutorial Ghost Hand Animation */}
          {showTutorialHand && (
            <motion.div
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ y: [-10, -140], x: [0, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 text-5xl pointer-events-none drop-shadow-xl"
            >
              👆
            </motion.div>
          )}

          <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest text-center">
            Peralatan Dokter (Seret ke pasien, Ketuk ❓ Info)
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {AVAILABLE_TOOLS.map((tool) => {
              const isDone = toolsDone[tool];
              const isScn = isScanning[tool];
              const details = TOOL_DETAILS[tool];
              return (
                <div key={tool} className="relative flex items-stretch">
                  <motion.div
                    drag={!isDone && !isScn}
                    dragSnapToOrigin
                    onDragStart={() => {
                      if (!isDone) {
                        setActiveTool(tool);
                        setIsDraggingTool(true);
                      }
                    }}
                    onDragEnd={(e, info) => handleToolDrop(tool, info)}
                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                    className={`py-2 px-3 pr-8 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      isDone || isScn
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-600 cursor-not-allowed opacity-70'
                        : 'bg-white border-neutral-200 text-brand-on-surface hover:bg-neutral-50 cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    {details.icon} {details.name} {isDone && '✓'}
                  </motion.div>
                  <button 
                    onClick={() => setShowToolInfo(tool)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[10px] bg-neutral-100 text-neutral-500 rounded-lg hover:bg-brand-primary/10 hover:text-brand-primary"
                  >
                    ❓
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-brand-surface-lowest border-t-2 border-brand-primary/10 p-5 mt-2 space-y-4 rounded-3xl shadow-sm leading-relaxed shrink-0">
          <div className="text-left">
            <span className="text-xs font-extrabold text-brand-secondary bg-brand-secondary-container/15 py-1 px-2.5 rounded-full uppercase tracking-wider">Diagnosa Selesai!</span>
            <h3 className="text-lg font-bold text-brand-on-surface mt-2">Apa tindakan penyembuh yang tepat?</h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[30vh] pr-2">
            {prescriptions.map((p) => (
              <motion.button key={p.key} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => handlePrescriptionClick(p.key, p.correctForId)} className="w-full text-left p-3 rounded-2xl border-2 hover:border-brand-primary border-neutral-200 bg-brand-surface-lowest flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <h4 className="text-sm font-extrabold text-brand-on-surface">{p.title}</h4>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Wrong Tool Popup */}
      <AnimatePresence>
        {showWrongToolPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-5 z-50">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-3xl p-6 text-center shadow-xl max-w-xs w-full">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-black text-rose-500 mb-2">Ops! Alat Kurang Tepat</h3>
              <p className="text-xs font-semibold text-neutral-600 leading-relaxed mb-4">
                <strong>{TOOL_DETAILS[showWrongToolPopup].name}</strong> digunakan untuk {TOOL_DETAILS[showWrongToolPopup].desc.toLowerCase()} 
                Namun, pasien ini memiliki gejala <strong>{patient.symptom}</strong>.
                <br/><br/>Pilihlah alat lain yang tepat untuk kasus ini!
              </p>
              <button onClick={() => setShowWrongToolPopup(null)} className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl shadow-sm">Mengerti, Dok!</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Info Video Modal */}
      <AnimatePresence>
        {showToolInfo !== 'none' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/65 flex items-center justify-center p-5 z-50" onClick={() => setShowToolInfo('none')}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm text-center relative" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-black text-brand-primary mb-4 text-left">
                {TOOL_DETAILS[showToolInfo].icon} {TOOL_DETAILS[showToolInfo].name}
              </h2>
              <div className="rounded-xl overflow-hidden bg-black/10 aspect-video flex items-center justify-center relative mb-4">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-xs font-semibold text-neutral-600 text-left mb-4">{TOOL_DETAILS[showToolInfo].desc}</p>
              <button onClick={() => setShowToolInfo('none')} className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl shadow-sm">Tutup Info</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/65 flex items-center justify-center p-5 z-50">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-dashed border-brand-primary w-full max-w-sm text-center relative">
              <div className="text-5xl mt-2 animate-bounce">🎓</div>
              <h2 className="text-2xl font-black text-brand-primary mt-4">Pemeriksaan Berhasil!</h2>
              <p className="text-xs font-semibold text-neutral-500 my-4">Kamu telah menolong {patient.name} dengan tepat.</p>
              <button onClick={handleFinishAdventure} className="w-full bg-brand-primary text-white font-bold py-3.5 px-6 rounded-2xl shadow-md">Selesai & Ambil Lencana ➔</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
