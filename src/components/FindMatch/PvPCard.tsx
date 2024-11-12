import React from 'react';

interface PvPCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

const PvPCard: React.FC<PvPCardProps> = ({ isSelected, onSelect }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300
        ${isSelected ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:bg-gray-700'}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">PVP Battle</h2>
        <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">Classic Mode</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">🎮</div>
          <p>Player vs Player mode</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">⏱️</div>
          <p>10-second turn timer</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">👥</div>
          <p>Choose 2 unique characters</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">🏰</div>
          <p>Capture enemy castle to win</p>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Random player selection for first turn
      </div>
    </div>
  );
};

export default PvPCard; 