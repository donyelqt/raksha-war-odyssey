import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import HeroSelection from './components/HeroSelection/HeroSelection';
//import GameLayout from './components/GameLayout';
import GameLobby from './components/GameLobby/GameLobby';

function App() {
  const dispatch = useDispatch();
  const { 
    gameMode,
    characterSelectionPhase,
    //gameStarted
  } = useSelector((state: RootState) => state.game);

  // Always start with GameLobby
  if (!gameMode) {
    return <GameLobby />;
  }

  // Hero Selection Phase
  if (characterSelectionPhase) {
    return <HeroSelection 
      onHeroSelect={(hero) => {
        dispatch({ type: 'game/selectHero', payload: hero });
      }}
    />;
  }

  // Main Game
  //if (gameStarted) {
   // return <GameLayout />;
  //}

  // Default fallback to GameLobby
  return <GameLobby />;
}

export default App;
