import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SparkleReveal from './SparkleReveal';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  celebrationSticker?: string;
  questionPose?: string;
  shuffledOptions?: string[];
  shuffledCorrectAnswer?: number;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedAnswer: number, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  lives: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  lives,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);



  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    // Use shuffled correct answer if available, otherwise fall back to original
    const correctAnswerIndex = question.shuffledCorrectAnswer ?? question.correctAnswer;
    const isCorrect = answerIndex === correctAnswerIndex;

    // Show result briefly then move to next question
    setTimeout(() => {
      onAnswer(answerIndex, isCorrect);
    }, 1500); // Reduced time since no explanation to read
  };



  const getOptionStyle = (index: number) => {
    const correctAnswerIndex = question.shuffledCorrectAnswer ?? question.correctAnswer;

    if (selectedAnswer === null) {
      return {
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(244, 114, 182, 0.7) 25%, rgba(251, 207, 232, 0.6) 50%, rgba(244, 114, 182, 0.7) 75%, rgba(236, 72, 153, 0.9) 100%)',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 4px 16px rgba(244, 114, 182, 0.3)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(236, 72, 153, 0.3)'
      };
    }

    if (index === correctAnswerIndex) {
      return {
        background: 'linear-gradient(135deg, #10B981, #059669)',
        borderColor: '#047857',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)',
        transform: 'scale(1.02)'
      };
    }

    if (index === selectedAnswer && index !== correctAnswerIndex) {
      return {
        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
        borderColor: '#B91C1C',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 6px 20px rgba(239, 68, 68, 0.5)',
        transform: 'scale(0.98)'
      };
    }

    return {
      backgroundColor: '#9CA3AF',
      borderColor: '#6B7280',
      color: 'white',
      fontWeight: 'bold'
    };
  };



  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Kawaii Scalloped Border Question Card - Fixed Size */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        layout={false}
        className="kawaii-scalloped-border mx-auto"
        style={{
          borderRadius: '35px',
          maxWidth: '500px',
          width: '80%',
          minWidth: '300px',
          height: '260px',
          position: 'relative',
          padding: '16px 20px 14px 20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent animate-pulse"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/50 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400/50 rounded-full animate-bounce"></div>

        {/* Header with Progress and Hearts - Fixed Position */}
        <div className="flex items-center justify-between mb-3 w-full relative z-10" style={{ flexShrink: 0 }}>
          <span
            className="bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-purple-800 font-bold text-xs"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
              fontSize: '12px'
            }}
          >
            Question {questionNumber}/{totalQuestions}
          </span>

          <div className="flex items-center space-x-1">
            {Array.from({ length: 3 }, (_, i) => (
              <img
                key={i}
                src={i < lives ? '/img/hearts/alive-heart.png' : '/img/hearts/dead-heart.png'}
                alt={i < lives ? 'Life remaining' : 'Life lost'}
                className="w-4 h-4 drop-shadow-sm animate-pulse"
                style={{
                  width: '16px',
                  height: '16px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Question Text - Centered */}
        <div className="flex flex-col justify-center items-center mb-2 relative z-10" style={{ height: '60px', flexShrink: 0 }}>
          <SparkleReveal isVisible={true} delay={0}>
            <h2
              className="question-text-override font-bold text-gray-700 text-center leading-relaxed drop-shadow-sm font-chibi"
              style={{
                fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif !important",
                fontWeight: 'bold !important',
                color: '#4A5568 !important',
                fontSize: '15px !important'
              }}
            >
              {question.question}
            </h2>
          </SparkleReveal>
        </div>



        {/* Options Section - Compact Layout */}
        <div className="flex flex-col items-center space-y-1 w-full relative z-10" style={{ flex: 1, justifyContent: 'flex-start', overflow: 'hidden' }}>
          {(question.shuffledOptions || question.options).map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0,
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={selectedAnswer === null ? {
              filter: 'brightness(1.05)',
            } : {}}
            whileTap={selectedAnswer === null ? {
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`w-4/5 max-w-lg rounded-2xl text-center relative overflow-hidden kawaii-button-emotional kawaii-magnetic ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300 ease-out`}
            style={{
              ...getOptionStyle(index),
              marginBottom: index < question.options.length - 1 ? '12px' : '0px'
            }}
          >
            {/* Option text - readable design */}
            <div className="py-2.5 px-4">
              <span
                className="font-bold text-white drop-shadow-lg"
                style={{
                  fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif !important",
                  fontWeight: 'bold !important',
                  fontSize: '16px !important'
                }}
              >
                {option.replace(/\s*\([^)]*\)/g, '')}
              </span>
            </div>
          </motion.button>
        ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionCard;
