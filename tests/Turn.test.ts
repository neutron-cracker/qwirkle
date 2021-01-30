import { State } from '../source/State';
import { Turn } from '../source/Turn';
import { StoneNotation, Colors, Shapes } from '../source/Types';

import { referenceState1 } from './stateReferences';
const testState = new State(referenceState1);

test('turn validation', () => {
  const newTurn = new Turn([
    [1, 2, Colors.Red, Shapes.Circle, 1]
  ], testState)

  expect(newTurn.isValid).toBe(true)
})
