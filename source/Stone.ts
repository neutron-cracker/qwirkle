import { StoneNotation, Colors, Shapes, Direction } from './Types';
import { State } from './State';

export class Stone {
  public x: number;
  public y: number;
  public color: Colors;
  public shape: Shapes;
  private player: number | undefined;
  private state: State;

  constructor(stoneNotation: StoneNotation, state: State) {
    [this.x, this.y, this.color, this.shape, this.player] = stoneNotation;
    this.state = state;
  }

  public get neighbours() {
    const neighbours = [
      this.state.stones.find(
        (stone) => stone.x === this.x - 1 && stone.y === this.y - 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x && stone.y === this.y - 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x + 1 && stone.y === this.y - 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x + 1 && stone.y === this.y
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x + 1 && stone.y === this.y + 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x && stone.y === this.y + 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x - 1 && stone.y === this.y + 1
      ),
      this.state.stones.find(
        (stone) => stone.x === this.x - 1 && stone.y === this.y + 1
      ),
    ];

    return neighbours.filter((neighbour) => neighbour);
  }

  public bar(direction: Direction) {
    const oppositeDirection = direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
    const bar = [];

    bar.push(this);

    const getStonesOneSide = (sum) => {
      let currentStone = this;
      while (currentStone) {
        currentStone = this.state.stones.find(
          (stone) => stone[direction] === currentStone[direction] + sum && 
            stone[oppositeDirection] === currentStone[oppositeDirection]
        );
        if (currentStone) bar.push(currentStone);
      }
    };

    getStonesOneSide(1);
    getStonesOneSide(-1);
    bar.sort((a: Stone, b: Stone) => b[direction] - a[direction]);
    return bar;


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
