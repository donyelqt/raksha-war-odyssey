import React from 'react';
import { Position } from '../types/game.types';

interface CastleProps {
  position: Position;
  playerId: string;
  isCurrentPlayer: boolean;
}

const Castle: React.FC<CastleProps> = ({ position, playerId, isCurrentPlayer }) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14
        ${playerId === 'player1' ? 'bg-blue-700' : 'bg-red-700'}
        ${isCurrentPlayer ? 'ring-2 ring-yellow-400' : ''}
        rounded-lg border-4 border-gray-800 flex items-center justify-center`}
      style={{
        left: `${position.x * 64 + 32}px`,
        top: `${position.y * 64 + 32}px`,
      }}
    >
      <span className="text-white text-2xl">🏰</span>
    </div>
  );
};

export default Castle; 