import { Colors, Shapes, ColorShape } from "./Types";

export class StoneBag {
  private stones: Array<ColorShape> = []

  constructor() {
    for (const color of Object.keys(Colors)) {
      for (const shape of Object.keys(Shapes)) {
        this.stones.push(
          [Colors[color], Shapes[shape]],
          [Colors[color], Shapes[shape]],
          [Colors[color], Shapes[shape]]
        )
      }
    }
  }

  removeStones(toBeRemoved: Array<ColorShape>) {
    for (const colorShape of toBeRemoved) {
      const stone = this.stones.find(stone => stone.join() === colorShape.join())
      const index = this.stones.indexOf(stone)
      this.stones.splice(index, 1)
    }
  }
}
