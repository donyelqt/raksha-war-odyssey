import React from 'react';
//import { useDispatch } from 'react-redux';

const HomeScreen: React.FC<{ onSelectMode: (mode: 'PVP' | 'BOT') => void }> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Raksha: War Odyssey</h1>
          <p className="text-xl text-gray-400">Choose your battle mode</p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* PVP Mode */}
          <div 
            className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
            onClick={() => onSelectMode('PVP')}
          >
            <h2 className="text-3xl font-bold mb-6">PVP Battle 🎮</h2>
            <div className="space-y-4 text-lg">
              <p>🎏 Random first player selection</p>
              <p>🎮 Player vs Player combat</p>
              <p>⏱️ 10-second turn timer</p>
              <p>👥 Choose 2 unique characters</p>
            </div>
          </div>

          {/* Player vs Bot Mode */}
          <div 
            className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
            onClick={() => onSelectMode('BOT')}
          >
            <h2 className="text-3xl font-bold mb-6">Player vs Bot 🤖</h2>
            <div className="space-y-4 text-lg">
              <p>🎯 Select bot engine for the opponent</p>
              <p>🔄 Best of 7 matches</p>
              <p>⏱️ 3-second turn timer</p>
              <p>💰 Submit algorithms for rewards!</p>
            </div>
            <div className="mt-6 text-yellow-400 text-sm">
              Check Bot Battle Rules for algorithm submission details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 