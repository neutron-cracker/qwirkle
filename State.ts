import { Turn } from './Turn';
import { StoneNotation } from './Types';

export class State {
  private turns: Array<Turn> = [];

  constructor(initialStoneNotations: Array<StoneNotation>) {
    const initialTurn = new Turn(initialStoneNotations, this);
    this.turns.push(initialTurn);
  }

  addTurn(turn: Turn) {}

  get stones () {
    const stones = []
    for (const turn of this.turns) {
      stones.push(...turn.stones)
    }
    return stones
  }
}

