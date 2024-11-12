import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const BotBattleStatus: React.FC = () => {
  const { botBattleMatchCount, botBattleWins } = useSelector((state: RootState) => state.game);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Bot Battle Series</h2>
      <div className="flex justify-between">
        <span>Match:</span>
        <span>{botBattleMatchCount}/7</span>
      </div>
      <div className="flex justify-between">
        <span>Player 1:</span>
        <span>{botBattleWins.player1} wins</span>
      </div>
      <div className="flex justify-between">
        <span>Player 2 (Bot):</span>
        <span>{botBattleWins.player2} wins</span>
      </div>
    </div>
  );
};

export default BotBattleStatus; 