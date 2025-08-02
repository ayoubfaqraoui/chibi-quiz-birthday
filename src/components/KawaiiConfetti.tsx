import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KAWAII_COLORS = [
  '#FFB6C1', // Light Pink
  '#DDA0DD', // Plum
  '#98FB98', // Pale Green
  '#F0E68C', // Khaki
  '#87CEEB', // Sky Blue
  '#FFE4E1', // Misty Rose
  '#E6E6FA', // Lavender
  '#FFEFD5'  // Papaya Whip
];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  color: string;
  shape: 'heart' | 'star' | 'flower' | 'circle';
  life: number;
}

interface KawaiiConfettiProps {
  isActive: boolean;
  duration?: number;
  intensity?: number;
}

const KawaiiConfetti: React.FC<KawaiiConfettiProps> = ({ 
  isActive, 
  duration = 3000,
  intensity = 50 
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const createConfettiPiece = useCallback((x?: number, y?: number): ConfettiPiece => {
    const shapes: ConfettiPiece['shape'][] = ['heart', 'star', 'flower', 'circle'];
    
    return {
      id: Math.random(),
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? -20,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      scale: 0.5 + Math.random() * 1,
      color: KAWAII_COLORS[Math.floor(Math.random() * KAWAII_COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      life: 180 + Math.random() * 120
    };
  }, []);

  const createBurst = useCallback(() => {
    const pieces: ConfettiPiece[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create burst from center
    for (let i = 0; i < intensity; i++) {
      const angle = (i / intensity) * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      
      pieces.push({
        ...createConfettiPiece(),
        x: centerX + Math.cos(angle) * 50,
        y: centerY + Math.sin(angle) * 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5
      });
    }
    
    setConfetti(pieces);
  }, [intensity, createConfettiPiece]);

  // Start confetti when active
  useEffect(() => {
    if (isActive) {
      createBurst();
      
      // Add continuous pieces
      const interval = setInterval(() => {
        setConfetti(prev => [
          ...prev,
          ...Array.from({ length: 3 }, () => createConfettiPiece())
        ]);
      }, 200);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        // Let existing pieces fall
        setTimeout(() => setConfetti([]), 2000);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setConfetti([]);
    }
  }, [isActive, duration, createBurst, createConfettiPiece]);

  // Animate confetti
  useEffect(() => {
    if (confetti.length === 0) return;

    const interval = setInterval(() => {
      setConfetti(prev => prev
        .map(piece => ({
          ...piece,
          x: piece.x + piece.vx,
          y: piece.y + piece.vy,
          vy: piece.vy + 0.3, // gravity
          vx: piece.vx * 0.99, // air resistance
          rotation: piece.rotation + piece.rotationSpeed,
          life: piece.life - 1
        }))
        .filter(piece => piece.life > 0 && piece.y < window.innerHeight + 100)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [confetti.length]);

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle = {
      width: '12px',
      height: '12px',
      backgroundColor: piece.color,
    };

    switch (piece.shape) {
      case 'heart':
        return (
          <div 
            style={{
              ...baseStyle,
              transform: 'rotate(-45deg)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              backgroundColor: piece.color,
              borderRadius: '50%',
              top: '-6px',
              left: '0'
            }} />
            <div style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              backgroundColor: piece.color,
              borderRadius: '50%',
              top: '0',
              left: '6px'
            }} />
          </div>
        );
      
      case 'star':
        return (
          <div 
            style={{
              ...baseStyle,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      
      case 'flower':
        return (
          <div style={{ position: 'relative', width: '12px', height: '12px' }}>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  backgroundColor: piece.color,
                  borderRadius: '50%',
                  top: '3px',
                  left: '3px',
                  transform: `rotate(${angle}deg) translateY(-4px)`,
                  transformOrigin: 'center 4px'
                }}
              />
            ))}
            <div style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              top: '4px',
              left: '4px'
            }} />
          </div>
        );
      
      default: // circle
        return <div style={{ ...baseStyle, borderRadius: '50%' }} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {confetti.map(piece => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: piece.x,
              top: piece.y,
              transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
              opacity: Math.min(1, piece.life / 60)
            }}
            initial={{ scale: 0 }}
            animate={{ scale: piece.scale }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {renderShape(piece)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default KawaiiConfetti;
