import { Colors, Shapes, ColorShape } from "./Types";

export class StoneBag {
  private stones: Array<ColorShape> = []

  constructor() {
    for (const color of Object.keys(Colors)) {
      for (const [shape] of Object.entries(Shapes)) {
        // console.log(shape)
        this.stones.push([Colors[color], Shapes[shape]])
      }
    }
    // console.log(this.stones)

  }
}
