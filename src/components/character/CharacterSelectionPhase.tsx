import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Character } from '../../types/game.types';
import { resetGameMode } from '../../store/gameSlice'; // Import the action to reset game mode

const CharacterSelectionPhase: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTurn, players, availableCharacters } = useSelector((state: RootState) => state.game);
  const totalSelected = players.player1.characters.length + players.player2.characters.length;

  const handleCharacterSelect = (character: Character) => {
    dispatch({ type: 'game/selectCharacterInPhase', payload: character });
  };

  const handleBack = () => {
    dispatch(resetGameMode()); // Reset the game mode to go back to the HomeScreen
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Character Selection</h1>
          <p className="text-xl text-blue-400">{currentTurn}'s Turn to Choose (Character {totalSelected + 1}/4)</p>
        </header>

        {/* Character Grid */}
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
                {/* Character card content */}
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-bold
              transition-all duration-300 transform hover:scale-105"
            onClick={handleBack}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectionPhase; 