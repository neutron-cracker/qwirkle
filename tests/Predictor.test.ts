import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { ColorShape, Colors, Shapes, Coordinate } from '../source/Types';
import { referenceState1, referenceState2 } from './stateReferences';
import { sortCoordinates } from '../source/helpers'

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);

test('getPossibleStonesForCoordinate', () => {
  const possibleStones = predictor.getPossibleStonesForCoordinate([0, -1])
  console.log(possibleStones)
})
