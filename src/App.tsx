import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import HomeScreen from './components/HomeScreen';
import CharacterSelectionPhase from './components/character/CharacterSelectionPhase';
import BotEngineSelection from './components/battle/BotEngineSelection';
import GameLayout from './components/GameLayout';

function App() {
  const dispatch = useDispatch();
  const { 
    gameMode,
    botEngines,
    gameStarted
  } = useSelector((state: RootState) => state.game);

  // Step 1: Home Screen (Mode Selection)
  if (!gameMode) {
    return <HomeScreen onSelectMode={(mode: 'PVP' | 'BOT') => {
      dispatch({ type: 'game/setGameMode', payload: mode });
      if (mode === 'PVP') {
        dispatch({ type: 'game/setRandomFirstPlayer' });
        dispatch({ type: 'game/startCharacterSelection' });
      }
    }} />;
  }

  // Step 2a: Bot Engine Selection (Only for Player vs Bot mode)
  if (gameMode === 'BOT' && !botEngines.player2) {
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
