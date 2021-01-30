import { State } from './State';
import { Turn } from './Turn';
import { StoneNotation, Colors, Shapes } from './Types';

const initialState: Array<StoneNotation> = [
  [1, 2, Colors.Red, Shapes.Circle, 1],
  [1, 0, Colors.Red, Shapes.Circle, 2],
  [1, 2, Colors.Red, Shapes.Circle, 1],
];

const state = new State(initialState);

const newTurn = new Turn([
  [1, 2, Colors.Red, Shapes.Circle, 1]
], state)

state.addTurn(newTurn)