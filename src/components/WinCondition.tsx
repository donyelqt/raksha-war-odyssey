import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { matchHistoryService } from '../services/matchHistoryService';
import { resetGame } from '../store/gameSlice';

const WinCondition: React.FC = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const { winner, gameMode, turnCount, players } = gameState;

  React.useEffect(() => {
    if (winner) {
      const avgTurnTime = gameMode === 'PVP' ? 10 : 3;
      const estimatedDuration = turnCount * avgTurnTime;
      matchHistoryService.saveMatch(gameState, estimatedDuration);
    }
  }, [winner, gameMode, turnCount, players, gameState]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
        <h2 className="text-4xl font-bold mb-4">
          {winner === 'player1' ? 'Player 1' : 'Player 2'} Wins!
        </h2>
        <div className="mb-6 text-gray-400">
          Game completed in {turnCount} turns
        </div>
        <div className="space-y-4">
          <button
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={() => {
              dispatch(resetGame());
              window.location.reload();
            }}
          >
            Play Again
          </button>
          <button
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
            onClick={() => {
              dispatch(resetGame());
              window.location.href = '/';
            }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinCondition; 