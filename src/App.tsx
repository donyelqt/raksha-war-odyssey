import { useState } from 'react';
import { useSelector } from 'react-redux';
import GameBoard from './components/GameBoard';
import CharacterSelection from './components/CharacterSelection';
import GameInfo from './components/GameInfo';
import MatchHistory from './components/MatchHistory';
import GameStats from './components/GameStats';
import BotBattleStatus from './components/BotBattleStatus';
import { RootState } from './store';

function App() {
  const [gameMode, setGameMode] = useState<'PVP' | 'BOT' | null>(null);
  const { characterSelectionPhase, gameOver } = useSelector((state: RootState) => state.game);

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
          <div className="space-y-8">
            <div className="flex gap-8">
              <div className="flex-1">
                <GameBoard size={9} />
              </div>
              <div className="w-64 space-y-4">
                <GameInfo />
                <GameStats />
                {gameMode === 'BOT' && <BotBattleStatus />}
                <MatchHistory />
              </div>
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Game Over</h2>
              <div className="mb-4">
                <GameStats />
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
