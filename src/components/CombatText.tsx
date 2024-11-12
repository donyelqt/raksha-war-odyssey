import React, { useEffect, useState } from 'react';
import { Position } from '../types/game.types';

interface CombatTextProps {
  text: string;
  type: 'damage' | 'heal' | 'effect';
  position: Position;
  onComplete: () => void;
}

const CombatText: React.FC<CombatTextProps> = ({ text, type, position, onComplete }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const animation = setInterval(() => {
      setOffset(prev => {
        if (prev > 30) {
          clearInterval(animation);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(animation);
  }, [onComplete]);

  const getTextColor = () => {
    switch (type) {
      case 'damage':
        return 'text-red-500';
      case 'heal':
        return 'text-green-500';
      case 'effect':
        return 'text-blue-500';
      default:
        return 'text-white';
    }
  };

  return (
    <div
      className={`absolute text-2xl font-bold ${getTextColor()} 
        transform -translate-x-1/2 pointer-events-none
        animate-fadeOut`}
      style={{
        left: `${position.x * 64 + 32}px`,
        top: `${position.y * 64 - offset}px`,
      }}
    >
      {text}
    </div>
  );
};

export default CombatText; 