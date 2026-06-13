import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, AlertCircle, HelpCircle, CheckCircle, Loader, Volume2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';
import { playClickSound, playCorrectSound, playIncorrectSound, playSuccessSound } from '../utils/audio';

// Import semua audio soal
// import questionAudio1 from '../assets/audio/quiz/question-1.mp3';
// import questionAudio2 from '../assets/audio/quiz/question-2.mp3';
// import questionAudio3 from '../assets/audio/quiz/question-3.mp3';
// import questionAudio4 from '../assets/audio/quiz/question-4.mp3';
// import questionAudio5 from '../assets/audio/quiz/question-5.mp3';
// import questionAudio6 from '../assets/audio/quiz/question-6.mp3';
// import questionAudio7 from '../assets/audio/quiz/question-7.mp3';
// import questionAudio8 from '../assets/audio/quiz/question-8.mp3';

// const QUESTION_AUDIO: Record<number, string> = {
//   1: questionAudio1,
//   2: questionAudio2,
//   3: questionAudio3,
//   4: questionAudio4,
//   5: questionAudio5,
//   6: questionAudio6,
//   7: questionAudio7,
//   8: questionAudio8,
// };

// Hapus semua import questionAudio1 dst...

// Ganti dengan ini — pakai path dinamis dari public folder
const QUESTION_AUDIO: Record<number, string> = {
  1: '/assets/audio/quiz/question-1.mp3',
  2: '/assets/audio/quiz/question-2.mp3',
  3: '/assets/audio/quiz/question-3.mp3',
  4: '/assets/audio/quiz/question-4.mp3',
  5: '/assets/audio/quiz/question-5.mp3',
  6: '/assets/audio/quiz/question-6.mp3',
  7: '/assets/audio/quiz/question-7.mp3',
  8: '/assets/audio/quiz/question-8.mp3',
};
interface MiniQuizScreenProps {
  userName: string;
  onCompleteQuiz: (xpEarned: number, badgeUnlockedId?: string) => void;
  onBack: () => void;
}

export function MiniQuizScreen({ userName, onCompleteQuiz, onBack }: MiniQuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const questionAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);

  const playQuestionAudio = () => {
    playClickSound();
    if (questionAudioRef.current) {
      setIsPlayingQuestion(true);
      questionAudioRef.current.currentTime = 0;
      questionAudioRef.current.play().catch(() => {
        setIsPlayingQuestion(false);
      });
    }
  };

  const handleSelectOption = (key: string) => {
    if (answerRevealed) return;
    setSelectedKey(key);
    setAnswerRevealed(true);

    const isCorrect = key === currentQuestion.correctAnswer;
    if (isCorrect) {
      playCorrectSound();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    // Hentikan audio soal sebelumnya
    if (questionAudioRef.current) {
      questionAudioRef.current.pause();
      questionAudioRef.current.currentTime = 0;
    }
    setIsPlayingQuestion(false);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedKey(null);
      setAnswerRevealed(false);
    } else {
      playSuccessSound();
      setQuizFinished(true);
    }
  };

  const handleFinish = () => {
    playSuccessSound();
    const isPerfect = correctAnswersCount === QUIZ_QUESTIONS.length;
    onCompleteQuiz(isPerfect ? 100 : 50, isPerfect ? 'badge-quiz-master' : undefined);
  };

  const currentPercent = ((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col justify-between h-full max-w-md mx-auto p-4 select-none font-quicksand text-center">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-brand-surface-lowest border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-brand-primary font-bold shadow-sm cursor-pointer"
        >
          ←
        </button>
        <span className="bg-brand-primary/10 text-brand-primary py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">
          Kuis Dokter Cilik 🌟
        </span>
      </div>

      {!quizFinished ? (
        <div className="flex-1 flex flex-col justify-between py-2">
          
          {/* Question layout & progress banner */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold bg-amber-100 text-amber-700 py-1 px-3 rounded-full">
                Tantangan {currentIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs font-bold text-neutral-400">
                Skor: {correctAnswersCount} Betul
              </span>
            </div>

            {/* Progress metric bar */}
            <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-brand-primary rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-container"
                animate={{ width: `${currentPercent}%` }}
              />
            </div>

            {/* The Question Card */}
            {/* The Question Card */}
            <motion.div
              key={currentQuestion.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-brand-surface-lowest border border-brand-primary/10 rounded-3xl p-4 shadow-sm text-left relative"
            >
              <div className="flex items-start gap-3">
                {/* ✅ Tombol audio soal */}
                <motion.button
                  onClick={playQuestionAudio}
                  disabled={isPlayingQuestion}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/80 disabled:opacity-60 shadow-md transition-all shrink-0 mt-1"
                  title="Dengarkan soal"
                >
                  {isPlayingQuestion ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </motion.button>

                <h2 className="text-xl md:text-2xl font-bold text-brand-on-surface leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>
            </motion.div>
          </div>

          {/* Answer options listed vertically */}
          <div className="space-y-3 my-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedKey === opt.key;
              const isCorrect = opt.key === currentQuestion.correctAnswer;
              
              let optionStyle = 'bg-brand-surface-lowest border-neutral-200 hover:border-brand-primary';
              if (answerRevealed) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                } else {
                  optionStyle = 'bg-neutral-50/50 border-neutral-100 opacity-50';
                }
              }

              return (
                <motion.button
                  key={opt.key}
                  whileHover={!answerRevealed ? { scale: 1.01 } : {}}
                  whileTap={!answerRevealed ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-3 outline-none ${optionStyle}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-inner ${
                    answerRevealed && isCorrect
                      ? 'bg-emerald-500 text-white'
                      : answerRevealed && isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {opt.key === 'Benar' ? '✓' : opt.key === 'Salah' ? '✗' : opt.key}
                  </div>
                  <span className="text-sm md:text-base font-semibold leading-snug">
                    {opt.text}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Reveal details and explanations */}
          <div className="flex items-center justify-center">
            <AnimatePresence>
              {answerRevealed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="w-full bg-blue-50 border border-brand-primary/15 p-3 rounded-2xl text-left space-y-1"
                >
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-primary" /> Penjelasan Dokter:
                  </p>
                  <p className="text-xs font-semibold text-neutral-600 leading-normal">
                    {currentQuestion.explanation}
                  </p>
                  <div className="border-t border-dashed border-cyan-200 my-1.5" />
                  <p className="text-[11px] font-bold text-brand-secondary leading-normal">
                    💡 Fakta Seru: {currentQuestion.funFact}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next Button transition */}
          <div className="mt-4">
            {answerRevealed && (
              <motion.button
                onClick={handleNext}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-2xl shadow-md border-b-4 border-[#004d6c]"
              >
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Berikutnya ➔' : 'Lihat Hasil Kuis ✨'}
              </motion.button>
            )}
          </div>

        </div>
      ) : (
        /* Quiz Summary Screen once done - Certificate Style */
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex-1 flex flex-col justify-center items-center space-y-4 py-4 w-full"
        >
          <div className="w-full bg-white rounded-3xl p-6 shadow-2xl border-4 border-double border-brand-primary text-center relative overflow-hidden">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-amber-50 to-transparent pointer-events-none opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-brand-primary text-white rounded-full text-4xl flex items-center justify-center mx-auto shadow-lg animate-bounce mb-3 border-4 border-white">
                🎓
              </div>

              <h2 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
                Sertifikat Kelulusan
              </h2>
              <h1 className="text-2xl font-black text-brand-primary mb-2">
                Kuis Dokter Cilik
              </h1>
              
              <p className="text-sm font-semibold text-neutral-600">
                Diberikan secara khusus kepada:
              </p>
              
              <h2 className="text-3xl font-black text-brand-secondary my-3 italic">
                Dokter {userName || 'Cilik'}
              </h2>
              
              <div className="w-3/4 h-px bg-neutral-200 mx-auto my-3"></div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-brand-surface-low border border-brand-primary/10 rounded-2xl p-3">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">Nilai Akhir</p>
                  <p className="text-2xl font-black text-brand-on-surface">
                    {Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 100)}
                  </p>
                </div>
                <div className="bg-brand-surface-low border border-brand-primary/10 rounded-2xl p-3">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">Benar</p>
                  <p className="text-2xl font-black text-brand-on-surface">
                    {correctAnswersCount}<span className="text-base text-neutral-400">/{QUIZ_QUESTIONS.length}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5">
                {correctAnswersCount === QUIZ_QUESTIONS.length ? (
                  <span className="bg-emerald-100 text-emerald-700 py-1.5 px-4 rounded-full text-sm font-black shadow-sm">
                    Predikat: Sempurna! 🎉
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-700 py-1.5 px-4 rounded-full text-sm font-black shadow-sm">
                    Predikat: Lulus Hebat! ⭐
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full space-y-3 mt-4">
            <button
              onClick={handleFinish}
              className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg border-b-4 border-[#004d6c] active:border-b-0 cursor-pointer"
            >
              Selesai
            </button>
            <p className="text-xs text-neutral-400 font-bold">
              {correctAnswersCount === QUIZ_QUESTIONS.length ? 'Mendulang +100 XP & Lencana Kuis Master!' : 'Mendulang +50 XP Belajar Sehat!'}
            </p>
          </div>

        </motion.div>
      )}
      {/* ✅ Sesudah — komentar dihapus */}
      <audio
        key={currentQuestion.id}
        ref={questionAudioRef}
        src={QUESTION_AUDIO[currentQuestion.id]}
        onEnded={() => setIsPlayingQuestion(false)}
      />
    </div>
  );
}
