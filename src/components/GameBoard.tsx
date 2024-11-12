import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Position, Character as CharacterType, Skill } from '../types/game.types';
import { moveCharacter, attackCharacter, selectCharacter, checkWinCondition, useSkill } from '../store/gameSlice';
import Character from './Character';
import Castle from './Castle';
import SkillBar from './SkillBar';
import { RootState } from '../store';
import AbilityEffect from './AbilityEffect';
import CombatText from './CombatText';

interface GameBoardProps {
  size: number;
}

interface PlayerData {
  characters: CharacterType[];
  castle: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ size }) => {
  const dispatch = useDispatch();
  const { players, currentTurn, selectedCharacter } = useSelector((state: RootState) => state.game);
  const [targetingSkill, setTargetingSkill] = useState<Skill | null>(null);
  const [activeEffect, setActiveEffect] = useState<{
    type: 'damage' | 'heal' | 'defense' | 'control';
    position: Position;
  } | null>(null);
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

  const handleSquareClick = (position: Position) => {
    if (!selectedCharacter) return;

    if (targetingSkill) {
      setAbilityEffect({
        type: getEffectType(targetingSkill.effect),
        sourcePosition: selectedCharacter.position,
        targetPosition: position
      });

      dispatch(useSkill({
        characterId: selectedCharacter.id,
        skillId: targetingSkill.id,
        targetPosition: position
      }));

      setCombatTexts(prev => [...prev, {
        id: Date.now(),
        text: getSkillText(targetingSkill),
        type: getTextType(targetingSkill.effect),
        position
      }]);

      setTargetingSkill(null);
      return;
    }

    const isValidMove = isValidPosition(position, selectedCharacter);
    if (isValidMove) {
      dispatch(moveCharacter({ characterId: selectedCharacter.id, position }));
      dispatch(checkWinCondition());
    }

    const targetCharacter = getCharacterAtPosition(position);
    if (targetCharacter && canAttack(selectedCharacter, targetCharacter)) {
      dispatch(attackCharacter({ attackerId: selectedCharacter.id, targetId: targetCharacter.id }));
      dispatch(checkWinCondition());
    }
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

  const canAttack = (attacker: CharacterType, target: CharacterType) => {
    const dx = Math.abs(target.position.x - attacker.position.x);
    const dy = Math.abs(target.position.y - attacker.position.y);
    return dx <= 1 && dy <= 1;
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

  return (
    <div className="relative">
      <div className="grid grid-cols-9 gap-0.5 bg-gray-700 p-2 rounded-lg">
        {Array.from({ length: size * size }).map((_, index) => {
          const x = Math.floor(index / size);
          const y = index % size;
          const position = { x, y };
          
          return (
            <div
              key={`${x}-${y}`}
              className={`w-16 h-16 ${
                targetingSkill && isValidSkillTarget(position)
                  ? 'bg-green-200 hover:bg-green-300'
                  : selectedCharacter && isValidPosition(position, selectedCharacter)
                  ? 'bg-blue-200 hover:bg-blue-300'
                  : 'bg-gray-200 hover:bg-gray-300'
              } cursor-pointer transition-colors`}
              onClick={() => handleSquareClick(position)}
            />
          );
        })}
      </div>

      {/* Render Characters */}
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

      {/* Render Castles */}
      {Object.entries(players as Record<string, PlayerData>).map(([playerId, playerData]) => (
        <Castle
          key={playerId}
          position={playerData.castle}
          playerId={playerId}
        />
      ))}

      <SkillBar onSkillSelect={setTargetingSkill} />

      {activeEffect && (
        <SkillEffect
          type={activeEffect.type}
          position={activeEffect.position}
          onComplete={() => setActiveEffect(null)}
        />
      )}

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
  );
};

export default GameBoard;