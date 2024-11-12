import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import FindMatch from './components/FindMatch';
import CharacterSelection from './components/CharacterSelection';
import GameLayout from './components/GameLayout';
import BotEngineSelection from './components/BotEngineSelection';

function App() {
  const dispatch = useDispatch();
  const { characterSelectionPhase, gameMode, botEngines } = useSelector((state: RootState) => state.game);

  if (!gameMode) {
    return <FindMatch onSelectMode={(mode) => {
      dispatch({ type: 'game/setGameMode', payload: mode });
    }} />;
  }

  // Show bot engine selection for BOT mode
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection />;
  }

  if (characterSelectionPhase) {
    return <CharacterSelection />;
  }

  return <GameLayout />;
}

export default App;
