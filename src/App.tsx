import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import FindMatch from './components/FindMatch';
import CharacterSelectionPhase from './components/CharacterSelectionPhase';
import GameLayout from './components/GameLayout';
import BotEngineSelection from './components/BotEngineSelection';

function App() {
  const dispatch = useDispatch();
  const { 
    gameMode,
    botEngines,
    characterSelectionPhase,
    gameStarted
  } = useSelector((state: RootState) => state.game);

  // Step 1: Initial Find Match Screen
  if (!gameMode) {
    return <FindMatch onSelectMode={(mode) => {
      dispatch({ type: 'game/setGameMode', payload: mode });
      if (mode === 'PVP') {
        dispatch({ type: 'game/setRandomFirstPlayer' });
        // For PVP, go directly to character selection
        dispatch({ type: 'game/startCharacterSelection' });
      }
      // For BOT mode, we'll go to bot engine selection first
    }} />;
  }

  // Step 2a: Bot Engine Selection (Only for BOT mode)
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection onComplete={() => {
      // After bot engines are selected, move to character selection
      dispatch({ type: 'game/startCharacterSelection' });
    }} />;
  }

  // Step 2b: Character Selection Phase
  if (characterSelectionPhase) {
    return <CharacterSelectionPhase />;
  }

  // Step 3: Main Game (only after character selection is complete)
  if (gameStarted) {
    return <GameLayout />;
  }

  // Fallback (shouldn't reach here)
  return <FindMatch onSelectMode={(mode) => dispatch({ type: 'game/setGameMode', payload: mode })} />;
}

export default App;
