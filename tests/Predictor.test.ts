import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { Colors, Shapes, Coordinate, StoneNotation } from '../source/Types';
import { Turn } from '../source/Turn';
import { referenceState1 } from './stateReferences';

test('getPossibleColorShapesForCoordinate', () => {
  const testState = new State()
  testState.setInitial(referenceState1)
  const predictor = new Predictor(testState);
  
  const possibleStones = predictor.getPossibleColorShapesForCoordinate([0, -1])
  expect(possibleStones).toEqual([])

  const possibleStones1 = predictor.getPossibleColorShapesForCoordinate([2 , 1])
  expect(possibleStones1).toEqual([['r', 2]])

  const possibleStones2 = predictor.getPossibleColorShapesForCoordinate([-2, 1])
  expect(possibleStones2).toEqual([['g', 1], ['g', 4]])
})

test('update possible stone cache', () => {
  const testState = new State()
  testState.setInitial(referenceState1)
  const predictor = new Predictor(testState);
  const testTurn = new Turn([
    [-1, 2, Colors.Blue, Shapes.Flower]
  ], testState)

  const removedCoordinateBeforeTurn = predictor.possibleStones[`${Colors.Blue}${Shapes.Flower}`].find((coordinate: Coordinate) => coordinate.join(',') === '-1,2')
  expect(removedCoordinateBeforeTurn).toBeDefined()

  const foundAddedCoordinateBeforeTurn = predictor.possibleStones[`${Colors.Blue}${Shapes.Circle}`].find((coordinate: Coordinate) => coordinate.join(',') === '-2,2')
  expect(foundAddedCoordinateBeforeTurn).toBe(undefined)

  testState.addTurn(testTurn)

  const removedCoordinateAfterTurn = predictor.possibleStones[`${Colors.Blue}${Shapes.Flower}`].find((coordinate: Coordinate) => coordinate.join(',') === '-1,2')
  expect(removedCoordinateAfterTurn).toBe(undefined)

  const foundAddedCoordinateAfterTurn = predictor.possibleStones[`${Colors.Blue}${Shapes.Circle}`].find((coordinate: Coordinate) => coordinate.join(',') === '-2,2')
  expect(foundAddedCoordinateAfterTurn).toBeDefined()
  

})