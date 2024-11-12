import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import GameStats from './GameStats';
import BotBattleStatus from './BotBattleStatus';
import MatchHistory from './MatchHistory';
import PlayerInfo from './PlayerInfo';
import SkillBar from './SkillBar';

const GameLayout: React.FC = () => {
  const { gameMode } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Game Header */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Raksha: War Odyssey</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
              Settings
            </button>
            <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
              Surrender
            </button>
          </div>
        </header>

        {/* Main Game Area */}
        <div className="flex gap-4">
          {/* Left Sidebar - Player 1 Info */}
          <div className="w-64">
            <PlayerInfo playerId="player1" />
          </div>

          {/* Game Board and Skill Bar */}
          <div className="flex-1 flex flex-col">
            <GameBoard size={9} />
            <SkillBar onSkillSelect={() => {}} />
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

export default GameLayout; 