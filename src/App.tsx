import { useState } from 'react';
import { useSelector } from 'react-redux';
import GameBoard from './components/GameBoard';
import CharacterSelection from './components/CharacterSelection';
import { Position } from './types/game.types';
import { RootState } from './store';

function App() {
  const [gameMode, setGameMode] = useState<'PVP' | 'BOT' | null>(null);
  const { characterSelectionPhase } = useSelector((state: RootState) => state.game);

  const handleSquareClick = (position: Position) => {
    console.log('Clicked position:', position);
  };

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Raksha: War Odyssey</h1>
          <button
            onClick={() => setGameMode('PVP')}
            className="block w-48 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            PVP Battle
          </button>
          <button
            onClick={() => setGameMode('BOT')}
            className="block w-48 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Bot Battle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Raksha: War Odyssey</h1>
          <p className="text-gray-400">{gameMode} Battle Mode</p>
        </header>
        
        {characterSelectionPhase ? (
          <CharacterSelection />
        ) : (
          <div className="flex gap-8">
            <div className="flex-1">
              <GameBoard size={9} onSquareClick={handleSquareClick} />
            </div>
            
            <div className="w-64 bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Game Info</h2>
              <div className="space-y-2">
                <p>Current Turn: Player 1</p>
                <p>Time Remaining: 10s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
