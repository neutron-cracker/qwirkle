import { Turn } from './Turn';
import { StoneNotation } from './Types';

export class State extends EventTarget {
  public turns: Array<Turn> = [];

  constructor(initialStoneNotations: Array<StoneNotation> = []) {
    super()
    const initialTurn = new Turn(initialStoneNotations, this);
    this.turns.push(initialTurn);
  }

  addTurn(turn: Turn) {
    console.log(turn.isValid)
    if (turn.isValid) {
      this.turns.push(turn)
      this.dispatchEvent(new CustomEvent('turn-added', { detail: turn }))
    }
  }

  get stones() {
    const stones = [];
    for (const turn of this.turns) {
      stones.push(...turn.stones);
    }
    return stones;
  }

}
