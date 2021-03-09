import { Stone } from './Stone';
import { State } from './State';
import { StoneNotation, Direction } from './Types';
import { isValidBar, isBar, getDirectionOfBar, sameItems, onlyUnique, barIterator } from './helpers';

export class Turn {
  public stones: Array<Stone> = [];
  private state: State;

  constructor(stoneNotations: Array<StoneNotation>, state: State) {
    this.state = state;
    this.stones = stoneNotations.map(stoneNotation => new Stone(stoneNotation, state));
  }

  public get isValid() {
    const turnStonesAreValid = isBar(this.stones)

    const allUniqueStones = this.stones.length === this.stones.filter(onlyUnique).length
  
    const allBarsAreValid = barIterator(this.stones).every(bar => isValidBar(bar))

    return allUniqueStones && turnStonesAreValid && allBarsAreValid;
  }

  public get score () {
    let points = 0

    const bars = barIterator(this.stones)
    for (const bar of bars) {
      const qwirklePoints = bar.length === 6 ? 6 : 0
      const stonePoints = bar.length > 1 ? bar.length : 0

      points += qwirklePoints + stonePoints
    }

    // Special use case for a start with one stone.
    if (points === 0) points = 1

    return points
  }

}