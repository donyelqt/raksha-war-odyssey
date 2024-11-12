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
  // Add more characters as needed
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
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },
    moveCharacter: (state, action: PayloadAction<{characterId: string, position: Position}>) => {
      const { characterId, position } = action.payload;
      const currentPlayer = state.currentTurn;
      const character = state.players[currentPlayer].characters.find(c => c.id === characterId);
      if (character) {
        character.position = position;
      }
    },
    endTurn: (state) => {
      state.currentTurn = state.currentTurn === 'player1' ? 'player2' : 'player1';
      state.turnTimer = 10;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.turnTimer = action.payload;
    },
    attackCharacter: (state, action: PayloadAction<{attackerId: string, targetId: string}>) => {
      const { attackerId, targetId } = action.payload;
      const currentPlayer = state.currentTurn;
      const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      
      const attacker = state.players[currentPlayer].characters.find(c => c.id === attackerId);
      const target = state.players[otherPlayer].characters.find(c => c.id === targetId);
      
      if (attacker && target) {
        target.health -= 20; // Basic damage value
        if (target.health <= 0) {
          // Reset character to starting position
          target.health = 100;
          target.position = getInitialPosition(targetId, otherPlayer);
        }
        state.selectedCharacter = null;
        dispatch(endTurn());
      }
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
  selectCharacter, 
  moveCharacter, 
  endTurn, 
  updateTimer, 
  attackCharacter,
  checkWinCondition 
} = gameSlice.actions;
export default gameSlice.reducer; 