import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import GameStats from './GameStats';
import BotBattleStatus from './BotBattleStatus';
import MatchHistory from './MatchHistory';

const GameLayout: React.FC = () => {
  const { gameMode } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Raksha: War Odyssey</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
              Settings
            </button>
            <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
              Surrender
            </button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex gap-6">
          {/* Left Sidebar - Player 1 Info */}
          <div className="w-64 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Player 1</h2>
              <PlayerStats playerId="player1" />
            </div>
          </div>

          {/* Game Board */}
          <div className="flex-1">
            <GameBoard size={9} />
          </div>

          {/* Right Sidebar - Game Info & Stats */}
          <div className="w-64 space-y-4">
            <GameInfo />
            <GameStats />
            {gameMode === 'BOT' && <BotBattleStatus />}
            <MatchHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for player stats
const PlayerStats: React.FC<{ playerId: string }> = ({ playerId }) => {
  const { players } = useSelector((state: RootState) => state.game);
  const player = players[playerId];

  return (
    <div className="space-y-2">
      {player.characters.map(char => (
        <div key={char.id} className="bg-gray-700 p-2 rounded">
          <div className="flex justify-between items-center">
            <span>{char.name}</span>
            <span>HP: {char.health}/100</span>
          </div>
          <div className="h-2 bg-gray-600 rounded mt-1">
            <div 
              className="h-full bg-green-500 rounded"
              style={{ width: `${char.health}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameLayout; 