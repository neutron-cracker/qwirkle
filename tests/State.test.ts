import { Shapes, Colors, StoneNotation, Coordinate } from '../source/Types';
import { State } from '../source/State';
import { Stone } from '../source/Stone';
import { sortCoordinates } from '../source/helpers';
import { referenceState1, referenceState2 } from './stateReferences';

const testState = new State();
testState.setInitial(referenceState1)

test('bar returns the correct stones', () => {
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