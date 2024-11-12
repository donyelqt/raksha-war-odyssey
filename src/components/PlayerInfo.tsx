import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Character } from '../types/game.types';

interface PlayerInfoProps {
  playerId: 'player1' | 'player2';
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerId }) => {
  const { players, currentTurn } = useSelector((state: RootState) => state.game);
  const player = players[playerId];

  return (
    <div className={`bg-gray-800 p-4 rounded-lg ${currentTurn === playerId ? 'ring-2 ring-blue-500' : ''}`}>
      <h2 className="text-xl font-bold mb-4">{playerId === 'player1' ? 'Player 1' : 'Player 2'}</h2>
      {player.characters.map((character: Character) => (
        <div key={character.id} className="mb-4">
          <div className="flex items-center mb-2">
            <img src={`/characters/${character.id}.png`} alt={character.name} className="w-10 h-10 mr-2 rounded-full" />
            <span className="font-bold">{character.name}</span>
          </div>
          <div className="bg-gray-700 rounded-full h-2 mb-1">
            <div
              className="bg-green-500 rounded-full h-full"
              style={{ width: `${(character.health / 100) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm flex justify-between">
            <span>HP: {character.health}/100</span>
            <span>DEF: {character.defense}</span>
          </div>
          <div className="mt-2">
            {character.skills.map(skill => (
              <div key={skill.id} className="text-sm flex justify-between">
                <span>{skill.name}</span>
                <span>CD: {skill.cooldown}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo; 