import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { ColorShape, Colors, Shapes, Coordinate } from '../source/Types';
import { referenceState1, referenceState2 } from './stateReferences';
import { sortCoordinates } from '../source/helpers'

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);

test('getPossibleStonesForCoordinate', () => {
  console.time()
  const possibleStones = predictor.getPossibleStonesForCoordinate([0, -1])
  expect(possibleStones).toEqual([])

  const possibleStones1 = predictor.getPossibleStonesForCoordinate([2 , 1])
  expect(possibleStones1).toEqual(['r2'])

  const possibleStones2 = predictor.getPossibleStonesForCoordinate([-2, 1])
  expect(possibleStones2).toEqual(['g1', 'g4'])
})
