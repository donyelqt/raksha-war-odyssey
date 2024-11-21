import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface GameLobbyProps {
  username?: string;
  rank?: number;
}

const BotGameLobby: React.FC<GameLobbyProps> = ({ 
  username = "dranyloth140465",
  rank = 0 
}) => {
  const [selectedRace, setSelectedRace] = useState(3);
  const navigate = useNavigate();
  
  const raceOptions = [3, 5, 7];

  return (
    <div className="flex w-full h-screen">
      {/* Left sidebar - decorative */}
      <div className="bg-indigo-100 w-1/4 h-full">
        <div className="h-full bg-gradient-to-br from-indigo-50 to-indigo-100" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center w-1/2 h-full bg-white">
        {/* Game title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-yellow-600 mb-2 tracking-wide">
            Raksha
          </h1>
          <p className="text-lg text-yellow-600 font-medium">
            War Odyssey
          </p>
        </div>

        {/* Main actions */}
        <button
          onClick={() => navigate('/hero-selection')}
          className="bg-yellow-800 hover:bg-yellow-900 text-white py-3 px-8 rounded-lg 
                   mb-8 transition-all duration-200 transform hover:scale-105
                   flex items-center space-x-2 shadow-lg"
        >
          <Bot size={20} />
          <span>Start Bot Battle</span>
        </button>

        {/* Race selection */}
        <div className="flex items-center mb-8">
          <span className="text-gray-600 mr-3">Race to</span>
          <div className="flex space-x-2">
            {raceOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedRace(option)}
                className={`w-10 h-10 rounded-lg transition-all duration-200
                          flex items-center justify-center
                          ${selectedRace === option 
                            ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex space-x-8 mb-8">
          <a 
            href="/about" 
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200
                     hover:underline"
          >
            About
          </a>
          <Link 
            to="/pvp-battle-lobby"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200
                     hover:underline"
          >
            PVP Mode
          </Link>
        </div>

        {/* User info */}
        <div className="text-center bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
          <p className="text-red-600 mb-1"><span className='text-gray-600'>user:</span> {username}</p>
          <p className="text-gray-600">rank: {rank}</p>
        </div>
      </div>

      {/* Right sidebar - decorative */}
      <div className="bg-red-100 w-1/4 h-full">
        <div className="h-full bg-gradient-to-bl from-red-50 to-red-100" />
      </div>
    </div>
  );
};

export default BotGameLobby;