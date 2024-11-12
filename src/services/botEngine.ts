import { GameState, Position, Character } from '../types/game.types';

interface Action {
  type: 'move' | 'attack' | 'skill';
  characterId: string;
  target?: Position;
  skillId?: string;
}

export class BotEngine {
  private evaluatePosition(position: Position, target: Position): number {
    const dx = Math.abs(position.x - target.x);
    const dy = Math.abs(position.y - target.y);
    return -(dx + dy); // Negative because we want to minimize distance
  }

  private getValidMoves(character: Character, gameState: GameState): Position[] {
    const validMoves: Position[] = [];
    const directions = [
      { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
      { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }
    ];

    for (const dir of directions) {
      const newPos = {
        x: character.position.x + dir.x,
        y: character.position.y + dir.y
      };

      if (this.isValidPosition(newPos, gameState)) {
        validMoves.push(newPos);
      }
    }

    return validMoves;
  }

  private isValidPosition(position: Position, gameState: GameState): boolean {
    // Check board boundaries
    if (position.x < 0 || position.x > 8 || position.y < 0 || position.y > 8) {
      return false;
    }

    // Check if position is occupied
    for (const player of Object.values(gameState.players)) {
      for (const character of player.characters) {
        if (character.position.x === position.x && character.position.y === position.y) {
          return false;
        }
      }
    }

    return true;
  }

  calculateNextMove(gameState: GameState): Action {
    const botPlayer = gameState.currentTurn;
    const enemyPlayer = botPlayer === 'player1' ? 'player2' : 'player1';
    const botCharacters = gameState.players[botPlayer].characters;
    const enemyCastle = gameState.players[enemyPlayer].castle;

    // For each character, evaluate possible moves
    let bestAction: Action | null = null;
    let bestScore = -Infinity;

    for (const character of botCharacters) {
      // Check for attack opportunities
      const canAttackCastle = Math.abs(character.position.x - enemyCastle.x) <= 1 &&
                             Math.abs(character.position.y - enemyCastle.y) <= 1;
      
      if (canAttackCastle) {
        return {
          type: 'attack',
          characterId: character.id,
          target: enemyCastle
        };
      }

      // Evaluate moves
      const validMoves = this.getValidMoves(character, gameState);
      for (const move of validMoves) {
        const score = this.evaluatePosition(move, enemyCastle);
        if (score > bestScore) {
          bestScore = score;
          bestAction = {
            type: 'move',
            characterId: character.id,
            target: move
          };
        }
      }

      // Evaluate skills
      for (const skill of character.skills) {
        if (skill.effect === 'damage') {
          const enemyCharacters = gameState.players[enemyPlayer].characters;
          for (const enemy of enemyCharacters) {
            const dx = Math.abs(enemy.position.x - character.position.x);
            const dy = Math.abs(enemy.position.y - character.position.y);
            if (dx <= skill.range && dy <= skill.range) {
              return {
                type: 'skill',
                characterId: character.id,
                skillId: skill.id,
                target: enemy.position
              };
            }
          }
        }
      }
    }

    return bestAction || {
      type: 'move',
      characterId: botCharacters[0].id,
      target: this.getValidMoves(botCharacters[0], gameState)[0]
    };
  }
}

export const botEngine = new BotEngine(); 