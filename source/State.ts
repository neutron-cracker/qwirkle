import { Turn } from './Turn';
import { StoneNotation, Coordinate, Direction } from './Types';
import { Stone } from './Stone';
import { StoneBag } from './StoneBag';

export class State extends EventTarget {

  public turns: Array<Turn> = [];
  public stonesCoordinates: Map<string, Coordinate> = new Map()
  public borderCoordinates: Map<string, Coordinate> = new Map()
  public initialStones: Array<Stone> = [];

  setInitial (initialStoneNotations: Array<StoneNotation> = []) {
    this.initialStones = initialStoneNotations.map( initialStoneNotation => new Stone(initialStoneNotation, this));
    this.updateCache(this.initialStones);
    new StoneBag();
  }

  addTurn(turn: Turn) {
    if (!turn.isValid) throw new Error('Given turn was invalid')

    this.turns.push(turn)
    this.updateCache(turn.stones)
    if (turn.stones.length) this.dispatchEvent(new CustomEvent('turn-added', { detail: turn }))
  }

  get stones(): Array<Stone> {
    return [...this.turns.flatMap(turn => turn.stones), ...this.initialStones]
  }

  get bag(): StoneBag {
    return new StoneBag()
  }

  updateCache (stones: Array<Stone>) {
    for (const stone of stones) {
      this.stonesCoordinates.set(stone.coordinates(true), stone.coordinates())
      this.borderCoordinates.delete(stone.coordinates(true))
      for (const neighbourCoordinate of stone.allNeighbourCoordinates) {
        const alreadyExistsInState = !!this.stones.find(innerStone => innerStone.coordinates(true) === neighbourCoordinate.join(','))
        const isCurrentlyPlayed = !!stones.find(innerStone => innerStone.coordinates(true) === neighbourCoordinate.join(','))

        const direction = stone.x === neighbourCoordinate[0] ? Direction.Vertical : Direction.Horizontal
        const bar = stone.bar(direction)
        const isNextToQwirkle = bar.length === 6

        if (!alreadyExistsInState && !isCurrentlyPlayed && !isNextToQwirkle) {
          this.borderCoordinates.set(neighbourCoordinate.join(','), neighbourCoordinate)
        }
      }
    }
  }

  getBoardSizeInformation () {
    let smallestX = 0
    let smallestY = 0
    let largestX = 0
    let largestY = 0
    let horizontalStoneCount = 0
    let verticalStoneCount = 0

    for (const { x, y } of this.stones) {
      if (x < smallestX) smallestX = x
      if (x > largestX) largestX = x
      if (y < smallestY) smallestY = y
      if (y > largestY) largestY = y
    }
    horizontalStoneCount = largestX - smallestX + 1
    verticalStoneCount = largestY - smallestY + 1

    return {
      smallestX,
      smallestY,
      horizontalStoneCount,
      verticalStoneCount
    }
  }
}
