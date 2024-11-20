import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../types/game.types';

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
  gameMode: null,
  availableCharacters: [],
  characterSelectionPhase: false,
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
  showGameOverview: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<'PVP' | 'BOT'>) => {
      state.gameMode = action.payload;
      state.characterSelectionPhase = true;
    },
    resetGameMode: (state) => {
      state.gameMode = null;
      state.characterSelectionPhase = false;
      state.gameStarted = false;
    },
  },
});

export const { setGameMode, resetGameMode } = gameSlice.actions;
export default gameSlice.reducer;