import React from 'react';
import { Character as CharacterType } from '../types/game.types';

interface CharacterSpriteProps {
  character: CharacterType;
  isAnimating?: boolean;
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({ character, isAnimating }) => {
  const getCharacterSprite = () => {
    switch (character.id) {
      case 'warrior':
        return '/sprites/warrior.png';
      case 'archer':
        return '/sprites/archer.png';
      default:
        return '/sprites/default.png';
    }
  };

  return (
    <div className={`w-full h-full ${isAnimating ? 'animate-bounce' : ''}`}>
      <img
        src={getCharacterSprite()}
        alt={character.name}
        className="w-full h-full object-contain"
      />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${(character.health / 100) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CharacterSprite; 