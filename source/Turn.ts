import { Stone } from './Stone';
import { State } from './State';
import { StoneNotation, Direction } from './Types';
import { isValidBar, isBar, getDirectionOfBar } from './helpers';

export class Turn {
  public stones: Array<Stone> = [];
  private state: State;

  constructor(stoneNotations: Array<StoneNotation>, state: State) {
    this.state = state;
    this.stones = stoneNotations.map(
      (stoneNotation) => new Stone(stoneNotation, state)
    );
  }

  public get isValid() {
    const turnStonesAreValid = isBar(this.stones)
    const direction = getDirectionOfBar(this.stones)
    const firstStone = this.stones[0]
    const oppositeDirection = direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
    const mainBarIsValid = isValidBar(firstStone.bar(direction))
    const allOtherBarsAreValid = this.stones.every(stone => isValidBar(stone.bar(oppositeDirection)))
    return turnStonesAreValid && mainBarIsValid && allOtherBarsAreValid;
  }

}