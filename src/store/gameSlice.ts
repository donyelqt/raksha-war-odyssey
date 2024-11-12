import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Position, Character, Skill } from '../types/game.types';
import { botEngine } from '../services/botEngine';
import { soundService } from '../services/soundService';

const initialCharacters: Character[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    position: { x: 0, y: 0 },
    health: 100,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'slash', name: 'Slash', range: 1, effect: 'damage', cooldown: 0 },
      { id: 'shield', name: 'Shield Wall', range: 0, effect: 'defense', cooldown: 3 },
      { id: 'charge', name: 'Charge', range: 2, effect: 'movement', cooldown: 4 },
    ],
  },
  {
    id: 'archer',
    name: 'Archer',
    position: { x: 1, y: 0 },
    health: 80,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'arrow', name: 'Arrow Shot', range: 3, effect: 'damage', cooldown: 0 },
      { id: 'trap', name: 'Set Trap', range: 2, effect: 'control', cooldown: 3 },
      { id: 'volley', name: 'Arrow Volley', range: 4, effect: 'aoe_damage', cooldown: 5 },
    ],
  },
  {
    id: 'mage',
    name: 'Mage',
    position: { x: 2, y: 0 },
    health: 70,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'fireball', name: 'Fireball', range: 3, effect: 'damage', cooldown: 0 },
      { id: 'teleport', name: 'Teleport', range: 3, effect: 'movement', cooldown: 4 },
      { id: 'frostNova', name: 'Frost Nova', range: 2, effect: 'aoe_control', cooldown: 5 },
    ],
  },
  {
    id: 'assassin',
    name: 'Assassin',
    position: { x: 3, y: 0 },
    health: 75,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'backstab', name: 'Backstab', range: 1, effect: 'damage', cooldown: 0 },
      { id: 'smoke', name: 'Smoke Screen', range: 2, effect: 'control', cooldown: 4 },
      { id: 'shadowStep', name: 'Shadow Step', range: 3, effect: 'movement', cooldown: 3 },
    ],
  },
  {
    id: 'healer',
    name: 'Healer',
    position: { x: 4, y: 0 },
    health: 65,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'heal', name: 'Healing Light', range: 2, effect: 'heal', cooldown: 2 },
      { id: 'barrier', name: 'Divine Barrier', range: 2, effect: 'defense', cooldown: 4 },
      { id: 'purify', name: 'Purification', range: 2, effect: 'heal', cooldown: 5 },
    ],
  },
  {
    id: 'tank',
    name: 'Tank',
    position: { x: 5, y: 0 },
    health: 120,
    controlled: false,
    defense: 10,
    skills: [
      { id: 'bash', name: 'Shield Bash', range: 1, effect: 'control', cooldown: 3 },
      { id: 'fortify', name: 'Fortify', range: 0, effect: 'defense', cooldown: 4 },
      { id: 'taunt', name: 'Taunt', range: 2, effect: 'control', cooldown: 5 },
    ],
  },
  {
    id: 'elementalist',
    name: 'Elementalist',
    position: { x: 6, y: 0 },
    health: 70,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'lightning', name: 'Lightning Strike', range: 4, effect: 'damage', cooldown: 0 },
      { id: 'earthWall', name: 'Earth Wall', range: 2, effect: 'defense', cooldown: 4 },
      { id: 'tornado', name: 'Tornado', range: 3, effect: 'aoe_control', cooldown: 5 },
    ],
  },
  {
    id: 'necromancer',
    name: 'Necromancer',
    position: { x: 7, y: 0 },
    health: 75,
    controlled: false,
    defense: 0,
    skills: [
      { id: 'drain', name: 'Life Drain', range: 2, effect: 'damage', cooldown: 0 },
      { id: 'curse', name: 'Death Curse', range: 3, effect: 'control', cooldown: 4 },
      { id: 'plague', name: 'Plague Cloud', range: 2, effect: 'aoe_damage', cooldown: 5 },
    ],
  },
  {
    id: 'paladin',
    name: 'Paladin',
    position: { x: 8, y: 0 },
    health: 110,
    controlled: false,
    defense: 5,
    skills: [
      { id: 'smite', name: 'Holy Smite', range: 1, effect: 'damage', cooldown: 0 },
      { id: 'bless', name: 'Divine Blessing', range: 2, effect: 'heal', cooldown: 4 },
      { id: 'consecrate', name: 'Consecrate', range: 2, effect: 'aoe_damage', cooldown: 5 },
    ],
  },
];

const initialState: GameState = {
  players: {
    player1: {
      characters: [],
      castle: { x: 0, y: 8 },
      consecutiveInvalidActions: 0,
    },
    player2: {
      characters: [],
      castle: { x: 8, y: 0 },
      consecutiveInvalidActions: 0,
    },
  },
  currentTurn: 'player1',
  turnTimer: 10,
  gameMode: 'PVP',
  availableCharacters: initialCharacters,
  characterSelectionPhase: true,
  selectedCharacter: null,
  winner: null,
  gameOver: false,
  turnCount: 0,
  botBattleMatchCount: 0,
  botBattleWins: {
    player1: 0,
    player2: 0,
  },
  botEngines: {
    player1: null,
    player2: null,
  },
  gameStarted: false,
  recentMatches: [],
};

const getInitialPosition = (characterId: string, playerId: string): Position => {
  if (playerId === 'player1') {
    return characterId === 'warrior' ? { x: 0, y: 7 } : { x: 1, y: 7 };
  }
  return characterId === 'warrior' ? { x: 8, y: 1 } : { x: 7, y: 1 };
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectCharacterInPhase: (state: GameState, action: PayloadAction<Character>) => {
      const currentPlayer = state.currentTurn;
      if (state.players[currentPlayer].characters.length < 2) {
        const character = { ...action.payload };
        character.position = getInitialPosition(character.id, currentPlayer);
        state.players[currentPlayer].characters.push(character);
        state.currentTurn = currentPlayer === 'player1' ? 'player2' : 'player1';
      }
      if (state.players.player1.characters.length === 2 && 
          state.players.player2.characters.length === 2) {
        state.characterSelectionPhase = false;
      }
    },

    selectCharacter: (state: GameState, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },

    moveCharacter: (state: GameState, action: PayloadAction<{characterId: string, position: Position}>) => {
      const { characterId, position } = action.payload;
      const currentPlayer = state.currentTurn;
      const character = state.players[currentPlayer].characters.find(c => c.id === characterId);
      if (character && isValidMove(character.position, position)) {
        character.position = position;
        state.selectedCharacter = null;
        gameSlice.caseReducers.endTurn(state);
      } else {
        handleInvalidAction(state);
      }
      if (!state.gameStarted) {
        state.gameStarted = true;
        state.turnTimer = state.gameMode === 'PVP' ? 10 : 3;
      }
    },

    attackCharacter: (state: GameState, action: PayloadAction<{attackerId: string, targetId: string}>) => {
      const { attackerId, targetId } = action.payload;
      const currentPlayer = state.currentTurn;
      const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      
      const attacker = state.players[currentPlayer].characters.find(c => c.id === attackerId);
      const target = state.players[otherPlayer].characters.find(c => c.id === targetId);
      
      if (attacker && target && canAttack(attacker, target)) {
        const damage = 20 - (target.defense || 0);
        target.health -= Math.max(damage, 0);
        soundService.play('attack');
        if (target.health <= 0) {
          target.health = 100;
          target.position = getInitialPosition(targetId, otherPlayer);
          soundService.play('defeat');
        }
        state.selectedCharacter = null;
        gameSlice.caseReducers.endTurn(state);
      } else {
        handleInvalidAction(state);
      }
      if (!state.gameStarted) {
        state.gameStarted = true;
        state.turnTimer = state.gameMode === 'PVP' ? 10 : 3;
      }
    },

    useSkill: (state: GameState, action: PayloadAction<{
      characterId: string,
      skillId: string,
      targetPosition: Position
    }>) => {
      const { characterId, skillId, targetPosition } = action.payload;
      const currentPlayer = state.currentTurn;
      const character = state.players[currentPlayer].characters.find(c => c.id === characterId);
      
      if (character) {
        const skill = character.skills.find(s => s.id === skillId);
        if (skill && skill.cooldown === 0 && isValidSkillUse(character.position, targetPosition, skill)) {
          applySkillEffect(state, character, skill, targetPosition);
          skill.cooldown = getSkillCooldown(skill.id);
          state.selectedCharacter = null;
          gameSlice.caseReducers.endTurn(state);
        } else {
          handleInvalidAction(state);
        }
      }
      if (!state.gameStarted) {
        state.gameStarted = true;
        state.turnTimer = state.gameMode === 'PVP' ? 10 : 3;
      }
    },

    endTurn: (state: GameState) => {
      state.currentTurn = state.currentTurn === 'player1' ? 'player2' : 'player1';
      state.turnTimer = state.gameMode === 'PVP' ? 10 : 3;
      state.turnCount++;
      state.players[state.currentTurn].consecutiveInvalidActions = 0;

      // Reduce cooldowns
      for (const player of Object.values(state.players)) {
        for (const character of player.characters) {
          for (const skill of character.skills) {
            if (skill.cooldown > 0) {
              skill.cooldown--;
            }
          }
          if (character.controlled) {
            character.controlled = false;
          }
        }
      }
    },

    updateTimer: (state: GameState, action: PayloadAction<number>) => {
      state.turnTimer = action.payload;
    },

    checkWinCondition: (state: GameState) => {
      const currentPlayer = state.currentTurn;
      const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      
      const attackingCharacter = state.selectedCharacter;
      const defendingCastle = state.players[otherPlayer].castle;
      
      if (attackingCharacter && 
          Math.abs(attackingCharacter.position.x - defendingCastle.x) <= 1 &&
          Math.abs(attackingCharacter.position.y - defendingCastle.y) <= 1) {
        state.winner = currentPlayer;
        state.gameOver = true;
        if (state.gameMode === 'BOT') {
          state.botBattleMatchCount++;
          state.botBattleWins[currentPlayer as 'player1' | 'player2']++;
        }
      }
    },

    executeBotMove: (state: GameState) => {
      if (state.gameMode === 'BOT' && !state.gameOver) {
        const action = botEngine.calculateNextMove(state);
        
        switch (action.type) {
          case 'move':
            if (action.target) {
              const character = state.players[state.currentTurn].characters
                .find(c => c.id === action.characterId);
              if (character && isValidMove(character.position, action.target)) {
                character.position = action.target;
              }
            }
            break;
            
          case 'attack':
            if (action.target) {
              const attacker = state.players[state.currentTurn].characters
                .find(c => c.id === action.characterId);
              const target = getCharacterAtPosition(state, action.target);
              if (attacker && target && canAttack(attacker, target)) {
                const damage = 20 - (target.defense || 0);
                target.health -= Math.max(damage, 0);
                if (target.health <= 0) {
                  target.health = 100;
                  target.position = getInitialPosition(target.id, getPlayerIdByCharacter(state, target));
                }
              }
            }
            break;
            
          case 'skill':
            if (action.target && action.skillId) {
              const character = state.players[state.currentTurn].characters
                .find(c => c.id === action.characterId);
              const skill = character?.skills.find(s => s.id === action.skillId);
              if (character && skill && skill.cooldown === 0 && isValidSkillUse(character.position, action.target, skill)) {
                applySkillEffect(state, character, skill, action.target);
                skill.cooldown = getSkillCooldown(skill.id);
              }
            }
            break;
        }
        
        gameSlice.caseReducers.endTurn(state);
      }
    },

    endBotBattleMatch: (state: GameState) => {
      state.botBattleMatchCount++;
      if (state.winner) {
        state.botBattleWins[state.winner as 'player1' | 'player2']++;
      }

      if (state.botBattleMatchCount < 7 && 
          state.botBattleWins.player1 < 4 && 
          state.botBattleWins.player2 < 4) {
        // Reset the game state for the next match
        state.players.player1.characters = [];
        state.players.player2.characters = [];
        state.characterSelectionPhase = true;
        state.currentTurn = 'player1';
        state.turnTimer = 10;
        state.winner = null;
        state.gameOver = false;
        state.selectedCharacter = null;
        state.turnCount = 0;
      } else {
        // End of the best-of-7 series
        state.gameOver = true;
      }
    },

    setGameMode: (state: GameState, action: PayloadAction<'PVP' | 'BOT'>) => {
      state.gameMode = action.payload;
      state.turnTimer = action.payload === 'PVP' ? 10 : 3;
      if (action.payload === 'PVP') {
        state.currentTurn = Math.random() < 0.5 ? 'player1' : 'player2';
      }
    },

    setBotEngine: (state: GameState, action: PayloadAction<{ player: 'player1' | 'player2', engineId: string }>) => {
      state.botEngines[action.payload.player] = action.payload.engineId;
      // Start game if both engines are selected
      if (state.botEngines.player1 && state.botEngines.player2) {
        state.characterSelectionPhase = true;
      }
    },

    handleTurnViolation: (state: GameState) => {
      const currentPlayer = state.currentTurn;
      state.players[currentPlayer].consecutiveInvalidActions++;
      
      if (state.players[currentPlayer].consecutiveInvalidActions >= 3) {
        state.winner = currentPlayer === 'player1' ? 'player2' : 'player1';
        state.gameOver = true;
      }
    },

    startGame: (state: GameState) => {
      state.gameStarted = true;
      state.turnTimer = state.gameMode === 'PVP' ? 10 : 3;
    },
  },
});

// Helper functions

const isValidMove = (from: Position, to: Position): boolean => {
  const dx = Math.abs(from.x - to.x);
  const dy = Math.abs(from.y - to.y);
  return dx <= 1 && dy <= 1 && dx + dy <= 2;
};

const canAttack = (attacker: Character, target: Character): boolean => {
  const dx = Math.abs(attacker.position.x - target.position.x);
  const dy = Math.abs(attacker.position.y - target.position.y);
  return dx <= 1 && dy <= 1;
};

const isValidSkillUse = (from: Position, to: Position, skill: Skill): boolean => {
  const dx = Math.abs(from.x - to.x);
  const dy = Math.abs(from.y - to.y);
  return dx <= skill.range && dy <= skill.range;
};

const applySkillEffect = (state: GameState, character: Character, skill: Skill, targetPosition: Position) => {
  switch (skill.effect) {
    case 'damage':
      const targetCharacter = getCharacterAtPosition(state, targetPosition);
      if (targetCharacter) {
        const damage = 30 - (targetCharacter.defense || 0);
        targetCharacter.health -= Math.max(damage, 0);
        soundService.play('attack');
        if (targetCharacter.health <= 0) {
          targetCharacter.health = 100;
          targetCharacter.position = getInitialPosition(targetCharacter.id, getPlayerIdByCharacter(state, targetCharacter));
          soundService.play('defeat');
        }
      }
      break;
    case 'heal':
      character.health = Math.min(character.health + 20, 100);
      soundService.play('heal');
      break;
    case 'defense':
      character.defense = (character.defense || 0) + 20;
      soundService.play('defense');
      break;
    case 'control':
      const controlledCharacter = getCharacterAtPosition(state, targetPosition);
      if (controlledCharacter) {
        controlledCharacter.controlled = true;
        soundService.play('control');
      }
      break;
    case 'movement':
      character.position = targetPosition;
      soundService.play('move');
      break;
    case 'aoe_damage':
    case 'aoe_control':
      for (const player of Object.values(state.players)) {
        for (const targetChar of player.characters) {
          if (isInRange(targetChar.position, targetPosition, 2)) {
            if (skill.effect === 'aoe_damage') {
              const damage = 20 - (targetChar.defense || 0);
              targetChar.health -= Math.max(damage, 0);
              if (targetChar.health <= 0) {
                targetChar.health = 100;
                targetChar.position = getInitialPosition(targetChar.id, getPlayerIdByCharacter(state, targetChar));
              }
            } else {
              targetChar.controlled = true;
            }
          }
        }
      }
      soundService.play('aoe');
      break;
  }
};

const handleInvalidAction = (state: GameState) => {
  state.players[state.currentTurn].consecutiveInvalidActions++;
  if (state.players[state.currentTurn].consecutiveInvalidActions >= 3) {
    state.winner = state.currentTurn === 'player1' ? 'player2' : 'player1';
    state.gameOver = true;
  } else {
    gameSlice.caseReducers.endTurn(state);
  }
};

const getCharacterAtPosition = (state: GameState, position: Position) => {
  for (const player of Object.values(state.players)) {
    const character = player.characters.find(
      c => c.position.x === position.x && c.position.y === position.y
    );
    if (character) return character;
  }
  return null;
};

const getPlayerIdByCharacter = (state: GameState, character: Character): string => {
  for (const [playerId, player] of Object.entries(state.players)) {
    if (player.characters.some(c => c.id === character.id)) {
      return playerId;
    }
  }
  return 'player1'; // Default fallback
};

const isInRange = (pos1: Position, pos2: Position, range: number) => {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  return dx <= range && dy <= range;
};

const getSkillCooldown = (skillId: string) => {
  switch (skillId) {
    case 'slash':
    case 'arrow':
    case 'fireball':
      return 0;
    case 'shield':
    case 'trap':
      return 3;
    case 'charge':
    case 'teleport':
      return 4;
    case 'volley':
    case 'frostNova':
      return 5;
    default:
      return 0;
  }
};

export const { 
  selectCharacterInPhase,
  selectCharacter, 
  moveCharacter, 
  attackCharacter,
  useSkill,
  endTurn,
  updateTimer,
  checkWinCondition,
  executeBotMove,
  endBotBattleMatch,
  setGameMode,
  setBotEngine,
  handleTurnViolation,
  startGame,
} = gameSlice.actions;

export default gameSlice.reducer;