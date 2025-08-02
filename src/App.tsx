import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import QuizEngine from './components/QuizEngine';
import ResultScreen from './components/ResultScreen';
import KawaiiEffects from './components/KawaiiEffects';
import KawaiiPageTransition from './components/KawaiiPageTransition';
import KawaiiConfetti from './components/KawaiiConfetti';

type GameState = 'intro' | 'quiz' | 'result';

interface GameResult {
  score: number;
  totalQuestions: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameResult, setGameResult] = useState<GameResult>({ score: 0, totalQuestions: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStartQuiz = () => {
    setGameState('quiz');
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setGameResult({ score, totalQuestions });
    setGameState('result');
    setShowConfetti(true);
    // Stop confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleRestart = () => {
    setGameResult({ score: 0, totalQuestions: 0 });
    setGameState('intro');
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Cool Anime Background */}
      <div className="anime-background"></div>

      {/* Kawaii Decorative Effects */}
      <KawaiiEffects />

      {/* Confetti Celebration */}
      <KawaiiConfetti isActive={showConfetti} />

      {/* Page Transitions with Kawaii Effects */}
      <KawaiiPageTransition pageKey={gameState} direction="right">
        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <IntroScreen key="intro" onStart={handleStartQuiz} />
          )}
          {gameState === 'quiz' && (
            <QuizEngine key="quiz" onComplete={handleQuizComplete} />
          )}
          {gameState === 'result' && (
            <ResultScreen
              key="result"
              score={gameResult.score}
              totalQuestions={gameResult.totalQuestions}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </KawaiiPageTransition>
    </div>
  );
}

export default App;
