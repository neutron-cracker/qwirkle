import { Shapes, Colors, StoneNotation } from '../source/Types';
import { State } from '../source/State';
import { Stone } from '../source/Stone';

// @See images/refrence1.jpeg
const referenceState1: Array<StoneNotation> = [
  [0, 0, Colors.Blue, Shapes.Diamond],
  [0, 1, Colors.Blue, Shapes.Circle],
  [0, 2, Colors.Blue, Shapes.Square],
  [0, 3, Colors.Blue, Shapes.Octogram],
  [-1, 0, Colors.Yellow, Shapes.Diamond],
  [-1, -1, Colors.Yellow, Shapes.Circle],
  [-1, -2, Colors.Yellow, Shapes.Flower],
  [-1, -3, Colors.Yellow, Shapes.Octogram],
  [-2, 0, Colors.Green, Shapes.Diamond],
  [-2, -1, Colors.Green, Shapes.Circle],
  [-2, -2, Colors.Green, Shapes.Flower],
  [-2, -3, Colors.Green, Shapes.Octogram],
  [-3, -2, Colors.Orange, Shapes.Flower],
  [1, 0, Colors.Purple, Shapes.Diamond],
  [1, 1, Colors.Purple, Shapes.Circle],
  [2, 0, Colors.Red, Shapes.Diamond],
  [2, -1, Colors.Red, Shapes.Quadrogram],
  [3, 0, Colors.Orange, Shapes.Diamond],
  [0, -3, Colors.Red, Shapes.Octogram],
];

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

  // In the reference image there is a red octogram with coordinates: 0, -3. The octogram is in the column, but shouldn't be included in the column from the blue diamond.
  const redOctogram = column.find(stone => stone.color === Colors.Red && stone.shape === Shapes.Octogram)
  expect(redOctogram).toBe(undefined)
});
