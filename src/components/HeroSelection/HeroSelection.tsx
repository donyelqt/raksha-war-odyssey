import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

interface Hero {
  name: string;
  abilities: string[];
  image: string;
}

const heroes: Hero[] = [
  {
    name: 'MARHUI',
    abilities: ['Burn', 'Pillar', 'Inferno'],
    image: 'path/to/marhui.png',
  },
  {
    name: 'FAROS',
    abilities: ['Gust', 'Cyclone', 'Nimbus'],
    image: 'path/to/faros.png',
  },
  {
    name: 'KIDU',
    abilities: ['Charge', 'Zap', 'Thunderstorm'],
    image: 'path/to/kidu.png',
  },
  {
    name: 'ANIKA',
    abilities: ['Sphere', 'Clone', 'Tsunami'],
    image: 'path/to/anika.png',
  },
  {
    name: 'SAJIK',
    abilities: ['Petrify', 'Quicksand', 'Tremor'],
    image: 'path/to/sajik.png',
  },
  {
    name: 'JUMKA',
    abilities: ['Entwine', 'Willow', 'Symbiosis'],
    image: 'path/to/jumka.png',
  },
];

const HeroSelection: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Player 1's turn to pick (Blue Celestials)</h1>
      <div className="flex overflow-x-auto space-x-4">
        {heroes.map((hero) => (
          <div key={hero.name} className="bg-white p-4 rounded shadow-md flex flex-col items-center">
            <img src={hero.image} alt={hero.name} className="w-24 h-24 mb-2" />
            <h2 className="text-lg font-bold">{hero.name}</h2>
            <div className="mt-2 space-y-1">
              {hero.abilities.map((ability) => (
                <button key={ability} className="bg-gray-200 px-2 py-1 rounded">{ability}</button>
              ))}
            </div>
            <button
              onClick={() => setSelectedHero(hero.name)}
              className={`mt-2 px-4 py-2 rounded ${selectedHero === hero.name ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              Pick
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="mr-2">Select Bot (Player 1)</label>
        <select className="border rounded p-1">
          <option>Bot 1</option>
          <option>Bot 2</option>
        </select>
      </div>
      <div className="mt-2">
        <label className="mr-2">Select Bot (Player 2)</label>
        <select className="border rounded p-1">
          <option>Bot 1</option>
          <option>Bot 2</option>
        </select>
      </div>
      <a href="#" className="mt-4 text-blue-500">About</a>
    </div>
  );
};

export default HeroSelection;

