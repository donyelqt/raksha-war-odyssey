import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTimer, endTurn } from '../store/gameSlice';

const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const { turnTimer, currentTurn, gameStarted } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      if (turnTimer > 0) {
        dispatch(updateTimer(turnTimer - 1));
      } else {
        // Handle turn violation
        dispatch({ type: 'game/handleTurnViolation' });
        dispatch(endTurn());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turnTimer, gameStarted, dispatch]);

  if (!gameStarted) return null;

  return (
    <div className="flex items-center justify-between">
      <span className="font-bold">{currentTurn}'s Turn</span>
      <span className={`font-mono ${turnTimer <= 3 ? 'text-red-500' : ''}`}>
        {turnTimer}s
      </span>
    </div>
  );
};

export default Timer; 