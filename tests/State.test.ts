import { Shapes, Colors, StoneNotation } from '../source/Types';
import { State } from '../source/State';
import { Stone } from '../source/Stone';
import { referenceState1 } from './stateReferences';

const testState = new State(referenceState1);

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
