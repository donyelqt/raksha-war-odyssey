import React from 'react';
import { Character as CharacterType } from '../types/game.types';

interface CharacterProps {
  character: CharacterType;
  isSelected: boolean;
  onClick: () => void;
}

const Character: React.FC<CharacterProps> = ({ character, isSelected, onClick }) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full 
        ${isSelected ? 'ring-4 ring-blue-500' : ''}
        cursor-pointer transition-all duration-200`}
      style={{
        left: `${character.position.x * 64 + 32}px`,
        top: `${character.position.y * 64 + 32}px`,
      }}
      onClick={onClick}
    >
      <img
        src={`/characters/${character.name.toLowerCase()}.png`}
        alt={character.name}
        className="w-full h-full rounded-full"
      />
    </div>
  );
};

export default Character; 