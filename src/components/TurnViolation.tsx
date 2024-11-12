import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TurnViolation: React.FC = () => {
  const { players, currentTurn } = useSelector((state: RootState) => state.game);
  const violations = players[currentTurn].consecutiveInvalidActions;

  if (violations === 0) return null;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 
      bg-red-600 px-4 py-2 rounded-lg text-white text-sm animate-bounce">
      Warning: {violations} invalid {violations === 1 ? 'action' : 'actions'}! 
      ({3 - violations} remaining before loss)
    </div>
  );
};

export default TurnViolation; 