import React from 'react';
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
    characterSelectionPhase,
    botEngines,
    gameStarted
  } = useSelector((state: RootState) => state.game);

  // Step 1: Find Match Screen (Initial Screen)
  if (!gameMode) {
    return <FindMatch onSelectMode={(mode) => {
      dispatch({ type: 'game/setGameMode', payload: mode });
      // For PVP mode, randomly select first player
      if (mode === 'PVP') {
        dispatch({ type: 'game/setRandomFirstPlayer' });
      }
    }} />;
  }

  // Step 2a: Bot Engine Selection (Only for BOT mode)
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection />;
  }

  // Step 2b: Character Selection Phase
  if (!gameStarted) {
    return <CharacterSelectionPhase />;
  }

  // Step 3: Main Game
  return <GameLayout />;
}

export default App;
