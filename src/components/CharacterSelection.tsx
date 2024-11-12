import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectCharacterInPhase } from '../store/gameSlice';
import { Character } from '../types/game.types';

const CharacterSelection: React.FC = () => {
  const dispatch = useDispatch();
  const { availableCharacters, currentTurn, players } = useSelector((state: RootState) => state.game);

  const handleCharacterSelect = (character: Character) => {
    dispatch(selectCharacterInPhase(character));
  };

  const totalSelectedCharacters = players.player1.characters.length + players.player2.characters.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Character Selection</h1>
          <p className="text-xl text-blue-400">{currentTurn}'s Turn to Choose (Character {totalSelectedCharacters + 1}/4)</p>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {availableCharacters.map((character: Character) => {
            const isSelected = players.player1.characters.some(c => c.id === character.id) ||
                               players.player2.characters.some(c => c.id === character.id);
            
            return (
              <div
                key={character.id}
                className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 ${
                  isSelected ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                }`}
                onClick={() => !isSelected && handleCharacterSelect(character)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                  <img
                    src={`/characters/${character.id}.png`}
                    alt={character.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Health:</span>
                      <span>{character.health}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defense:</span>
                      <span>{character.defense}</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold mb-2">Skills:</h4>
                      <ul className="space-y-1">
                        {character.skills.map(skill => (
                          <li key={skill.id} className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span>Range: {skill.range}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Player 1 Selection</h3>
            <div className="flex gap-4">
              {players.player1.characters.map((char: Character) => (
                <div key={char.id} className="w-12 h-12 bg-blue-500 rounded-full" />
              ))}
              {Array(2 - players.player1.characters.length).fill(null).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-700 rounded-full" />
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Player 2 Selection</h3>
            <div className="flex gap-4">
              {players.player2.characters.map((char: Character) => (
                <div key={char.id} className="w-12 h-12 bg-red-500 rounded-full" />
              ))}
              {Array(2 - players.player2.characters.length).fill(null).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-700 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;