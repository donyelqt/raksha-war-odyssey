import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBotEngine } from '../store/gameSlice';

const botEngines = [
  { id: 'aggressive', name: 'Aggressive Bot', description: 'Focuses on attacking and dealing damage' },
  { id: 'defensive', name: 'Defensive Bot', description: 'Prioritizes survival and defensive strategies' },
  { id: 'balanced', name: 'Balanced Bot', description: 'Uses a mix of offensive and defensive tactics' },
];

interface BotEngineSelectionProps {
  onComplete: () => void;
}

const BotEngineSelection: React.FC<BotEngineSelectionProps> = ({ onComplete }) => {
  const dispatch = useDispatch();
  const [player1Bot, setPlayer1Bot] = useState('');
  const [player2Bot, setPlayer2Bot] = useState('');

  const handleStartBattle = () => {
    if (player1Bot && player2Bot) {
      dispatch(setBotEngine({ player: 'player1', engineId: player1Bot }));
      dispatch(setBotEngine({ player: 'player2', engineId: player2Bot }));
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Select Bot Engines</h1>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Player 1 Bot</h2>
            <select 
              className="w-full bg-gray-800 p-2 rounded"
              value={player1Bot}
              onChange={(e) => setPlayer1Bot(e.target.value)}
            >
              <option value="">Select Bot Engine</option>
              {botEngines.map(engine => (
                <option key={engine.id} value={engine.id}>{engine.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Player 2 Bot</h2>
            <select 
              className="w-full bg-gray-800 p-2 rounded"
              value={player2Bot}
              onChange={(e) => setPlayer2Bot(e.target.value)}
            >
              <option value="">Select Bot Engine</option>
              {botEngines.map(engine => (
                <option key={engine.id} value={engine.id}>{engine.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bot Descriptions</h2>
          {botEngines.map(engine => (
            <div key={engine.id} className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="text-xl font-bold mb-2">{engine.name}</h3>
              <p>{engine.description}</p>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartBattle}
          disabled={!player1Bot || !player2Bot}
        >
          Start Bot Battle
        </button>
      </div>
    </div>
  );
};

export default BotEngineSelection; 