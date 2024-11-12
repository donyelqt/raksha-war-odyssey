import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGameMode } from '../../store/gameSlice';
import PvPCard from './PvPCard';
import BotBattleCard from './BotBattleCard';
import RecentMatches from './RecentMatches';

const FindMatchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedMode, setSelectedMode] = useState<'PVP' | 'BOT' | null>(null);

  const handleModeSelect = (mode: 'PVP' | 'BOT') => {
    setSelectedMode(mode);
    dispatch(setGameMode(mode));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">Raksha: War Odyssey</h1>
          <p className="text-xl text-gray-400">Choose your battle mode and begin your journey</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-8">
          {/* Battle Modes */}
          <div className="col-span-8 grid grid-cols-2 gap-6">
            <PvPCard 
              isSelected={selectedMode === 'PVP'}
              onSelect={() => handleModeSelect('PVP')}
            />
            <BotBattleCard 
              isSelected={selectedMode === 'BOT'}
              onSelect={() => handleModeSelect('BOT')}
            />
          </div>

          {/* Recent Matches & Stats */}
          <div className="col-span-4 space-y-6">
            <RecentMatches />
          </div>
        </div>

        {/* Start Button */}
        {selectedMode && (
          <div className="mt-8 text-center">
            <button
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold
                transition-all duration-300 transform hover:scale-105"
              onClick={() => handleModeSelect(selectedMode)}
            >
              Start {selectedMode} Battle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMatchScreen; 