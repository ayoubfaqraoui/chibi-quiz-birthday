import React from 'react';
import { motion } from 'framer-motion';
import Sticker from './Sticker';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  // Decorative elements positions - using CSS shapes instead of emojis
  const decorativeElements = [
    { type: 'star', top: '10%', left: '15%', delay: 0 },
    { type: 'heart', top: '20%', right: '20%', delay: 0.5 },
    { type: 'star', top: '70%', left: '10%', delay: 1 },
    { type: 'heart', top: '80%', right: '15%', delay: 1.5 },
    { type: 'plus', top: '15%', left: '80%', delay: 2 },
    { type: 'circle', top: '60%', right: '85%', delay: 2.5 },
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
      {/* Floating decorative elements */}
      {decorativeElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: element.delay, duration: 0.5 }}
          className={`absolute animate-float ${
            element.type === 'star' ? 'star' :
            element.type === 'heart' ? 'w-4 h-4 bg-pink-300 rounded-full' :
            element.type === 'plus' ? 'plus-star' :
            'w-3 h-3 bg-purple-300 rounded-full'
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
        className="bg-gradient-to-br from-soft-white/95 to-anime-purple/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg md:max-w-2xl w-full text-center relative overflow-hidden shadow-kawaii"
      >
        {/* Animated decorative elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-neon-pink rounded-full animate-ping"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-anime-mint rounded-full animate-ping"></div>

        <Sticker emotion="neutral" className="mb-4" />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-700 mb-6 text-lg md:text-xl font-anime leading-relaxed"
          style={{
            fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif"
          }}
        >
          Hi Fadwa! Think you know yourself better than your TikTok algorithm?
          <br />
          <span
            className="bg-gradient-to-r from-anime-purple to-anime-pink bg-clip-text text-transparent font-bold"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
              fontWeight: 'bold'
            }}
          >
            Let's find out! 💫
          </span>
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="glass-button font-bold py-5 px-12 rounded-full text-xl font-chibi text-gray-700 mt-4"
          style={{
            fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
            fontWeight: 'bold'
          }}
        >
          <span
            className="relative z-10 drop-shadow-sm font-chibi"
            style={{
              fontFamily: "'Bubblegum Sans', 'Kalam', 'Fredoka', sans-serif",
              fontWeight: 'bold'
            }}
          >
            Start the Game
          </span>
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
