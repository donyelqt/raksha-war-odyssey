import { GameState } from '../types/game.types';

interface MatchRecord {
  date: string;
  gameMode: 'PVP' | 'BOT';
  winner: string;
  players: {
    player1: string;
    player2: string;
  };
  duration: number;
}

class MatchHistoryService {
  saveMatch(gameState: GameState, duration: number) {
    if (!gameState.gameMode) {
      console.error("Cannot save match: gameMode is null");
      return;
    }

    const matchRecord: MatchRecord = {
      date: new Date().toISOString(),
      gameMode: gameState.gameMode,
      winner: gameState.winner || 'unknown',
      players: {
        player1: gameState.players.player1.characters.map(c => c.id).join(','),
        player2: gameState.players.player2.characters.map(c => c.id).join(','),
      },
      duration,
    };

    // Save matchRecord to local storage or a database
    console.log("Match saved:", matchRecord);
  }
}

export const matchHistoryService = new MatchHistoryService(); 