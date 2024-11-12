import { GameState } from '../types/game.types';

export interface MatchRecord {
  id: string;
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
  private readonly STORAGE_KEY = 'raksha_match_history';

  saveMatch(gameState: GameState, duration: number) {
    const matchRecord: MatchRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      gameMode: gameState.gameMode,
      winner: gameState.winner || 'unknown',
      players: {
        player1: 'Player 1',
        player2: gameState.gameMode === 'BOT' ? 'Bot' : 'Player 2',
      },
      duration,
    };

    const history = this.getMatchHistory();
    history.unshift(matchRecord);
    
    // Keep only last 10 matches
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return matchRecord;
  }

  getMatchHistory(): MatchRecord[] {
    const history = localStorage.getItem(this.STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  }

  clearHistory() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const matchHistoryService = new MatchHistoryService(); 