import { Shapes, Colors, StoneNotation } from '../source/Types';

// @See images/refrence1.jpeg
export const referenceState1: Array<StoneNotation> = [
  [0, 0, Colors.Blue, Shapes.Diamond],
  [0, 1, Colors.Blue, Shapes.Circle],
  [0, 2, Colors.Blue, Shapes.Square],
  [0, 3, Colors.Blue, Shapes.Octogram],
  [-1, 0, Colors.Yellow, Shapes.Diamond],
  [-1, -1, Colors.Yellow, Shapes.Circle],
  [-1, -2, Colors.Yellow, Shapes.Flower],
  [-1, -3, Colors.Yellow, Shapes.Octogram],
  [-2, 0, Colors.Green, Shapes.Diamond],
  [-2, -1, Colors.Green, Shapes.Circle],
  [-2, -2, Colors.Green, Shapes.Flower],
  [-2, -3, Colors.Green, Shapes.Octogram],
  [-3, -2, Colors.Orange, Shapes.Flower],
  [1, 0, Colors.Purple, Shapes.Diamond],
  [1, 1, Colors.Purple, Shapes.Circle],
  [2, 0, Colors.Red, Shapes.Diamond],
  [2, -1, Colors.Red, Shapes.Quadrogram],
  [3, 0, Colors.Orange, Shapes.Diamond],
  [0, -3, Colors.Red, Shapes.Octogram],
];

export const referenceState2: Array<StoneNotation> = [
  [0, 0, Colors.Blue, Shapes.Diamond],
  [0, 1, Colors.Blue, Shapes.Circle],
];
