import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const GameRules: React.FC = () => {
  const { gameMode, players, currentTurn } = useSelector((state: RootState) => state.game);

  const currentPlayerViolations = players[currentTurn].consecutiveInvalidActions;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Game Rules</h2>
      <div className="space-y-2">
        <div className="text-yellow-400">
          Turn Timer: {gameMode === 'PVP' ? '10' : '3'} seconds
        </div>
        <div className="text-red-400">
          Violations: {currentPlayerViolations}/3
        </div>
        <div className="text-sm text-gray-400 mt-4">
          <p>• Move to adjacent squares only</p>
          <p>• Attack enemies in adjacent squares</p>
          <p>• Use skills within their range</p>
          <p>• Capture castle to win</p>
          <p>• 3 violations = loss</p>
        </div>
      </div>
    </div>
  );
};

export default GameRules; 