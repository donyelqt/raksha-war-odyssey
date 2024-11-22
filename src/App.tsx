import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BotBattleLobby from './components/GameLobby/BotBattleLobby';
import PVPGameLobby from './components/GameLobby/PVPGameLobby';
import P1HeroSelection from './components/HeroSelection/P1HeroSelection';
import P2HeroSelection from './components/HeroSelection/P2HeroSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PVPGameLobby />} />
        <Route path="/pvp-battle-lobby" element={<PVPGameLobby />} />
        <Route path="/bot-battle-lobby" element={<BotBattleLobby />} />
        <Route path="/p1-hero-selection" element={<P1HeroSelection />} />
        <Route path="/p2-hero-selection" element={<P2HeroSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
