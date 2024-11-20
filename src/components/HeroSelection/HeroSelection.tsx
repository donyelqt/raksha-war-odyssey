import React from 'react';

interface Ability {
  name: string;
}

interface Hero {
  id: string;
  name: string;
  imageUrl: string;
  abilities: Ability[];
}

interface HeroSelectionProps {
  onHeroSelect?: (hero: Hero) => void;
  currentPlayer?: string;
}

const heroes: Hero[] = [
  {
    id: 'azhul',
    name: 'AZHUL',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Burn' },
      { name: 'Pillar' },
      { name: 'Inferno' }
    ]
  },
  {
    id: 'faros',
    name: 'FAROS',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Gust' },
      { name: 'Cyclone' },
      { name: 'Nimbus' }
    ]
  },
  {
    id: 'kidu',
    name: 'KIDU',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Charge' },
      { name: 'Zap' },
      { name: 'Thunderstorm' }
    ]
  },
  {
    id: 'anika',
    name: 'ANIKA',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Sphere' },
      { name: 'Clone' },
      { name: 'Tsunami' }
    ]
  },
  {
    id: 'sajik',
    name: 'SAJIK',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Petrify' },
      { name: 'Quicksand' },
      { name: 'Tremor' }
    ]
  },
  {
    id: 'jumka',
    name: 'JUMKA',
    imageUrl: '/api/placeholder/240/280',
    abilities: [
      { name: 'Entwine' },
      { name: 'Willow' },
      { name: 'Symbiosis' }
    ]
  }
];

const HeroSelection: React.FC<HeroSelectionProps> = ({
  onHeroSelect,
  currentPlayer = "Player 1"
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8" style={{ background: 'linear-gradient(to right, #E6E6FA, #FFF, #FFE4E1)' }}>
      {/* Turn indicator */}
      <h2 className="text-blue-600 text-xl mb-8">
        {currentPlayer}'s turn to pick (Blue Celestials)
      </h2>

      {/* Hero grid */}
      <div className="grid grid-cols-6 gap-4 mb-8 w-full max-w-6xl">
        {heroes.map((hero) => (
          <div 
            key={hero.id}
            className="flex flex-col items-center bg-white rounded-lg border border-gray-200"
          >
            {/* Hero image */}
            <div className="w-full h-48 relative">
              <img
                src={hero.imageUrl}
                alt={hero.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hero name */}
            <h3 className="text-lg font-medium text-gray-800 my-2">
              {hero.name}
            </h3>

            {/* Abilities */}
            <div className="w-full px-3 pb-3">
              {hero.abilities.map((ability, index) => (
                <div
                  key={index}
                  className="bg-[#f5e6d3] text-gray-700 rounded py-1 px-2 mb-1.5
                           text-center text-sm"
                >
                  {ability.name}
                </div>
              ))}

              {/* Pick button */}
              <button
                onClick={() => onHeroSelect?.(hero)}
                className="w-full mt-2 bg-gray-200 text-gray-500 py-1 px-4 rounded text-sm"
              >
                Pick
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-6xl mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full w-1/6 bg-gray-400 rounded-full"/>
        </div>
      </div>

      {/* Bot selection */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-1 text-sm">
            <option>Select Bot (Player 1)</option>
          </select>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Select Bot (Player 2)</option>
          </select>
        </div>
        
        <a 
          href="#" 
          className="text-blue-600 hover:underline text-sm"
        >
          About
        </a>
      </div>
    </div>
  );
};

export default HeroSelection;