import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { Colors, Shapes, Coordinate, StoneNotation } from '../source/Types';
import { Turn } from '../source/Turn';
import { referenceState1 } from './stateReferences';
import { Stone } from '../source/Stone';
import { getPossibleColorShapesForCoordinate } from '../source/helpers';

test('getPossibleColorShapesForCoordinate', () => {
  const testState = new State()
  testState.setInitial(referenceState1)
  const predictor = new Predictor(testState);
  
  const possibleStones = getPossibleColorShapesForCoordinate(testState.stones, [0, -1], testState.stonesCoordinates)
  expect(possibleStones).toEqual([])

  const possibleStones1 = getPossibleColorShapesForCoordinate(testState.stones, [2 , 1], testState.stonesCoordinates)
  expect(possibleStones1).toEqual([['r', 2]])

  const possibleStones2 = getPossibleColorShapesForCoordinate(testState.stones, [-2, 1], testState.stonesCoordinates)
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

test('getPossibleTurns', () => {
  const testState = new State()
  testState.setInitial(referenceState1)
  const predictor = new Predictor(testState);
  const turns = predictor.getPossibleTurns([
    [Colors.Blue, Shapes.Square]
  ])
  expect(turns.length).toBe(2)
  expect(turns[0].stones.length).toBe(1)
  expect(turns[0].stones.find(stone => stone.x === 1 && stone.y === 3)).toBeDefined()

  expect(turns[1].stones.length).toBe(1)
  expect(turns[1].stones.find(stone => stone.x === -1 && stone.y === 3)).toBeDefined()
})

test('getPossibleTurns further iteration', () => {
  const testState = new State()
  testState.setInitial(referenceState1)
  const predictor = new Predictor(testState);
  const turns = predictor.getPossibleTurns([
    [Colors.Blue, Shapes.Square],
    [Colors.Blue, Shapes.Circle],
  ])

  console.log(turns)

})