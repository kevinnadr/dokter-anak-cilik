import React from 'react';
import { motion, type Transition } from 'motion/react';
import andiSickVideo from '../assets/video/andi_sick.mp4';
import andiHealthyVideo from '../assets/video/andi_healthy.mp4';
import budiSickVideo from '../assets/video/budi_sick.mp4';
import budiHealthyVideo from '../assets/video/budi_healthy.mp4';
import rinaSickVideo from '../assets/video/rina_sick.mp4';
import rinaHealthyVideo from '../assets/video/rina_healthy.mp4';
import sitiSickVideo from '../assets/video/siti_sick.mp4';
import sitiHealthyVideo from '../assets/video/siti_healthy.mp4';
import brunoSickVideo from '../assets/video/bruno_sick.mp4';
import brunoHealthyVideo from '../assets/video/bruno_healthy.mp4';
import ditoSickVideo from '../assets/video/dito_sick.mp4';
import ditoHealthyVideo from '../assets/video/dito_healthy.mp4';

interface FullBodyPatientProps {
  id: number;
  name: string;
  faceEmoji: string;
  isSick: boolean;
}

export const FullBodyPatient: React.FC<FullBodyPatientProps> = ({ id, name, faceEmoji, isSick }) => {

  const lowerName = name.toLowerCase();
  const isVideoCharacter = ['andi', 'budi', 'rina', 'siti', 'bruno', 'dito'].includes(lowerName);

  // Logika animasi seluruh tubuh saat sakit
  const getAnimation = () => {
    if (isVideoCharacter) return {}; // Tidak ada efek getar karena sudah format video
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

  const getTransition = (): Transition => {
    if (isVideoCharacter) return {}; // Tidak ada efek getar
    if (!isSick) return { repeat: Infinity, duration: 3, ease: 'easeInOut' };
    const dur = id === 1 ? 2 : id === 2 ? 3 : id === 3 ? 0.4 : id === 4 ? 2 : 1.5;
    const del = id === 1 ? 1 : 0;
    return { repeat: Infinity, duration: dur, ease: 'easeInOut', repeatDelay: del };
  };

  const imageUrl = `/assets/patients/${lowerName}_sick.png`;

  let videoSrc = null;
  if (lowerName === 'andi') {
    videoSrc = andiSickVideo;
  } else if (lowerName === 'budi') {
    videoSrc = budiSickVideo;
  } else if (lowerName === 'rina') {
    videoSrc = rinaSickVideo;
  } else if (lowerName === 'siti') {
    videoSrc = sitiSickVideo;
  } else if (lowerName === 'bruno') {
    videoSrc = brunoSickVideo;
  } else if (lowerName === 'dito') {
    videoSrc = ditoSickVideo;
  }

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      animate={getAnimation()}
      transition={getTransition()}
    >
      {isVideoCharacter && videoSrc ? (
        <video 
          src={videoSrc}
          className="w-full h-full object-cover scale-[1.05]"
          autoPlay 
          loop 
          muted 
          playsInline 
        />
      ) : (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover scale-[1.05]"
        />
      )}
    </motion.div>
  );
};
