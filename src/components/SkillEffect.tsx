import React, { useEffect, useState } from 'react';
import { Position } from '../types/game.types';

interface SkillEffectProps {
  type: 'damage' | 'heal' | 'defense' | 'control';
  position: Position;
  onComplete: () => void;
}

const SkillEffect: React.FC<SkillEffectProps> = ({ type, position, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getEffectStyle = () => {
    switch (type) {
      case 'damage':
        return 'bg-red-500 animate-pulse';
      case 'heal':
        return 'bg-green-500 animate-bounce';
      case 'defense':
        return 'bg-blue-500 animate-spin';
      case 'control':
        return 'bg-yellow-500 animate-ping';
      default:
        return '';
    }
  };

  if (!isAnimating) return null;

  return (
    <div
      className={`absolute w-16 h-16 opacity-50 rounded-full ${getEffectStyle()}`}
      style={{
        left: `${position.x * 64}px`,
        top: `${position.y * 64}px`,
        transition: 'all 0.3s ease-in-out',
      }}
    />
  );
};

export default SkillEffect; 