import { StoneNotation, Colors, Shapes, Direction} from './Types';
import { State } from './State';

export class Stone {
  private x: number;
  private y: number;
  private color: Colors;
  private shape: Shapes;
  private player: number;
  private state: State;

  constructor(stoneNotation: StoneNotation, state: State) {
    [this.x, this.y, this.color, this.shape, this.player] = stoneNotation;
    this.state = state;
  }

  public get neighbours() {
    const neighbours = [
      this.state.stones.find(stone => stone.x === this.x - 1 && stone.y === this.y - 1),
      this.state.stones.find(stone => stone.x === this.x && stone.y === this.y - 1),
      this.state.stones.find(stone => stone.x === this.x + 1 && stone.y === this.y - 1),
      this.state.stones.find(stone => stone.x === this.x + 1 && stone.y === this.y),
      this.state.stones.find(stone => stone.x === this.x + 1 && stone.y === this.y + 1),
      this.state.stones.find(stone => stone.x === this.x && stone.y === this.y + 1),
      this.state.stones.find(stone => stone.x === this.x - 1 && stone.y === this.y + 1),
      this.state.stones.find(stone => stone.x === this.x - 1 && stone.y === this.y + 1),
    ]

    return neighbours.filter(neighbour => neighbour)
  }

  private bar(direction: Direction) {
    const bar = []

    const getStonesOneSide = (sum) => {
      let currentStone = this
      while (currentStone) {
        bar.push(currentStone)
        currentStone = this.state.stones.find(stone => stone[direction] === currentStone[direction] + sum)
      }
    }

    getStonesOneSide(1)
    getStonesOneSide(-1)

    return bar
  }

}

