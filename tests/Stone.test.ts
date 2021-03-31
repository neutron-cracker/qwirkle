import { Stone } from '../source/Stone';
import { State } from '../source/State'
import { Colors, Shapes } from '../source/Types'
import { referenceState2 } from './stateReferences'

test('stone.coordinates return a string when given a true a parameter', () => {
  const testStone = new Stone([0, 0, Colors.Blue, Shapes.Diamond])
  expect(testStone.coordinates(true)).toBe('0,0')
});

test('stone.coordinates return a coordinates tuple when given a false a parameter', () => {
  const testStone = new Stone([0, 0, Colors.Blue, Shapes.Diamond])
  expect(testStone.coordinates()).toEqual([0, 0])
});

test('stone.neighbours', () => {
  const testState = new State();
  testState.setInitial(referenceState2)
  const neighbours = testState.stones[0].neighbours
  expect(neighbours[0].coordinates(true)).toEqual('0,1')
});
