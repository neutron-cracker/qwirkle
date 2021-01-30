import { State } from './State';
import { StoneNotation, Colors, Shapes } from './Types';

const initialState: Array<StoneNotation> = [
  [1, 2, Colors.Red, Shapes.Circle, 1],
  [1, 0, Colors.Red, Shapes.Circle, 2],
  [1, 2, Colors.Red, Shapes.Circle, 1],
];

const state = new State(initialState);

console.log(state.stones[0].neighbours);
