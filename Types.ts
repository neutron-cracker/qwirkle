export type StoneNotation = [
  x: number,
  y: number,
  color: Colors,
  shape: Shapes,
  player: number
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
  Square = 1,
  Circle = 2,
  Flower = 3,
  Star = 4,
  Diamond = 5,
  Octogram = 6,
}

export enum Direction {
  Horizontal = 'x',
  Vertical = 'y'
}
