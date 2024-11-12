import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const GameStats: React.FC = () => {
  const { turnCount, gameMode, botBattleMatchCount } = useSelector((state: RootState) => state.game);
  const { player1, player2 } = useSelector((state: RootState) => state.game.players);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Game Statistics</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Turn Count:</span>
          <span>{turnCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Game Mode:</span>
          <span>{gameMode}</span>
        </div>
        {gameMode === 'BOT' && (
          <div className="flex justify-between">
            <span>Bot Battle Match:</span>
            <span>{botBattleMatchCount}/7</span>
          </div>
        )}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Player Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-blue-400">Player 1</h4>
              {player1.characters.map(char => (
                <div key={char.id} className="text-sm">
                  {char.name}: {char.health}HP
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-red-400">Player 2</h4>
              {player2.characters.map(char => (
                <div key={char.id} className="text-sm">
                  {char.name}: {char.health}HP
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats; 