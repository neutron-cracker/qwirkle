import { Stone } from './Stone';
import { State } from './State';
import { StoneNotation } from './Types';
import { isValidBar, isBar, onlyUnique, barIterator, filledBar, sortCoordinates, sortStones} from './helpers';

export class Turn {
  public stones: Array<Stone> = [];
  private state: State;

  constructor(stoneNotations: Array<StoneNotation>, state: State) {
    this.state = state;
    this.stones = stoneNotations.map(stoneNotation => new Stone(stoneNotation, state));
  }

  public get isValid() {
    if (!this.stones.length) return true

    const allStonesOfBar = filledBar(this.state, this.stones)
    const turnStonesAreValid = isBar(allStonesOfBar)

    const allUniqueStones = this.stones.length === this.stones.filter(onlyUnique).length
    
    // In the predicter a set of stones can be added to the state in the initialStones. This means that a turn added to a state without turns, but with initialstones is not the first stone.
    // We had a bug with this, and it was pretty dirty and hard to deal with.
    const bars = barIterator(this.stones)
    const firstTurn = this.state.stones.length === 0
    const allBarsAreValid = bars.every(bar => isValidBar(bar, firstTurn))
   
    const doubleStackedStones = this.stones.filter(turnStone => this.state.stonesCoordinates.get(turnStone.coordinates(true)));

    return allUniqueStones && turnStonesAreValid && allBarsAreValid && !doubleStackedStones.length ;
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

  clone () {
    return new Turn(this.stones.map(stone => stone.toNotation()), this.state)
  }

  /**
   * This function creates a string representation of this turn based on the values from the 'stones' property.
   * It does not incluse the state.
   */
  toString() {
    const sortedStones = [...this.stones].sort(sortStones)
    return sortedStones.map(stone => stone.toString()).join('')
  }

}