import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectCharacter } from '../store/gameSlice';
import { Character } from '../types/game.types';

const CharacterSelection: React.FC = () => {
  const dispatch = useDispatch();
  const { availableCharacters, currentTurn, players } = useSelector((state: RootState) => state.game);

  const handleCharacterSelect = (character: Character) => {
    dispatch(selectCharacter(character));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Select Your Character</h2>
      <p className="mb-4 text-gray-400">{currentTurn}'s turn to choose</p>
      
      <div className="grid grid-cols-2 gap-4">
        {availableCharacters.map((character) => {
          const isSelected = players.player1.characters.some(c => c.id === character.id) ||
                           players.player2.characters.some(c => c.id === character.id);
          
          return (
            <button
              key={character.id}
              className={`p-4 rounded-lg ${
                isSelected 
                  ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => handleCharacterSelect(character)}
              disabled={isSelected}
            >
              <h3 className="text-lg font-bold">{character.name}</h3>
              <div className="mt-2 text-sm">
                <p>Health: {character.health}</p>
                <p>Skills: {character.skills.map(s => s.name).join(', ')}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelection; 