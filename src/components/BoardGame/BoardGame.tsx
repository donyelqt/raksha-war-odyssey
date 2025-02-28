// import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import 'tailwindcss/tailwind.css';

const BoardGame: React.FC = () => {

    return (
        <div className='flex w-full h-screen'>
            {/* Left sidebar - decorative */}
            <div className="bg-indigo-100 w-1/2 h-full">
                <div className="h-full bg-gradient-to-br from-indigo-50 to-indigo-100" />
            </div>

            {/*Main Content*/}
            <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-gray-100 min-h-screen">

                    {/* Hero Cards Container */}
                    {/*<div
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
                            </div>
                        ))}
                    </div>*/}


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

export default BoardGame;