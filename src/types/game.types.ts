export interface Character {
  id: string;
  name: string;
  position: Position;
  skills: Skill[];
  health: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Skill {
  id: string;
  name: string;
  range: number;
  effect: string;
}

export interface GameState {
  players: {
    [key: string]: {
      characters: Character[];
      castle: Position;
    };
  };
  currentTurn: string;
  turnTimer: number;
  gameMode: 'PVP' | 'BOT';
} 