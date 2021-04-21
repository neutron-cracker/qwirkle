import { StoneNotation, Colors, Shapes, Direction, Coordinate } from './Types';
import { State } from './State';
import { bar } from './helpers'

export class Stone {

  public x: number;
  public y: number;
  public color: Colors;
  public shape: Shapes;
  private player: number | undefined;
  public state: State;

  constructor(stoneNotation: StoneNotation, state: State = null) {
    [this.x, this.y, this.color, this.shape, this.player] = stoneNotation;
    this.state = state ?? new State();
  }

  public get neighbours() {
    const neighbours = this.allNeighbourCoordinates
    .map(coordinate => this.state.stones.find(stone => stone.coordinates(true) === coordinate.join(',')))
    return neighbours.filter((neighbour) => neighbour);
  } 

  public get allNeighbourCoordinates(): Array<Coordinate> {
    return [
      [this.x, this.y - 1],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
    ]
  }

  public get neighbourCoordinates(): Array<Coordinate> {
    return this.neighbours.map((neighbour) => [neighbour.x, neighbour.y])
  }

  /**
   * A bar is a column or a row of stones.
   */
  public bar(direction: Direction, turnStones: Array<Stone> = []) {
    return bar(this.state.stones, direction, this, turnStones)
  }

  public get row() {
    return this.bar(Direction.Horizontal);
  }

  public get column() {
    return this.bar(Direction.Vertical);
  }

  public coordinates(): Coordinate
  public coordinates(toString: false): Coordinate
  public coordinates(toString: true): string
  public coordinates(toString: boolean = false) {
    return toString ? `${this.x},${this.y}` : [this.x, this.y]
  }

  toString () {
    return `${this.x}-${this.y}-${this.color}-${this.shape}`
  }
}

