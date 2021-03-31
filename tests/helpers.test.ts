import { sameItems, isBar } from "../source/helpers";
import { Colors, Shapes, StoneNotation } from '../source/Types'
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

