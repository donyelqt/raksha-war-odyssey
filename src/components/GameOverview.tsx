import React from 'react';

const GameOverview: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Game Overview</h2>
        
        {/* Players & Basic Info */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Players</h4>
              <p>• 2 players per match</p>
              <p>• 2 unique characters each</p>
              <p>• 1 castle per player</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Goal</h4>
              <p>Capture the enemy's castle by attacking it with your characters!</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-green-400 mb-4">Available Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚔️</div>
              <h4 className="font-bold mb-2">Attack</h4>
              <p className="text-sm">Attack other characters or the enemy castle</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">👣</div>
              <h4 className="font-bold mb-2">Move</h4>
              <p className="text-sm">Move to adjacent squares in any direction</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">✨</div>
              <h4 className="font-bold mb-2">Skills</h4>
              <p className="text-sm">Use unique character abilities</p>
            </div>
          </div>
        </div>

        {/* Game Modes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-400 mb-4">Game Modes</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">PVP Battle</h4>
              <ul className="space-y-2">
                <li>• Random first player selection</li>
                <li>• 10-second turn timer</li>
                <li>• Choose 2 unique characters</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-green-400 mb-2">Bot Battle</h4>
              <ul className="space-y-2">
                <li>• Best of 7 matches</li>
                <li>• 3-second turn timer</li>
                <li>• Choose bot engines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-bold
              transition-all duration-300 transform hover:scale-105"
          >
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverview; 