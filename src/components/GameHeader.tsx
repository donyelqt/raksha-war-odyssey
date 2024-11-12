import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Timer from './Timer';

const GameHeader: React.FC = () => {
  const { gameMode, currentTurn, botBattleMatchCount } = useSelector((state: RootState) => state.game);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Raksha: War Odyssey</h1>
          {gameMode === 'BOT' && (
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              Match {botBattleMatchCount}/7
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-6">
          <div className={`text-xl font-bold ${
            currentTurn === 'player1' ? 'text-blue-500' : 'text-red-500'
          }`}>
            {currentTurn === 'player1' ? 'Player 1' : 'Player 2'}'s Turn
          </div>
          <Timer />
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              Settings
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Surrender
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader; 