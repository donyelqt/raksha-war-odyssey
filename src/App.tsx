import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLobby from './components/GameLobby/GameLobby';
import BotBattleLobby from './components/GameLobby/BotBattleLobby';
import HeroSelection from './components/HeroSelection/HeroSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/bot-battle-lobby" element={<BotBattleLobby />} />
        <Route path="/hero-selection" element={<HeroSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
