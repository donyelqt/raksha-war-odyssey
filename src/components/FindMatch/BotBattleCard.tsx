import React from 'react';

interface BotBattleCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

const BotBattleCard: React.FC<BotBattleCardProps> = ({ isSelected, onSelect }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300
        ${isSelected ? 'ring-4 ring-green-500 transform scale-105' : 'hover:bg-gray-700'}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Bot Battle</h2>
        <span className="px-3 py-1 bg-green-600 rounded-full text-sm">AI Mode</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">🤖</div>
          <p>Battle against AI</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">⏱️</div>
          <p>3-second turn timer</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">🏆</div>
          <p>Best of 7 matches</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">📊</div>
          <p>Weekly leaderboards</p>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Choose your bot engine strategy
      </div>
    </div>
  );
};

export default BotBattleCard; 