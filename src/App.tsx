import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import FindMatch from './components/FindMatch';
import CharacterSelection from './components/CharacterSelection';
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

  // Show find match screen if no game mode selected
  if (!gameMode) {
    return <FindMatch onSelectMode={(mode) => {
      dispatch({ type: 'game/setGameMode', payload: mode });
      // For PVP mode, randomly select first player
      if (mode === 'PVP') {
        dispatch({ type: 'game/setRandomFirstPlayer' });
      }
    }} />;
  }

  // Show bot engine selection for BOT mode before character selection
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection />;
  }

  // Show character selection before game starts
  if (characterSelectionPhase) {
    return <CharacterSelection />;
  }

  // Show main game layout
  return <GameLayout />;
}

export default App;
