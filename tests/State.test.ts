import { Shapes, Colors, Coordinate } from '../source/Types';
import { State } from '../source/State';
import { sortCoordinates } from '../source/helpers';
import { referenceState1, referenceState2 } from './stateReferences';


test('bar returns the correct stones', () => {
  const testState = new State();
  testState.setInitial(referenceState1)

  const blueDiamond = testState.stones.find(stone => stone.x === 0 && stone.y === 0)
  const row = blueDiamond.row
  const rowNumbers = row.map(stone => stone.y)

  const column = blueDiamond.column
  const columnNumbers = column.map(stone => stone.x)

  for (const rowNumber of rowNumbers) {
    expect(rowNumber).toBe(0)
  }

  for (const columnNumber of columnNumbers) {
    expect(columnNumber).toBe(0)
  }

  // In the reference image there is a red octogram with coordinates: 0, -3. 
  // The octogram is in the column, but shouldn't be included in the column from the blue diamond.
  const redOctogram = column.find(stone => stone.color === Colors.Red && stone.shape === Shapes.Octogram)
  expect(redOctogram).toBe(undefined)
});

test('getBorderCoordinates returns the correct border coordinates', () => {
    const testState = new State();
    testState.setInitial(referenceState2)
    const values = testState.borderCoordinates.values()
    const border = Array.from(values).sort(sortCoordinates)

    const expectedBorder: Array<Coordinate> = [
        <Coordinate> [1,0],
        <Coordinate> [-1,0],
        <Coordinate> [-1,1],
        <Coordinate> [1,1],
        <Coordinate> [0,-1],
        <Coordinate> [0,2],
        
    ].sort(sortCoordinates)

    expect(border).toEqual(expectedBorder)
})

test('getBorderCoordinates understands qwirkle rule', () => {
  const testState = new State();
  testState.setInitial(referenceState1)
  const border = [...testState.borderCoordinates.values()]
  const impossibleLeftStone = border.find((coordinate: Coordinate) => coordinate.join(',') === '-3,0')
  const impossibleRightStone = border.find((coordinate: Coordinate) => coordinate.join(',') === '4,0')
  expect(impossibleLeftStone).toEqual(undefined)
  expect(impossibleRightStone).toEqual(undefined)
})