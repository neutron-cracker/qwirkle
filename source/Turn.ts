import { Stone } from './Stone';
import { State } from './State';
import { StoneNotation } from './Types';

export class Turn {
  public stones: Array<Stone> = [];
  private state: State;

  constructor(stoneNotations: Array<StoneNotation>, state: State) {
    this.state = state;
    this.stones = stoneNotations.map(
      (stoneNotation) => new Stone(stoneNotation, state)
    );
  }

  public get isValid() {
    const firstStone = this.stones[0];

    const oneColumn = this.stones.every((stone) => stone.x === firstStone.x);
    const oneRow = this.stones.every((stone) => stone.y === firstStone.y);
    const isOneBar = (oneRow || oneColumn) && oneRow !== oneColumn || this.stones.length === 1;

    const oneColor = this.stones.every((stone) => stone.color === firstStone.color);
    const oneShape = this.stones.every((stone) => stone.shape === firstStone.shape);
    const isSingleColoredOrSingleShaped = (oneColor || oneShape) && oneColor !== oneShape || this.stones.length === 1;

    const turnColors = this.stones.map((stone) => stone.color)
    const uniqueColors = turnColors.length === new Set(turnColors).size;
    const turnShapes = this.stones.map((stone) => stone.shape)
    const uniqueShapes = turnShapes.length === new Set(turnShapes).size;
    const hasUniqueColorsOrUniqueShapes = (uniqueColors || uniqueShapes) && uniqueColors !== uniqueShapes || this.stones.length === 1;

    // No gaps in the bar: eg.. 1 2 _ 4
    // The bar needs to be attached at atleast one place
    // 

    const hasAtleastOneNeighbour = this.stones.some(stone => stone.neighbours.length)
    
    // if (this.stones.length > 1) {
    //   const direc
    //   firstStone.
    // }
    
    return isOneBar && isSingleColoredOrSingleShaped && hasUniqueColorsOrUniqueShapes;
  }
}