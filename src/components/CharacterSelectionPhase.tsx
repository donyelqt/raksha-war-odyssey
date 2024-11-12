import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Character } from '../types/game.types';

const CharacterSelectionPhase: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTurn, players, availableCharacters } = useSelector((state: RootState) => state.game);
  const totalSelected = players.player1.characters.length + players.player2.characters.length;

  useEffect(() => {
    // Announce first player
    if (totalSelected === 0) {
      const message = `${currentTurn === 'player1' ? 'Player 1' : 'Player 2'} was randomly selected to choose first!`;
      // You can implement a notification system here
      console.log(message);
    }
  }, [currentTurn, totalSelected]);

  const handleCharacterSelect = (character: Character) => {
    dispatch({ type: 'game/selectCharacterInPhase', payload: character });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Character Selection</h1>
          <p className="text-xl text-blue-400">
            {currentTurn === 'player1' ? 'Player 1' : 'Player 2'}'s Turn
          </p>
          <p className="text-gray-400">
            Select Character {totalSelected + 1}/4
          </p>
        </header>

        {/* Character Grid */}
        <div className="grid grid-cols-3 gap-6">
          {availableCharacters.map(character => {
            const isSelected = 
              players.player1.characters.some(c => c.id === character.id) ||
              players.player2.characters.some(c => c.id === character.id);

            return (
              <div
                key={character.id}
                className={`bg-gray-800 rounded-lg p-6 transition-all duration-200
                  ${isSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => !isSelected && handleCharacterSelect(character)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full">
                    <img
                      src={`/characters/${character.id}.png`}
                      alt={character.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{character.name}</h3>
                    <p className="text-gray-400">HP: {character.health}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold">Skills:</h4>
                  {character.skills.map(skill => (
                    <div key={skill.id} className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>Range: {skill.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Progress */}
        <div className="mt-8 flex justify-between">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Player 1's Characters</h3>
            <div className="flex gap-2">
              {players.player1.characters.map(char => (
                <div key={char.id} className="w-12 h-12 bg-blue-600 rounded-full" />
              ))}
              {Array(2 - players.player1.characters.length).fill(null).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-700 rounded-full" />
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Player 2's Characters</h3>
            <div className="flex gap-2">
              {players.player2.characters.map(char => (
                <div key={char.id} className="w-12 h-12 bg-red-600 rounded-full" />
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

export default CharacterSelectionPhase; 