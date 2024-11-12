export interface Character {
  id: string;
  name: string;
  position: Position;
  skills: Skill[];
  health: number;
  controlled: boolean;
  defense: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Skill {
  id: string;
  name: string;
  range: number;
  effect: 'damage' | 'heal' | 'defense' | 'control' | 'movement' | 'aoe_damage' | 'aoe_control';
  cooldown: number;
}

export interface GameState {
  players: {
    [key: string]: {
      characters: Character[];
      castle: Position;
      consecutiveInvalidActions: number;
    };
  };
  currentTurn: string;
  turnTimer: number;
  gameMode: 'PVP' | 'BOT';
  winner: string | null;
  gameOver: boolean;
  availableCharacters: Character[];
  characterSelectionPhase: boolean;
  selectedCharacter: Character | null;
  turnCount: number;
  botBattleMatchCount: number;
  botBattleWins: {
    player1: number;
    player2: number;
  };
} 