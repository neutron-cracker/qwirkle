import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { referenceState1 } from './stateReferences';

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);

test('getPossibleColorShapesForCoordinate', () => {
  const possibleStones = predictor.getPossibleColorShapesForCoordinate([0, -1])
  expect(possibleStones).toEqual([])

  const possibleStones1 = predictor.getPossibleColorShapesForCoordinate([2 , 1])
  expect(possibleStones1).toEqual([['r', 2]])

  const possibleStones2 = predictor.getPossibleColorShapesForCoordinate([-2, 1])
  expect(possibleStones2).toEqual([['g', 1], ['g', 4]])
})