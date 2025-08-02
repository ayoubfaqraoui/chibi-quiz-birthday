import React from 'react';
import { motion } from 'framer-motion';
import Sticker from './Sticker';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}



const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (score >= 10) {
      return {
        firstLine: "You're like a self-awareness goddess!",
        message: "Happy Birthday, Beautiful! May your special day be filled with endless joy, and all the love your heart can hold! You're absolutely wonderful just the way you are!",
        emotion: 'victory' as const,
        customSticker: 'celebrating-excited.png',
        bgGradient: 'from-kawaii-pink to-kawaii-purple'
      };
    } else {
      return {
        firstLine: "you're discovering your own constellation, one star at a time ✨",
        message: "Happy Birthday, Beautiful! May your special day be filled with endless joy, and all the love your heart can hold! You're absolutely wonderful just the way you are!",
        emotion: 'gameOver' as const,
        customSticker: 'angry-crying.png',
        bgGradient: 'from-kawaii-blue to-kawaii-mint'
      };
    }
  };



  const result = getResultMessage();

  // Celebration decorations
  const celebrationElements = [
    { type: 'star', top: '8%', left: '10%', delay: 0 },
    { type: 'circle', top: '12%', right: '15%', delay: 0.3 },
    { type: 'plus', top: '20%', left: '85%', delay: 0.6 },
    { type: 'star', top: '75%', left: '8%', delay: 0.9 },
    { type: 'heart', top: '80%', right: '12%', delay: 1.2 },
    { type: 'circle', top: '85%', left: '80%', delay: 1.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Kawaii Background */}
      <div className="kawaii-background">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="plus-star plus-1"></div>
        <div className="plus-star plus-2"></div>
        <div className="plus-star plus-3"></div>
      </div>
      {/* Celebration decorations */}
      {celebrationElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: element.delay, duration: 0.6, type: "spring" }}
          className={`absolute animate-bounce-cute ${
            element.type === 'star' ? 'star' :
            element.type === 'heart' ? 'w-5 h-5 bg-pink-300 rounded-full' :
            element.type === 'plus' ? 'plus-star' :
            'w-4 h-4 bg-purple-300 rounded-full'
          }`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-card rounded-3xl shadow-kawaii pt-6 md:pt-8 px-6 md:px-8 pb-2 md:pb-3 max-w-sm md:max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-2 h-2 bg-kawaii-pink/15 rounded-full"></div>
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-kawaii-purple/15 rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-kawaii-blue/15 rounded-full"></div>
        <div className="absolute bottom-3 right-3 w-2 h-2 bg-kawaii-mint/15 rounded-full"></div>
        <Sticker emotion={result.emotion} customSticker={result.customSticker} className="mb-2" />

        {/* Percentage under chibi sticker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="mb-2"
        >
          <div
            className="text-4xl md:text-5xl font-bold text-gray-700"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
              fontWeight: 'bold'
            }}
          >
            {percentage}% correct!
          </div>
        </motion.div>

        {/* Text content positioned high - right after percentage */}
        <div className="mt-2">

          {/* First line */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-gray-700 mb-3 text-base md:text-lg kawaii-text leading-relaxed"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif"
            }}
          >
            {result.firstLine}
          </motion.p>

          {/* Birthday message paragraph */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-gray-700 mb-6 text-base md:text-lg kawaii-text leading-relaxed"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif"
            }}
          >
            {result.message}
          </motion.p>
        </div>



        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="glass-button py-3 px-6 rounded-full text-base text-gray-700"
          style={{
            fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
            fontWeight: 'bold'
          }}
        >
          Play Again!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
