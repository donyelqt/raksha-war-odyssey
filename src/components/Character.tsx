import React, { useState } from 'react';
import { Character as CharacterType } from '../types/game.types';
import CharacterSprite from './CharacterSprite';

interface CharacterProps {
  character: CharacterType;
  isSelected: boolean;
  isCurrentPlayer: boolean;
  onClick: () => void;
}

const Character: React.FC<CharacterProps> = ({
  character,
  isSelected,
  isCurrentPlayer,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14
        ${isSelected ? 'ring-4 ring-blue-500' : ''}
        ${isCurrentPlayer ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
        transition-all duration-200`}
      style={{
        left: `${character.position.x * 64 + 32}px`,
        top: `${character.position.y * 64 + 32}px`,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CharacterSprite character={character} isAnimating={isSelected} />
      
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48
          bg-gray-800 text-white p-2 rounded shadow-lg text-sm">
          <div className="font-bold mb-1">{character.name}</div>
          <div className="flex justify-between mb-1">
            <span>HP:</span>
            <span>{character.health}/100</span>
          </div>
          <div className="text-xs">
            {character.skills.map(skill => (
              <div key={skill.id} className="flex justify-between">
                <span>{skill.name}</span>
                <span>Range: {skill.range}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Character; 