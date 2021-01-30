import { StoneNotation, Colors, Shapes, Direction } from './Types';
import { State } from './State';

export class Stone {
  public x: number;
  public y: number;
  private color: Colors;
  private shape: Shapes;
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

  private bar(direction: Direction) {
    const oppositeDirection = direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
    const bar = [];

    const getStonesOneSide = (sum) => {
      let currentStone = this;
      while (currentStone) {
        bar.push(currentStone);
        currentStone = this.state.stones.find(
          (stone) => stone[direction] === currentStone[direction] + sum && 
            stone[oppositeDirection] === currentStone[oppositeDirection]
        );
      }
    };

    getStonesOneSide(1);
    getStonesOneSide(-1);

    return bar;
  }

  public get row() {
    return this.bar(Direction.Horizontal);
  }

  public get column() {
    return this.bar(Direction.Vertical);
  }
}
