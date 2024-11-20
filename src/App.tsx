import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BotBattleLobby from './components/GameLobby/BotBattleLobby';
import HeroSelection from './components/HeroSelection/HeroSelection';
import PVPGameLobby from './components/GameLobby/PVPGameLobby';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PVPGameLobby />} />
        <Route path="/pvp-battle-lobby" element={<PVPGameLobby />} />
        <Route path="/bot-battle-lobby" element={<BotBattleLobby />} />
        <Route path="/hero-selection" element={<HeroSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
