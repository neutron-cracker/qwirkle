import { Stone } from './Stone';
import { State } from './State';
import { StoneNotation } from './Types';

export class Turn {
  public stones: Array<Stone> = [];
  private state: State;

  constructor(stoneNotations: Array<StoneNotation>, state: State) {
    this.state = state;
    this.stones = stoneNotations.map(
      (stoneNotation) => new Stone(stoneNotation, state)
    );
  }

  public isValid() {}
}
