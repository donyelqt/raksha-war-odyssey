import React from 'react';
import { useDispatch } from 'react-redux';

interface BotEngine {
  id: string;
  name: string;
  description: string;
}

const availableBotEngines: BotEngine[] = [
  {
    id: 'aggressive',
    name: 'Aggressive Bot',
    description: 'Focuses on attacking and dealing damage',
  },
  {
    id: 'defensive',
    name: 'Defensive Bot',
    description: 'Prioritizes survival and defensive strategies',
  },
  {
    id: 'balanced',
    name: 'Balanced Bot',
    description: 'Uses a mix of offensive and defensive tactics',
  },
];

const BotEngineSelection: React.FC = () => {
  const dispatch = useDispatch();

  const handleEngineSelect = (player: 'player1' | 'player2', engineId: string) => {
    dispatch({
      type: 'game/setBotEngine',
      payload: { player, engineId }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Select Bot Engines</h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Player 1 Bot Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Player 1 Bot</h2>
            <select 
              className="w-full bg-gray-800 p-2 rounded"
              onChange={(e) => handleEngineSelect('player1', e.target.value)}
            >
              <option value="">Select Bot Engine</option>
              {availableBotEngines.map(engine => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))}
            </select>
          </div>

          {/* Player 2 Bot Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Player 2 Bot</h2>
            <select 
              className="w-full bg-gray-800 p-2 rounded"
              onChange={(e) => handleEngineSelect('player2', e.target.value)}
            >
              <option value="">Select Bot Engine</option>
              {availableBotEngines.map(engine => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          {availableBotEngines.map(engine => (
            <div key={engine.id} className="mb-4 p-4 bg-gray-800 rounded">
              <h3 className="font-bold">{engine.name}</h3>
              <p className="text-gray-400">{engine.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotEngineSelection; 