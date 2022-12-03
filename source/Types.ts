export type StoneNotation = [
  x: number,
  y: number,
  color: Colors,
  shape: Shapes,
  player?: number | undefined
];

export enum Colors {
  Purple = 'p',
  Red = 'r',
  Blue = 'b',
  Yellow = 'y',
  Green = 'g',
  Orange = 'o',
}

export enum Shapes {
  Square = 's',
  Circle = 'c',
  Flower = 'f',
  Quadrogram = 'q',
  Diamond = 'd',
  Octogram = 'o',
}

export enum Direction {
  Horizontal = 'x',
  Vertical = 'y'
}

export type ColorShape = [Colors, Shapes]

export type ColorShapeString = `${Colors}${Shapes}`

export type Coordinate = [x: number, y: number]