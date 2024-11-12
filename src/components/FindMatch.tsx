import React from 'react';
import { useDispatch } from 'react-redux';

interface FindMatchProps {
  onSelectMode: (mode: 'PVP' | 'BOT') => void;
}

const FindMatch: React.FC<FindMatchProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Raksha: War Odyssey</h1>
          <p className="text-xl text-gray-400">Choose your battle mode</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* PVP Battle Card */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
               onClick={() => onSelectMode('PVP')}>
            <h2 className="text-2xl font-bold mb-4">PVP Battle</h2>
            <div className="space-y-4">
              <p>• Player vs Player mode</p>
              <p>• 10-second turn timer</p>
              <p>• Choose 2 unique characters</p>
              <p>• Capture enemy castle to win</p>
            </div>
          </div>

          {/* Bot Battle Card */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
               onClick={() => onSelectMode('BOT')}>
            <h2 className="text-2xl font-bold mb-4">Bot Battle</h2>
            <div className="space-y-4">
              <p>• Best of 7 matches</p>
              <p>• 3-second turn timer</p>
              <p>• Weekly leaderboards</p>
              <p>• Practice strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMatch; 