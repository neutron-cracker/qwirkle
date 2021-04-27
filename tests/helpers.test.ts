import { sameItems, isBar, createQwirkleBar, getIntersection} from "../source/helpers";
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
    ['b', 1],
    ['b', 2],
    ['b', 3],
    ['b', 4],
    ['b', 5],
    ['b', 6],
  ])

  const smallBar = [
    new Stone([0, 0, Colors.Blue, Shapes.Diamond]),
  ]

  const test2BarQwirkle = createQwirkleBar(smallBar)

  expect(test2BarQwirkle).toEqual([
    ['b', 1],
    ['b', 2],
    ['b', 3],
    ['b', 4],
    ['b', 5],
    ['b', 6],

    ['p', 5],
    ['r', 5],
    ['b', 5],
    ['y', 5],
    ['g', 5],
    ['o', 5],
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
