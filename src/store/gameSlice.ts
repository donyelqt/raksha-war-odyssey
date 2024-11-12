import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Position, Character } from '../types/game.types';

const initialCharacters: Character[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    position: { x: 0, y: 0 },
    health: 100,
    skills: [
      { id: 'slash', name: 'Slash', range: 1, effect: 'damage' },
      { id: 'shield', name: 'Shield Wall', range: 0, effect: 'defense' },
    ],
  },
  {
    id: 'archer',
    name: 'Archer',
    position: { x: 1, y: 0 },
    health: 80,
    skills: [
      { id: 'arrow', name: 'Arrow Shot', range: 3, effect: 'damage' },
      { id: 'trap', name: 'Set Trap', range: 2, effect: 'control' },
    ],
  },
];

const initialState: GameState = {
  players: {
    player1: {
      characters: [],
      castle: { x: 0, y: 8 },
    },
    player2: {
      characters: [],
      castle: { x: 8, y: 0 },
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
    selectCharacterInPhase: (state, action: PayloadAction<Character>) => {
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

    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },

    moveCharacter: (state, action: PayloadAction<{characterId: string, position: Position}>) => {
      const { characterId, position } = action.payload;
      const currentPlayer = state.currentTurn;
      const character = state.players[currentPlayer].characters.find(c => c.id === characterId);
      if (character) {
        character.position = position;
        state.selectedCharacter = null;
      }
    },

    attackCharacter: (state, action: PayloadAction<{attackerId: string, targetId: string}>) => {
      const { attackerId, targetId } = action.payload;
      const currentPlayer = state.currentTurn;
      const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      
      const attacker = state.players[currentPlayer].characters.find(c => c.id === attackerId);
      const target = state.players[otherPlayer].characters.find(c => c.id === targetId);
      
      if (attacker && target) {
        target.health -= 20;
        if (target.health <= 0) {
          target.health = 100;
          target.position = getInitialPosition(targetId, otherPlayer);
        }
        state.selectedCharacter = null;
      }
    },

    useSkill: (state, action: PayloadAction<{
      characterId: string,
      skillId: string,
      targetPosition: Position
    }>) => {
      const { characterId, skillId, targetPosition } = action.payload;
      const currentPlayer = state.currentTurn;
      const character = state.players[currentPlayer].characters.find(c => c.id === characterId);
      
      if (character) {
        const skill = character.skills.find(s => s.id === skillId);
        if (skill) {
          switch (skill.effect) {
            case 'damage':
              // Deal damage to target
              const targetCharacter = getCharacterAtPosition(state, targetPosition);
              if (targetCharacter) {
                targetCharacter.health -= 30;
                if (targetCharacter.health <= 0) {
                  targetCharacter.health = 100;
                  targetCharacter.position = getInitialPosition(targetCharacter.id, getPlayerIdByCharacter(state, targetCharacter));
                }
              }
              break;
            case 'heal':
              // Heal the character
              character.health = Math.min(character.health + 20, 100);
              break;
            case 'defense':
              // Implement defense buff (you may need to add a defense property to characters)
              break;
            case 'control':
              // Implement control effect (e.g., stun or root)
              break;
          }
          state.selectedCharacter = null;
          state.currentTurn = state.currentTurn === 'player1' ? 'player2' : 'player1';
          state.turnTimer = 10;
        }
      }
    },

    endTurn: (state) => {
      state.currentTurn = state.currentTurn === 'player1' ? 'player2' : 'player1';
      state.turnTimer = 10;
      state.selectedCharacter = null;
    },

    updateTimer: (state, action: PayloadAction<number>) => {
      state.turnTimer = action.payload;
    },

    checkWinCondition: (state) => {
      const currentPlayer = state.currentTurn;
      const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      
      const attackingCharacter = state.selectedCharacter;
      const defendingCastle = state.players[otherPlayer].castle;
      
      if (attackingCharacter && 
          Math.abs(attackingCharacter.position.x - defendingCastle.x) <= 1 &&
          Math.abs(attackingCharacter.position.y - defendingCastle.y) <= 1) {
        state.winner = currentPlayer;
        state.gameOver = true;
      }
    },
  },
});

export const { 
  selectCharacterInPhase,
  selectCharacter, 
  moveCharacter, 
  attackCharacter,
  useSkill,
  endTurn, 
  updateTimer,
  checkWinCondition 
} = gameSlice.actions;

export default gameSlice.reducer;

const getCharacterAtPosition = (state: GameState, position: Position) => {
  for (const player of Object.values(state.players)) {
    const character = player.characters.find(
      c => c.position.x === position.x && c.position.y === position.y
    );
    if (character) return character;
  }
  return null;
};

const getPlayerIdByCharacter = (state: GameState, character: Character) => {
  for (const [playerId, player] of Object.entries(state.players)) {
    if (player.characters.some(c => c.id === character.id)) {
      return playerId;
    }
  }
  return null;
};