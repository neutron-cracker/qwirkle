import { State } from '../source/State';
import { Turn } from '../source/Turn';
import { StoneNotation, Colors, Shapes } from '../source/Types';

import { referenceState1 } from './stateReferences';
const testState = new State(referenceState1);

test('turn validation', () => {
  const correctTurn = new Turn([
    [2, 1, Colors.Red, Shapes.Circle, 1]
  ], testState)

  expect(correctTurn.isValid).toBe(true)

  const wrongTurn = new Turn([
    [2, 1, Colors.Red, Shapes.Square, 1]
  ], testState)

  expect(wrongTurn.isValid).toBe(false)
})
