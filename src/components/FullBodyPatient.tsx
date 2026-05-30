import React from 'react';
import { motion } from 'motion/react';

interface FullBodyPatientProps {
  id: number;
  name: string;
  faceEmoji: string;
  isSick: boolean;
}

export const FullBodyPatient: React.FC<FullBodyPatientProps> = ({ id, name, faceEmoji, isSick }) => {

  // Logika animasi seluruh tubuh saat sakit
  const getAnimation = () => {
    if (!isSick) return { y: [0, -3, 0] }; // Saat sembuh, bergoyang pelan bahagia
    switch(id) {
      case 1: return { x: [-5, 5, -5, 5, 0], y: [-2, 2, 0] }; // Batuk: terguncang
      case 2: return { scale: [1, 1.05, 1], y: [0, -5, 0] }; // Pilek: nafas berat
      case 3: return { x: [-2, 2, -2, 2, -2, 2, 0] }; // Demam: menggigil cepat
      case 4: return { scale: [1, 0.95, 1], opacity: [1, 0.8, 1] }; // Radang: lemas
      case 5: return { y: [-2, 2, -2] }; // Vaksin: gemetar gugup
      default: return { y: [-2, 2, -2] };
    }
  };

  const getTransition = () => {
    if (!isSick) return { repeat: Infinity, duration: 3, ease: 'easeInOut' };
    const dur = id === 1 ? 2 : id === 2 ? 3 : id === 3 ? 0.4 : id === 4 ? 2 : 1.5;
    const del = id === 1 ? 1 : 0;
    return { repeat: Infinity, duration: dur, ease: 'easeInOut', repeatDelay: del };
  };

  const imageUrl = isSick 
    ? `/assets/patients/${name.toLowerCase()}_sick.png`
    : `/assets/patients/${name.toLowerCase()}_healthy.png`;

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      animate={getAnimation()}
      transition={getTransition()}
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-full object-cover scale-[1.05]"
      />
    </motion.div>
  );
};
