import React from 'react';

interface TurnIndicatorProps {
  currentTurn: string;
  turnTimer: number;
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ currentTurn, turnTimer }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 
      bg-gray-800 rounded-full px-6 py-2 flex items-center gap-4 shadow-lg">
      <div className={`text-xl font-bold ${
        currentTurn === 'player1' ? 'text-blue-500' : 'text-red-500'
      }`}>
        {currentTurn === 'player1' ? 'Player 1' : 'Player 2'}
      </div>
      <div className="text-2xl font-mono">
        <span className={turnTimer <= 3 ? 'text-red-500' : 'text-white'}>
          {turnTimer}
        </span>
      </div>
    </div>
  );
};

export default TurnIndicator; 