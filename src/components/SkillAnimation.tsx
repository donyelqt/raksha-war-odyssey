import React, { useEffect, useState } from 'react';
import { Position, Skill } from '../types/game.types';

interface SkillAnimationProps {
  skill: Skill;
  sourcePosition: Position;
  targetPosition: Position;
  onComplete: () => void;
}

const SkillAnimation: React.FC<SkillAnimationProps> = ({
  skill,
  sourcePosition,
  targetPosition,
  onComplete
}) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStep < 3) {
        setAnimationStep(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [animationStep, onComplete]);

  const getAnimationStyle = () => {
    const progress = animationStep / 3;
    const x = sourcePosition.x + (targetPosition.x - sourcePosition.x) * progress;
    const y = sourcePosition.y + (targetPosition.y - sourcePosition.y) * progress;

    return {
      left: `${x * 64 + 32}px`,
      top: `${y * 64 + 32}px`,
    };
  };

  const getEffectClass = () => {
    switch (skill.effect) {
      case 'damage':
        return 'bg-red-500';
      case 'heal':
        return 'bg-green-500';
      case 'defense':
        return 'bg-blue-500';
      case 'control':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 
        ${getEffectClass()} animate-pulse transition-all duration-200`}
      style={getAnimationStyle()}
    />
  );
};

export default SkillAnimation; 