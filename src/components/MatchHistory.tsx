import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface MatchHistoryProps {
  limit?: number;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ limit }) => {
  const matches = useSelector((state: RootState) => state.game.recentMatches);
  const displayMatches = limit ? matches.slice(0, limit) : matches;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Matches</h2>
      <div className="space-y-4">
        {displayMatches?.length > 0 ? (
          displayMatches.map((match, index) => (
            <div key={index} className="bg-gray-700 rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className={match.winner === 'player1' ? 'text-blue-500' : 'text-red-500'}>
                  {match.winner === 'player1' ? 'Victory' : 'Defeat'}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(match.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm">
                {match.gameMode} Mode - {match.duration}s
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No recent matches
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistory; 