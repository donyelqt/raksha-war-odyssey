import React from 'react';
import { Position } from '../types/game.types';

interface ActionFeedbackProps {
  type: 'move' | 'attack' | 'skill';
  text: string;
  position: Position;
  onComplete: () => void;
}

const ActionFeedback: React.FC<ActionFeedbackProps> = ({
  type,
  text,
  position,
  onComplete
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getTypeStyles = () => {
    switch (type) {
      case 'move':
        return 'bg-blue-500';
      case 'attack':
        return 'bg-red-500';
      case 'skill':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded
        ${getTypeStyles()} text-white text-sm font-bold animate-bounce`}
      style={{
        left: `${position.x * 64 + 32}px`,
        top: `${position.y * 64 + 32}px`,
      }}
    >
      {text}
    </div>
  );
};

export default ActionFeedback; 