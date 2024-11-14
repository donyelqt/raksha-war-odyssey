import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../types/game.types';
import { RootState } from '../../store';
import { resetGameMode } from '../../store/gameSlice';


const CharacterSelectionPhase: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTurn, players, availableCharacters } = useSelector((state: RootState) => state.game);
  const totalSelected = players.player1.characters.length + players.player2.characters.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCharacterSelect = (character: Character) => {
    dispatch({ type: 'game/selectCharacterInPhase', payload: character });
  };

  const handleBack = () => {
    dispatch(resetGameMode()); // Reset the game mode to go back to the HomeScreen
  };


  // Show 5 characters per slide
  const charactersPerSlide = 5;
  const totalSlides = Math.ceil(availableCharacters.length / charactersPerSlide);
  const visibleCharacters = availableCharacters.slice(
    currentSlide * charactersPerSlide,
    (currentSlide + 1) * charactersPerSlide
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Character Selection</h1>
          <p className="text-xl text-blue-400">{currentTurn}'s Turn to Choose (Character {totalSelected + 1}/4)</p>
        </header>

        {/* Character Slider */}
        <div className="relative">
          {/* Previous Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16
              bg-gray-800 p-4 rounded-full hover:bg-gray-700 z-10"
            onClick={previousSlide}
          >
            ←
          </button>

          {/* Character Grid */}
          <div className="grid grid-cols-5 gap-6">
            {visibleCharacters.map((character: Character) => {
              const isSelected = players.player1.characters.some(c => c.id === character.id) ||
                               players.player2.characters.some(c => c.id === character.id);
              
              return (
                <div
                  key={character.id}
                  className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 
                    ${isSelected ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}`}
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

          {/* Next Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16
              bg-gray-800 p-4 rounded-full hover:bg-gray-700 z-10"
            onClick={nextSlide}
          >
            →
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors
                  ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-600'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Selection Progress */}
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