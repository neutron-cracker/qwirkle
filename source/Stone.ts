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

  // TODO check if we can optimize with neighbourCoordinates
  public get neighbours() {
    const neighbours = [
      this.state.stones.find(
        (stone) => stone.x === this.x && stone.y === this.y - 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x + 1 && stone.y === this.y
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x && stone.y === this.y + 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x - 1 && stone.y === this.y
      ),
    ];

    return neighbours.filter((neighbour) => neighbour);
  } 

  public get neighbourCoordinates(): Array<Coordinate> {
    return [
      [this.x, this.y - 1],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
    ]
  }

  public bar(direction: Direction, turnStones: Array<Stone> = []) {
    return bar(this.state.stones, direction, this, turnStones)
  }

  public get row() {
    return this.bar(Direction.Horizontal);
  }

  public get column() {
    return this.bar(Direction.Vertical);
  }

  toString () {
    return `${this.x}-${this.y}-${this.color}-${this.shape}`
  }
}
