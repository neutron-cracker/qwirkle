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
])

test('isolated', () => {
  expect(turns.length).toBe(2)
})

console.log(turns)
