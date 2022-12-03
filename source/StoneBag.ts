import { Colors, Shapes, ColorShape } from "./Types";

export class StoneBag {
  private Stones: Array<ColorShape>

  constructor() {
    for (const key in Object.keys(Colors)) {
      console.log(key);
    }
  }
}
