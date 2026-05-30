export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  unlockedBadges: string[];
}

export type ScreenType =
  | 'welcome'
  | 'doctor-intro'
  | 'dashboard'
  | 'patient-selection'
  | 'exam'
  | 'mini-quiz'
  | 'piala';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
}

export type ToolType = 'stethoscope' | 'thermometer' | 'otoscope' | 'sphygmomanometer' | 'syringe';

export interface Patient {
  id: number;
  name: string;
  image: string;
  age: string;
  status: 'sick' | 'checking' | 'healthy';
  symptom: string;
  roomNumber: number;
  requiredTools: ToolType[];
  results: {
    heartRate?: number;
    temperature?: number;
    throatStatus?: 'Normal' | 'Meradang';
    earStatus?: 'Normal' | 'Kotor';
    bloodPressure?: string;
    vaccineGiven?: boolean;
  };
}

export interface RewardBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}
