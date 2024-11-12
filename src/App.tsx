import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import FindMatchScreen from './components/FindMatch/FindMatchScreen';
import CharacterSelection from './components/CharacterSelection';
import GameLayout from './components/GameLayout';
import BotEngineSelection from './components/BotEngineSelection';
import GameOverview from './components/GameOverview';

function App() {
  const dispatch = useDispatch();
  const { 
    gameMode,
    characterSelectionPhase,
    botEngines,
    showGameOverview 
  } = useSelector((state: RootState) => state.game);

  // Show game overview first time
  if (showGameOverview) {
    return <GameOverview onClose={() => dispatch({ type: 'game/hideGameOverview' })} />;
  }

  // Show find match screen if no game mode selected
  if (!gameMode) {
    return <FindMatchScreen />;
  }

  // Show bot engine selection for BOT mode before character selection
  if (gameMode === 'BOT' && (!botEngines.player1 || !botEngines.player2)) {
    return <BotEngineSelection />;
  }

  // Show character selection after game mode is selected
  if (characterSelectionPhase) {
    return <CharacterSelection />;
  }

  // Show main game layout
  return <GameLayout />;
}

export default App;
