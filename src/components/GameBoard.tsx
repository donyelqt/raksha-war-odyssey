import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Position, Character as CharacterType, Skill } from '../types/game.types';
import { PlayerData } from '../types/store.types';
import { moveCharacter, attackCharacter, selectCharacter, checkWinCondition, useSkill, executeBotMove } from '../store/gameSlice';
import Character from './Character';
import Castle from './Castle';
import SkillBar from './SkillBar';
import { RootState } from '../store';
import AbilityEffect from './AbilityEffect';
import CombatText from './CombatText';

interface GameBoardProps {
  size: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ size }) => {
  const dispatch = useDispatch();
  const { players, currentTurn, selectedCharacter, gameMode, turnTimer } = useSelector((state: RootState) => state.game);
  const [targetingSkill, setTargetingSkill] = useState<Skill | null>(null);
  const [abilityEffect, setAbilityEffect] = useState<{
    type: 'damage' | 'heal' | 'defense' | 'control' | 'movement' | 'aoe';
    sourcePosition: Position;
    targetPosition: Position;
  } | null>(null);
  const [combatTexts, setCombatTexts] = useState<Array<{
    id: number;
    text: string;
    type: 'damage' | 'heal' | 'effect';
    position: Position;
  }>>([]);

  useEffect(() => {
    if (gameMode === 'BOT' && currentTurn === 'player2') {
      const timer = setTimeout(() => {
        dispatch(executeBotMove());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameMode, currentTurn, dispatch]);

  useEffect(() => {
    if (turnTimer === 0) {
      dispatch({ type: 'game/endTurn' });
    }
  }, [turnTimer, dispatch]);

  const handleSquareClick = (position: Position) => {
    if (!selectedCharacter) return;

    if (targetingSkill) {
      dispatch(useSkill({
        characterId: selectedCharacter.id,
        skillId: targetingSkill.id,
        targetPosition: position
      }));
      setAbilityEffect({
        type: getEffectType(targetingSkill.effect),
        sourcePosition: selectedCharacter.position,
        targetPosition: position
      });
      setCombatTexts(prev => [...prev, {
        id: Date.now(),
        text: getSkillText(targetingSkill),
        type: getTextType(targetingSkill.effect),
        position
      }]);
      setTargetingSkill(null);
    } else {
      const targetCharacter = getCharacterAtPosition(position);
      if (targetCharacter && targetCharacter.id !== selectedCharacter.id) {
        dispatch(attackCharacter({ attackerId: selectedCharacter.id, targetId: targetCharacter.id }));
      } else {
        dispatch(moveCharacter({ characterId: selectedCharacter.id, position }));
      }
    }

    dispatch(checkWinCondition());
  };

  const isValidPosition = (position: Position, character: CharacterType) => {
    const dx = Math.abs(position.x - character.position.x);
    const dy = Math.abs(position.y - character.position.y);
    return dx <= 1 && dy <= 1 && dx + dy <= 2;
  };

  const getCharacterAtPosition = (position: Position) => {
    for (const [_, player] of Object.entries(players as Record<string, PlayerData>)) {
      const character = player.characters.find(
        (c: CharacterType) => c.position.x === position.x && c.position.y === position.y
      );
      if (character) return character;
    }
    return null;
  };

  const isValidSkillTarget = (position: Position) => {
    if (!selectedCharacter || !targetingSkill) return false;
    const dx = Math.abs(position.x - selectedCharacter.position.x);
    const dy = Math.abs(position.y - selectedCharacter.position.y);
    return dx <= targetingSkill.range && dy <= targetingSkill.range;
  };

  const getEffectType = (effect: string): 'damage' | 'heal' | 'defense' | 'control' | 'movement' | 'aoe' => {
    switch (effect) {
      case 'damage':
      case 'aoe_damage':
        return 'damage';
      case 'heal':
        return 'heal';
      case 'defense':
        return 'defense';
      case 'control':
      case 'aoe_control':
        return 'control';
      case 'movement':
        return 'movement';
      default:
        return 'damage';
    }
  };

  const getSkillText = (skill: Skill): string => {
    switch (skill.effect) {
      case 'damage':
        return '-30';
      case 'heal':
        return '+20';
      case 'defense':
        return 'DEF+';
      case 'control':
        return 'STUN';
      default:
        return skill.name;
    }
  };

  const getTextType = (effect: string): 'damage' | 'heal' | 'effect' => {
    switch (effect) {
      case 'damage':
      case 'aoe_damage':
        return 'damage';
      case 'heal':
        return 'heal';
      default:
        return 'effect';
    }
  };

  const renderGridCell = (x: number, y: number) => {
    const position = { x, y };
    const isValidTarget = targetingSkill && isValidSkillTarget(position);
    const isValidMove = selectedCharacter && isValidPosition(position, selectedCharacter);
    const isCastlePosition = (x === 0 && y === 8) || (x === 8 && y === 0);
    const isCharacterPosition = getCharacterAtPosition(position) !== null;

    // Create checkerboard pattern
    const isAlternate = (x + y) % 2 === 0;
    
    let cellClass = `
      w-16 h-16 relative
      ${isAlternate ? 'bg-gray-700' : 'bg-gray-600'}
      border border-gray-800
      transition-all duration-300
    `;

    // Add hover and interaction states
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

    // Add movement indicators
    const showMovementIndicator = selectedCharacter && isValidMove;

    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
        onClick={() => handleSquareClick(position)}
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

  return (
    <div className="relative">
      {/* Board background with border */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg -z-10" />

      {/* Game board grid */}
      <div className="relative p-4">
        <div className="grid grid-cols-9 gap-0.5 bg-gray-800 p-2 rounded-lg shadow-lg">
          {Array.from({ length: size * size }).map((_, index) => {
            const x = Math.floor(index / size);
            const y = index % size;
            return renderGridCell(x, y);
          })}
        </div>

        {/* Characters layer */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(players as Record<string, PlayerData>).map(([playerId, playerData]) =>
            playerData.characters.map((character: CharacterType) => (
              <Character
                key={character.id}
                character={character}
                isSelected={selectedCharacter?.id === character.id}
                isCurrentPlayer={currentTurn === playerId}
                onClick={() => {
                  if (currentTurn === playerId) {
                    dispatch(selectCharacter(character));
                  }
                }}
              />
            ))
          )}
        </div>

        {/* Castles layer */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(players as Record<string, PlayerData>).map(([playerId, playerData]) => (
            <Castle
              key={playerId}
              position={playerData.castle}
              playerId={playerId}
              isCurrentPlayer={currentTurn === playerId}
            />
          ))}
        </div>

        {/* Effects layer */}
        <div className="absolute inset-0 pointer-events-none">
          {abilityEffect && (
            <AbilityEffect
              type={abilityEffect.type}
              sourcePosition={abilityEffect.sourcePosition}
              targetPosition={abilityEffect.targetPosition}
              onComplete={() => setAbilityEffect(null)}
            />
          )}

          {combatTexts.map(({ id, text, type, position }) => (
            <CombatText
              key={id}
              text={text}
              type={type}
              position={position}
              onComplete={() => {
                setCombatTexts(prev => prev.filter(t => t.id !== id));
              }}
            />
          ))}
        </div>

        {/* Skill bar */}
        <SkillBar onSkillSelect={setTargetingSkill} />
      </div>
    </div>
  );
};

export default GameBoard;