import { GameState } from './game.types';

export interface RootState {
  game: GameState;
}

export interface PlayerData {
  characters: Character[];
  castle: Position;
  consecutiveInvalidActions: number;
} 