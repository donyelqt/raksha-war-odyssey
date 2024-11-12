import React from 'react';
import { matchHistoryService, MatchRecord } from '../services/matchHistoryService';

const MatchHistory: React.FC = () => {
  const history = matchHistoryService.getMatchHistory();

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No match history available
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Match History</h2>
      <div className="space-y-2">
        {history.map((match: MatchRecord) => (
          <div
            key={match.id}
            className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="font-bold">
                {match.players.player1} vs {match.players.player2}
              </div>
              <div className="text-sm text-gray-400">
                {new Date(match.date).toLocaleDateString()} - {match.gameMode} Mode
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-500">
                Winner: {match.winner}
              </div>
              <div className="text-sm text-gray-400">
                Duration: {Math.floor(match.duration / 60)}:{(match.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory; 