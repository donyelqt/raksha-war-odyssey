import { ArrowLeft, ArrowRight } from 'lucide-react';
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
        image: 'src/assets/characters/mahui/mahui.png',
    },
    {
        name: 'FAROS',
        abilities: ['Gust', 'Cyclone', 'Nimbus'],
        image: 'src/assets/characters/faros/faros.png',
    },
    {
        name: 'KIDU',
        abilities: ['Charge', 'Zap', 'Thunderstorm'],
        image: 'src/assets/characters/kidu/kidu.png',
    },
    {
        name: 'ANIKA',
        abilities: ['Sphere', 'Clone', 'Tsunami'],
        image: 'src/assets/characters/anika/anika.png',
    },
    {
        name: 'SAJIK',
        abilities: ['Petrify', 'Quicksand', 'Tremor'],
        image: 'src/assets/characters/sajik/sajik.png',
    },
    {
        name: 'JUMKA',
        abilities: ['Entwine', 'Willow', 'Symbiosis'],
        image: 'src/assets/characters/jumka/jumka.png',
    },
    {
        name: 'ATRI',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/atri/atri.png',
    },
    {
        name: 'Goshen',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/goshen/goshen.png',
    },
    {
        name: 'MERT',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/mert/mert.png',
    },
    {
        name: 'OGUMI',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/ogumi/ogumi.png',
    },
    {
        name: 'SHAI',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/shai/shai.png',
    },
    {
        name: 'TALA',
        abilities: ['TBA', 'TBA', 'TBA'],
        image: 'src/assets/characters/tala/tala.png',
    },
];


const P1HeroSelection: React.FC = () => {
    const [selectedHero, setSelectedHero] = useState<string | null>(null);

    return (
        <div className='flex w-full h-screen'>
            {/* Left sidebar - decorative */}
            <div className="bg-indigo-100 w-1/2 h-full">
                <div className="h-full bg-gradient-to-br from-indigo-50 to-indigo-100" />
            </div>

            {/*Main Content*/}
            <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-xl font-bold p-2 rounded-lg text-blue-600 mb-4">Player 1's turn to pick (Blue Celestials)</h1>

                {/* Hero Slider Container */}
                <div className="w-full max-w-4xl relative px-12">
                    {/* Left Arrow */}
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
                        onClick={() => {
                            const container = document.getElementById('hero-slider');
                            if (container) {
                                container.scrollLeft -= 300;
                            }
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>

                    {/* Hero Cards Container */}
                    <div
                        id="hero-slider"
                        className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-4 py-4"
                    >
                        {heroes.map((hero) => (
                            <div
                                key={hero.name}
                                className="snap-center bg-white border-gray-400 border p-4 rounded-xl shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                            >
                                <h2 className="text-xl font-bold">{hero.name}</h2>
                                <img src={hero.image} alt={hero.name} className="w-32 h-32 mb-2 object-fill" />
                                <div className="mt-2 space-y-1">
                                    {hero.abilities.map((ability) => (
                                        <button
                                            key={ability}
                                            className="bg-yellow-500/25 px-4 text-center w-32 py-2 rounded-2xl hover:bg-yellow-500/40 transition-colors duration-200"
                                        >
                                            {ability}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setSelectedHero(hero.name)}
                                    className={`mt-4 px-6 py-2 text-sm text-white rounded-lg transition-colors duration-200 ${selectedHero === hero.name
                                            ? 'bg-blue-500 hover:bg-blue-600'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                >
                                    Pick
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
                        onClick={() => {
                            const container = document.getElementById('hero-slider');
                            if (container) {
                                container.scrollLeft += 300;
                            }
                        }}
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>

                <a href="#" className="mt-6 text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200">
                    About
                </a>

               

                {/* Bot Selection */}
                <div className='flex items-center mt-4 justify-center gap-8'>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700"></label>
                        <select className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select Bot (Player 1)</option>
                            <option>Select Bot (Player 2)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700"></label>
                        <select className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select Bot (Player 2)</option>
                            <option>Select Bot (Player 1)</option>
                        </select>
                    </div>
                </div>

            </div>

            {/* Right sidebar - decorative */}
            <div className="bg-red-100 w-1/2 h-full">
                <div className="h-full bg-gradient-to-bl from-red-50 to-red-100" />
            </div>
        </div>
    );
};

export default P1HeroSelection;