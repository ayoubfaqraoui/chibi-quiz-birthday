import React from 'react';
import { motion } from 'framer-motion';

interface StickerProps {
  emotion: 'neutral' | 'happy' | 'sad' | 'celebration' | 'question' | 'wrong1' | 'wrong2' | 'wrong3' | 'lastChance' | 'gameOver' | 'victory';
  className?: string;
  customSticker?: string; // For question-specific poses and celebration stickers
}

const Sticker: React.FC<StickerProps> = ({ emotion, className = '', customSticker }) => {
  // Enhanced emotion-specific chibi stickers with better mapping
  const getStickerPath = (emotion: string) => {
    // If custom sticker is provided, use it
    if (customSticker) {
      // Check if it's a question pose (numbered files like 36.png, 37.png, etc.)
      if (customSticker.match(/^\d+\.png$/)) {
        return `/img/questions-poses/${customSticker}`;
      }
      // Otherwise, it's a regular chibi sticker
      return `/img/chibi-stcikers/${customSticker}`;
    }

    switch (emotion) {
      case 'neutral':
        return '/img/chibi-stcikers/talking-peace-sign.png'; // Start of game
      case 'happy':
        return '/img/chibi-stcikers/starry-eyed-excited-with-wide-smile.png'; // Very excited and happy
      case 'sad':
        return '/img/chibi-stcikers/worried-sad.png'; // Disappointed but still cute
      case 'celebration':
        return '/img/chibi-stcikers/celebrating-excited.png'; // Correct answer celebration
      case 'question':
        return '/img/chibi-stcikers/talking-peace-sign.png'; // Default question pose
      case 'wrong1':
        return '/img/chibi-stcikers/worried-expression.png'; // First wrong answer
      case 'wrong2':
        return '/img/chibi-stcikers/puppy-eyes.png'; // Second wrong answer
      case 'wrong3':
        return '/img/chibi-stcikers/angry-crying.png'; // Third wrong answer (game over)
      case 'lastChance':
        return '/img/chibi-stcikers/worried-sad.png'; // Last chance warning
      case 'gameOver':
        return '/img/chibi-stcikers/angry-crying.png'; // Game over (score < 10)
      case 'victory':
        return '/img/chibi-stcikers/celebrating-excited.png'; // Victory (score >= 10)
      default:
        return '/img/chibi-stcikers/talking-peace-sign.png';
    }
  };

  const getAnimationVariants = () => {
    switch (emotion) {
      case 'neutral':
        return {
          animate: {
            y: [0, -8, 0],
          },
          transition: {
            duration: 3,
            repeat: Infinity,
          }
        };
      case 'happy':
        return {
          animate: {
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 0.6,
            repeat: 3,
          }
        };
      case 'sad':
        return {
          animate: {
            x: [-3, 3, -3, 3, 0],
          },
          transition: {
            duration: 0.5,
          }
        };
      default:
        return {
          animate: {
            y: [0, -8, 0],
          },
          transition: {
            duration: 3,
            repeat: Infinity,
          }
        };
    }
  };

  const getDecorations = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return (
          <>
            {/* CSS-based sparkles around happy chibi */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -left-4 w-4 h-4 bg-neon-yellow rounded-full animate-sparkle shadow-lg shadow-neon-yellow/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-2 -right-6 w-3 h-3 bg-neon-pink rounded-full animate-pulse-glow shadow-lg shadow-neon-pink/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 left-2 w-3 h-3 bg-neon-purple rounded-full animate-sparkle shadow-lg shadow-neon-purple/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-2 -right-4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow shadow-lg shadow-neon-cyan/50"
            />
          </>
        );
      case 'sad':
        return (
          <>
            {/* CSS-based tear drop */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-blue-300 rounded-full"
              style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const animationVariants = getAnimationVariants();

  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      <motion.div
        key={emotion} // Force re-render on emotion change
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          className="relative"
          {...animationVariants}
        >
          <img
            src={getStickerPath(emotion)}
            alt={`Chibi mascot feeling ${emotion}`}
            className="chibi-size-override drop-shadow-2xl"
            style={{
              width: '100px !important',
              height: '100px !important',
              maxWidth: '100px !important',
              maxHeight: '100px !important',
              minWidth: '100px !important',
              minHeight: '100px !important'
            }}
          />
          {getDecorations(emotion)}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sticker;
