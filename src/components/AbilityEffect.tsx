import React, { useEffect, useState } from 'react';
import { Position } from '../types/game.types';

interface AbilityEffectProps {
  type: 'damage' | 'heal' | 'defense' | 'control' | 'movement' | 'aoe';
  sourcePosition: Position;
  targetPosition: Position;
  onComplete: () => void;
}

const AbilityEffect: React.FC<AbilityEffectProps> = ({
  type,
  sourcePosition,
  targetPosition,
  onComplete
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (frame < 5) {
        setFrame(prev => prev + 1);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [frame, onComplete]);

  const getEffectStyle = () => {
    const progress = frame / 5;
    const x = sourcePosition.x + (targetPosition.x - sourcePosition.x) * progress;
    const y = sourcePosition.y + (targetPosition.y - sourcePosition.y) * progress;

    return {
      left: `${x * 64}px`,
      top: `${y * 64}px`,
    };
  };

  const getEffectClass = () => {
    switch (type) {
      case 'damage':
        return 'bg-red-500 animate-pulse';
      case 'heal':
        return 'bg-green-500 animate-bounce';
      case 'defense':
        return 'bg-blue-500 animate-spin';
      case 'control':
        return 'bg-yellow-500 animate-ping';
      case 'movement':
        return 'bg-purple-500 animate-pulse';
      case 'aoe':
        return 'bg-orange-500 animate-ping';
      default:
        return '';
    }
  };

  return (
    <div
      className={`absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 
        rounded-full opacity-75 ${getEffectClass()}`}
      style={getEffectStyle()}
    />
  );
};

export default AbilityEffect; 