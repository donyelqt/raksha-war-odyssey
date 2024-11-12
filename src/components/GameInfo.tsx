import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Timer from './Timer';

const GameInfo: React.FC = () => {
  const { currentTurn, winner, gameOver } = useSelector((state: RootState) => state.game);

  return (
    <div className="w-64 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Game Info</h2>
      <div className="space-y-2">
        {!gameOver ? (
          <>
            <p>Current Turn: {currentTurn}</p>
            <Timer />
          </>
        ) : (
          <p className="text-2xl font-bold text-green-500">
            {winner} Wins!
          </p>
        )}
      </div>
    </div>
  );
};

export default GameInfo; 