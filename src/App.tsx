import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import HomeScreen from './components/HomeScreen';
import CharacterSelectionPhase from './components/CharacterSelectionPhase';
import GameLayout from './components/GameLayout';
import BotEngineSelection from './components/BotEngineSelection';

function App() {
  const dispatch = useDispatch();
  const { 
    gameMode,
    botEngines,
    gameStarted
  } = useSelector((state: RootState) => state.game);

  // Step 1: Home Screen (Mode Selection)
  if (!gameMode) {
    return <HomeScreen />;
  }

  // Step 2a: Bot Engine Selection (Only for BOT mode)
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection onComplete={() => {
      dispatch({ type: 'game/startCharacterSelection' });
    }} />;
  }

  // Step 2b: Character Selection Phase
  if (!gameStarted) {
    return <CharacterSelectionPhase />;
  }

  // Step 3: Main Game
  return <GameLayout />;
}

export default App;
