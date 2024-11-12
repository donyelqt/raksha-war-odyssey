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
import GameHeader from './GameHeader';
import GameRules from './GameRules';
import WinCondition from './WinCondition';
import TurnViolation from './TurnViolation';

const GameLayout: React.FC = () => {
  const { gameMode } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <GameHeader />
        <TurnViolation />
        
        <div className="flex gap-4">
          {/* Left Sidebar */}
          <div className="w-72 space-y-4">
            <PlayerInfo 
              playerId="player1"
              className="bg-gradient-to-br from-blue-900 to-blue-800"
            />
            <GameRules />
          </div>

          {/* Game Board */}
          <div className="flex-1 flex flex-col">
            <div className="relative bg-gray-800 p-4 rounded-lg">
              <GameBoard size={9} />
              <SkillBar onSkillSelect={() => {}} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 space-y-4">
            <PlayerInfo 
              playerId="player2"
              className="bg-gradient-to-br from-red-900 to-red-800"
            />
            <GameInfo />
            <GameStats />
            {gameMode === 'BOT' && <BotBattleStatus />}
            <MatchHistory limit={3} />
          </div>
        </div>

        <WinCondition />
      </div>
    </div>
  );
};

export default GameLayout; 