import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Character } from '../types/game.types';

interface PlayerInfoProps {
  playerId: 'player1' | 'player2';
  className?: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerId, className = '' }) => {
  const { players, currentTurn } = useSelector((state: RootState) => state.game);
  const player = players[playerId];
  const isCurrentPlayer = currentTurn === playerId;

  return (
    <div className={`rounded-lg overflow-hidden ${className} ${
      isCurrentPlayer ? 'ring-2 ring-yellow-500' : ''
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {playerId === 'player1' ? 'Player 1' : 'Player 2'}
          </h2>
          {isCurrentPlayer && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm">
              Current Turn
            </span>
          )}
        </div>

        <div className="space-y-4">
          {player.characters.map((character: Character) => (
            <div key={character.id} className="bg-black bg-opacity-30 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <img 
                  src={`/characters/${character.id}.png`} 
                  alt={character.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold">{character.name}</div>
                  <div className="text-sm opacity-75">Level 1</div>
                </div>
              </div>

              {/* Health Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>HP</span>
                  <span>{character.health}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${character.health}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="mt-2 grid grid-cols-3 gap-1">
                {character.skills.map(skill => (
                  <div
                    key={skill.id}
                    className={`text-center p-1 rounded ${
                      skill.cooldown > 0 
                        ? 'bg-gray-700 opacity-50' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    <div className="text-xs font-bold">{skill.name}</div>
                    {skill.cooldown > 0 && (
                      <div className="text-xs text-red-400">{skill.cooldown}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo; 