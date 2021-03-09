import { State } from '../source/State';
import { Turn } from '../source/Turn';
import { StoneNotation, Colors, Shapes } from '../source/Types';

import { referenceState1 } from './stateReferences';
const testState = new State(referenceState1);

const correctTurn = new Turn([
  [2, 1, Colors.Red, Shapes.Circle, 1]
], testState)

const correctTurn2 = new Turn([
  [-2, -4, Colors.Green, Shapes.Quadrogram, 1]
], testState)

const correctTurn3 = new Turn([
  [1, -1, Colors.Purple, Shapes.Quadrogram, 1]
], testState)

const wrongTurn = new Turn([
  [2, 1, Colors.Red, Shapes.Square, 1]
], testState)

const qwirkleTurn = new Turn([
  [-2, -4, Colors.Green, Shapes.Quadrogram, 1],
  [-2, -5, Colors.Green, Shapes.Square, 1]
], testState)

test('turn validation', () => {
  expect(correctTurn.isValid).toBe(true)
  expect(wrongTurn.isValid).toBe(false)
})

test('qwirklepoints are added', () => {
  expect(qwirkleTurn.score).toBe(12)
})

test('normal are added', () => {
  expect(correctTurn.score).toBe(6)
  expect(correctTurn2.score).toBe(5)
  expect(correctTurn3.score).toBe(5)
})
