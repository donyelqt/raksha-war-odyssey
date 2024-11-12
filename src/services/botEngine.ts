import { GameState, Position, Character, Skill } from '../types/game.types';

interface Action {
  type: 'move' | 'attack' | 'skill';
  characterId: string;
  target?: Position;
  skillId?: string;
}

export class BotEngine {
  private evaluatePosition(position: Position, target: Position, character: Character): number {
    const dx = Math.abs(position.x - target.x);
    const dy = Math.abs(position.y - target.y);
    const distance = dx + dy;
    
    // Consider character type in position evaluation
    switch (character.id) {
      case 'archer':
        // Archers prefer to keep distance
        return distance < 3 ? -distance : 10 - distance;
      case 'warrior':
        // Warriors want to get close
        return 10 - distance;
      case 'mage':
        // Mages prefer medium range
        return distance === 2 ? 10 : 5 - Math.abs(2 - distance);
      default:
        return -distance;
    }
  }

  private evaluateSkill(skill: Skill, character: Character, target: Position, gameState: GameState): number {
    if (skill.cooldown > 0) return -Infinity;

    const enemyCharacters = gameState.players[gameState.currentTurn === 'player1' ? 'player2' : 'player1'].characters;

    switch (skill.effect) {
      case 'damage':
        // Consider enemy health when evaluating damage skills
        const nearbyEnemies = enemyCharacters.filter(enemy => 
          Math.abs(enemy.position.x - target.x) + Math.abs(enemy.position.y - target.y) <= skill.range
        );
        return nearbyEnemies.length > 0 ? 8 + Math.min(...nearbyEnemies.map(e => e.health)) / 20 : 0;
      case 'heal':
        return character.health < 50 ? 10 : 0;
      case 'defense':
        return character.health < 70 ? 7 : 3;
      case 'control':
        return 9;
      case 'movement':
        const distanceToTarget = Math.abs(character.position.x - target.x) + 
                               Math.abs(character.position.y - target.y);
        return distanceToTarget > 3 ? 6 : 2;
      case 'aoe_damage':
        return this.countTargetsInRange(target, gameState, 2) > 1 ? 10 : 5;
      case 'aoe_control':
        return this.countTargetsInRange(target, gameState, 2) > 1 ? 9 : 4;
      default:
        return 0;
    }
  }

  private countTargetsInRange(position: Position, gameState: GameState, range: number): number {
    let count = 0;
    const currentPlayer = gameState.currentTurn;
    const otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';

    for (const character of gameState.players[otherPlayer].characters) {
      const dx = Math.abs(character.position.x - position.x);
      const dy = Math.abs(character.position.y - position.y);
      if (dx <= range && dy <= range) count++;
    }
    return count;
  }

  private findBestSkillTarget(skill: Skill, character: Character, gameState: GameState): Position | null {
    let bestScore = -Infinity;
    let bestTarget: Position | null = null;

    // Check all possible positions within skill range
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const targetPos = { x, y };
        const dx = Math.abs(character.position.x - x);
        const dy = Math.abs(character.position.y - y);
        
        if (dx <= skill.range && dy <= skill.range) {
          const score = this.evaluateSkillTarget(skill, targetPos, gameState);
          if (score > bestScore) {
            bestScore = score;
            bestTarget = targetPos;
          }
        }
      }
    }

    return bestTarget;
  }

  private evaluateSkillTarget(skill: Skill, position: Position, gameState: GameState): number {
    switch (skill.effect) {
      case 'damage':
      case 'control':
        return this.countTargetsInRange(position, gameState, 1);
      case 'aoe_damage':
      case 'aoe_control':
        return this.countTargetsInRange(position, gameState, 2) * 2;
      default:
        return 0;
    }
  }

  calculateNextMove(gameState: GameState): Action {
    const botPlayer = gameState.currentTurn;
    const enemyPlayer = botPlayer === 'player1' ? 'player2' : 'player1';
    const botCharacters = gameState.players[botPlayer].characters;
    const enemyCastle = gameState.players[enemyPlayer].castle;

    let bestAction: Action | null = null;
    let bestScore = -Infinity;

    for (const character of botCharacters) {
      // Check for castle attack opportunity
      if (this.canAttackCastle(character, enemyCastle)) {
        return {
          type: 'attack',
          characterId: character.id,
          target: enemyCastle
        };
      }

      // Evaluate skills
      for (const skill of character.skills) {
        if (skill.cooldown === 0) {
          const target = this.findBestSkillTarget(skill, character, gameState);
          if (target) {
            const score = this.evaluateSkill(skill, character, target, gameState);
            if (score > bestScore) {
              bestScore = score;
              bestAction = {
                type: 'skill',
                characterId: character.id,
                skillId: skill.id,
                target
              };
            }
          }
        }
      }

      // Evaluate moves
      const moves = this.getValidMoves(character, gameState);
      for (const move of moves) {
        const score = this.evaluatePosition(move, enemyCastle, character);
        if (score > bestScore) {
          bestScore = score;
          bestAction = {
            type: 'move',
            characterId: character.id,
            target: move
          };
        }
      }
    }

    return bestAction || {
      type: 'move',
      characterId: botCharacters[0].id,
      target: this.getValidMoves(botCharacters[0], gameState)[0]
    };
  }

  private canAttackCastle(character: Character, castle: Position): boolean {
    const dx = Math.abs(character.position.x - castle.x);
    const dy = Math.abs(character.position.y - castle.y);
    return dx <= 1 && dy <= 1;
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
}

export const botEngine = new BotEngine();