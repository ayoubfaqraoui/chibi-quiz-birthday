import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from './QuestionCard';
import Sticker from './Sticker';
import questionsData from '../data/questions.json';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  celebrationSticker?: string;
  questionPose?: string;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

interface QuizEngineProps {
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ onComplete }) => {
  // Function to shuffle answer options and update correct answer index
  const shuffleQuestion = (question: Question): ShuffledQuestion => {
    const correctOption = question.options[question.correctAnswer];
    const shuffledOptions = [...question.options];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    // Find new index of correct answer
    const shuffledCorrectAnswer = shuffledOptions.indexOf(correctOption);

    return {
      ...question,
      shuffledOptions,
      shuffledCorrectAnswer
    };
  };

  const [questions] = useState<ShuffledQuestion[]>(() =>
    questionsData.map(q => shuffleQuestion(q))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [emotion, setEmotion] = useState<'neutral' | 'happy' | 'sad' | 'celebration' | 'question' | 'wrong1' | 'wrong2' | 'wrong3' | 'lastChance' | 'gameOver' | 'victory'>('neutral');
  const [customSticker, setCustomSticker] = useState<string>('');
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showLastChance, setShowLastChance] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Set question-specific pose when question changes
  useEffect(() => {
    if (currentQuestion) {
      setEmotion('question');
      setCustomSticker(currentQuestion.questionPose || 'talking-peace-sign.png');
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Decorative elements for the quiz screen
  const decorativeElements = [
    { type: 'star', top: '5%', left: '10%', delay: 0 },
    { type: 'circle', top: '15%', right: '15%', delay: 0.5 },
    { type: 'plus', top: '75%', left: '5%', delay: 1 },
    { type: 'heart', top: '80%', right: '10%', delay: 1.5 },
  ];

  const handleAnswer = (_selectedAnswer: number, isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newLives = isCorrect ? lives : Math.max(0, lives - 1);
    let isLastChanceTriggered = false;

    if (isCorrect) {
      setScore(newScore);
      // Show celebration sticker specific to the question
      setEmotion('celebration');
      setCustomSticker(currentQuestion.celebrationSticker || 'celebrating-excited.png');
    } else {
      setLives(newLives);
      const newWrongCount = wrongAnswerCount + 1;
      setWrongAnswerCount(newWrongCount);

      // Show different stickers based on wrong answer count
      if (newWrongCount === 1) {
        setEmotion('wrong1');
        setCustomSticker('worried-expression.png');
      } else if (newWrongCount === 2) {
        setEmotion('wrong2');
        setCustomSticker('puppy-eyes.png');
      } else {
        setEmotion('wrong3');
        setCustomSticker('angry-crying.png');
      }

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      // Show last chance notification when lives reach 1
      if (newLives === 1) {
        isLastChanceTriggered = true;
        // Synchronize sticker and popup display - both appear immediately
        setEmotion('lastChance');
        setCustomSticker('worried-sad.png');
        setShowLastChance(true);

        // Hide notification after 3 seconds, then proceed to next question
        setTimeout(() => {
          // Set next question data BEFORE hiding notification to prevent flash
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setEmotion('question');
            setCustomSticker(questions[currentQuestionIndex + 1]?.questionPose || 'talking-peace-sign.png');
          } else {
            setIsCompleting(true);
          }

          // Hide notification immediately after setting new question
          setShowLastChance(false);

          // Complete quiz if needed
          if (currentQuestionIndex >= questions.length - 1) {
            setTimeout(() => onComplete(newScore, questions.length), 100);
          }
        }, 3000);
        return; // Don't proceed to next question immediately
      }
    }

    // Move to next question or complete quiz (only if last chance was not triggered)
    if (!isLastChanceTriggered) {
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1 && newLives > 0) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          // The useEffect will handle setting the question pose
        } else {
          // Game complete - either finished all questions or ran out of lives
          setIsCompleting(true);
          setTimeout(() => onComplete(newScore, questions.length), 100);
        }
      }, 2500);
    }
  };

  // Game over if no lives left - handled in handleAnswer now for better flow
  useEffect(() => {
    if (lives <= 0 && currentQuestionIndex > 0) {
      // Only trigger if we're actually in the game (not initial state)
      setIsCompleting(true);
      setTimeout(() => {
        onComplete(score, questions.length);
      }, 1000);
    }
  }, [lives, score, questions.length, onComplete, currentQuestionIndex]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Floating anime decorative elements */}
      {decorativeElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: element.delay, duration: 0.5 }}
          className={`absolute ${
            element.type === 'star' ? 'w-4 h-4 bg-neon-yellow rounded-full animate-pulse' :
            element.type === 'heart' ? 'w-4 h-4 bg-neon-pink rounded-full animate-bounce' :
            element.type === 'plus' ? 'w-3 h-3 bg-neon-cyan rounded-full animate-ping' :
            'w-3 h-3 bg-anime-purple rounded-full animate-pulse'
          }`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
        />
      ))}

      {/* Only show game content when last chance notification is not showing and not completing */}
      {!showLastChance && !isCompleting && (
        <>
          {/* Sticker */}
          <motion.div
            animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Sticker
              emotion={emotion}
              customSticker={emotion === 'question' ? currentQuestion.questionPose : customSticker}
            />
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestionIndex} // Force re-render for smooth transitions
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
            }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              lives={lives}
            />
          </motion.div>
        </>
      )}

      {/* Last chance notification with synchronized sticker */}
      {showLastChance && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
        >
          {/* Worried-sad sticker appears simultaneously */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <Sticker
              emotion="lastChance"
              customSticker="worried-sad.png"
            />
          </motion.div>

          {/* Notification popup */}
          <div className="bg-gradient-to-r from-red-500/95 to-pink-500/95 border-2 border-red-400/70 rounded-2xl px-8 py-6 shadow-2xl backdrop-blur-sm">
            <p
              className="text-white font-bold text-lg animate-pulse text-center"
              style={{
                fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
                fontWeight: 'bold'
              }}
            >
              Last chance! Be careful!
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizEngine;
