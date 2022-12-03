import { sameItems, isBar, createQwirkleBar, getIntersection, normalizeZero} from "../source/helpers";
import { Colors, Shapes } from '../source/Types'
import { Stone } from '../source/Stone'

test('sameItems while giving arrays with different lengths', () => {
    expect(sameItems([1, 2, 3, 4], [1, 2, 3])).toBe(false)
})

test('sameItems while giving arrays with same lengths, but differents items', () => {
    expect(sameItems([1, 2, 3, 4], [1, 2, 3, 5])).toBe(false)
})

test('sameItems while giving array with same items but different order', () => {
  expect(sameItems([2, 1], [1, 2])).toBe(true)
})

test('isBar should return false when a gap is within a bar', () => {
  const bar = [
    new Stone([0, 0, Colors.Blue, Shapes.Diamond]),
    new Stone([0, 1, Colors.Blue, Shapes.Circle]),
    new Stone([0, 3, Colors.Blue, Shapes.Square]),  
  ]

  expect(isBar(bar)).toBe(false)
})

test('barQwirkle', () => {
  const bar = [
    new Stone([0, 0, Colors.Blue, Shapes.Diamond]),
    new Stone([0, 1, Colors.Blue, Shapes.Circle]),
    new Stone([0, 3, Colors.Blue, Shapes.Square]),  
  ]

  const testBarQwirkle = createQwirkleBar(bar)

  expect(testBarQwirkle).toEqual([
    [Colors.Blue, Shapes.Square],
    [Colors.Blue, Shapes.Circle],
    [Colors.Blue, Shapes.Flower],
    [Colors.Blue, Shapes.Quadrogram],
    [Colors.Blue, Shapes.Diamond],
    [Colors.Blue, Shapes.Octogram],
  ])

  const smallBar = [
    new Stone([0, 0, Colors.Blue, Shapes.Diamond]),
  ]

  const test2BarQwirkle = createQwirkleBar(smallBar)

  expect(test2BarQwirkle).toEqual([
    [Colors.Blue, Shapes.Square],
    [Colors.Blue, Shapes.Circle],
    [Colors.Blue, Shapes.Flower],
    [Colors.Blue, Shapes.Quadrogram],
    [Colors.Blue, Shapes.Diamond],
    [Colors.Blue, Shapes.Octogram],

    [Colors.Purple, Shapes.Diamond],
    [Colors.Red, Shapes.Diamond],
    [Colors.Blue, Shapes.Diamond],
    [Colors.Yellow, Shapes.Diamond],
    [Colors.Green, Shapes.Diamond],
    [Colors.Orange, Shapes.Diamond],
  ])
})


test('intersection', () => {
  const a = [1, 2, 3]
  const b = [2, 4, 5]
  const c = [6, 7, 8, 2]

  const intersection1 = getIntersection(a, b, c)
  expect(intersection1).toEqual([2])

  const d = [1, 2, 3]
  const e = [2, 4, 5, 6]
  const f = [7, 8, 9]

  const intersection2 = getIntersection(d, e, f)
  expect(intersection2).toEqual([])
})

/**
 * In javascript you have a negative zero value that we love, so we just get rid of it.
 * Post on StackOverflow: https://stackoverflow.com/questions/441893/which-is-faster-math-absvalue-or-value-1/441915#441915
 */ 
test('normalize zero', () => {
  const negativeZero = -0;
  const result = normalizeZero(negativeZero);
  expect(result.toString()).toBe("0");
})
