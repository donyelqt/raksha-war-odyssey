import React from 'react';
import { Position } from '../types/game.types';

interface GridCellProps {
  x: number;
  y: number;
  isValidTarget: boolean;
  isValidMove: boolean;
  isCastlePosition: boolean;
  isCharacterPosition: boolean;
  showMovementIndicator: boolean;
  onClick: (position: Position) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  x,
  y,
  isValidTarget,
  isValidMove,
  isCastlePosition,
  isCharacterPosition,
  showMovementIndicator,
  onClick,
}) => {
  const isAlternate = (x + y) % 2 === 0;
  
  let cellClass = `
    w-16 h-16 relative
    ${isAlternate ? 'bg-gray-700' : 'bg-gray-600'}
    border border-gray-800
    transition-all duration-300
  `;

  if (isValidTarget) {
    cellClass += ' hover:bg-green-600 ring-2 ring-green-400';
  } else if (isValidMove) {
    cellClass += ' hover:bg-blue-600 ring-2 ring-blue-400';
  } else if (isCastlePosition) {
    cellClass += ' bg-yellow-900/30';
  } else if (isCharacterPosition) {
    cellClass += ' bg-opacity-75';
  } else {
    cellClass += ' hover:bg-gray-500';
  }

  return (
    <div
      className={cellClass}
      onClick={() => onClick({ x, y })}
    >
      {/* Grid coordinates (for development) */}
      <span className="absolute bottom-0 right-1 text-xs text-gray-500 opacity-50">
        {x},{y}
      </span>

      {/* Movement indicator */}
      {showMovementIndicator && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        </div>
      )}

      {/* Target indicator */}
      {isValidTarget && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-green-400 rounded-full animate-pulse" />
        </div>
      )}

      {/* Castle position indicator */}
      {isCastlePosition && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-yellow-500 opacity-10" />
        </div>
      )}
    </div>
  );
};

export default GridCell; 