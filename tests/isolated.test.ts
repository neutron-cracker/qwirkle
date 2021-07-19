import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { Colors, Shapes, Coordinate, StoneNotation } from '../source/Types';
import { Turn } from '../source/Turn';
import { referenceState1 } from './stateReferences';
import { Stone } from '../source/Stone';
import { getPossibleColorShapesForCoordinate } from '../source/helpers';

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);

const turns = predictor.getPossibleTurns([
  [Colors.Blue, Shapes.Square],
  [Colors.Blue, Shapes.Circle],
]);

turns.sort((a, b) => a.toString().localeCompare(b.toString()))
console.log(turns.map(turn => "stones: " + turn.stones.map(stone => `{${stone.color} ${Shapes[stone.shape]}: [${stone.x}, ${stone.y}]}`).join(', ')).join('\n'))
console.log(turns.toString())

test('isolated', () => {
  expect(turns.length).toBe(2)
});

