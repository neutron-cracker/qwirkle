import { Stone } from "./Stone";
import { Direction, Coordinate, Colors, Shapes, ColorShape, StoneNotation } from "./Types"

/**
 * This function is used in two contexts, one where the stones are already a possible bar, and one where the stones is the whole state.
 * In the latter one the initialStone should be given, in the first one it is not needed.
 */
export function bar (givenStones: Array<Stone>, direction: Direction, initialStone: Stone = null, turnStones: Array<Stone> = []) {
    const stones = [...givenStones, ...turnStones]
    if (initialStone === null) initialStone = stones[0];
    const oppositeDirection = direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
    const bar = [];

    bar.push(initialStone);

    const getStonesOneSide = (sum: number) => {
      let currentStone = initialStone;
      while (currentStone) {
        currentStone = stones.find(
          (stone) => stone[direction] === currentStone[direction] + sum && 
            stone[oppositeDirection] === currentStone[oppositeDirection]
        );
        if (currentStone) bar.push(currentStone);
      }
    };

    getStonesOneSide(1);
    getStonesOneSide(-1);
    bar.sort((a: Stone, b: Stone) => b[direction] - a[direction]);
    return bar;
}

export function isValidBar (stones: Array<Stone>, isFirstTurn: boolean = false) {
    const firstStone = stones[0];
    const oneColor = stones.every(stone => stone.color === firstStone.color);
    const oneShape = stones.every(stone => stone.shape === firstStone.shape);
    const isSingleColoredOrSingleShaped = (oneColor || oneShape) && oneColor !== oneShape || stones.length === 1;

    const turnColors = stones.map(stone => stone.color)
    const uniqueColors = turnColors.length === new Set(turnColors).size;
    const turnShapes = stones.map(stone => stone.shape)
    const uniqueShapes = turnShapes.length === new Set(turnShapes).size;
    const hasUniqueColorsOrUniqueShapes = (uniqueColors || uniqueShapes) && uniqueColors !== uniqueShapes || stones.length === 1;
    const hasAtleastOneNeighbour = stones.some(stone => stone.neighbours.length)

    return isSingleColoredOrSingleShaped && hasUniqueColorsOrUniqueShapes && (hasAtleastOneNeighbour || isFirstTurn);
}

export function isBar (stones: Array<Stone>) {
    const firstStone = stones[0];
    const oneColumn = stones.every((stone) => stone.x === firstStone.x);
    const oneRow = stones.every((stone) => stone.y === firstStone.y);
    const isOneBar = (oneRow || oneColumn) && oneRow !== oneColumn || stones.length === 1;

    const direction = getDirectionOfBar(stones)
    const continuousBar = bar(stones, direction).length === stones.length

    return isOneBar && continuousBar
}

export function getDirectionOfBar (stones: Array<Stone>) {
    return stones.length === 1 ? Direction.Horizontal : (
        stones[0].x === stones[1].x ? Direction.Vertical : Direction.Horizontal
    )
}

export function turnStonesAreValid(stateStones: Array<Stone>, turnStones: Array<Stone>) {
    const noOverlay = turnStones.every(turnStone => stateStones.find(stateStone => turnStone.x === stateStone.x && turnStone.y === stateStone.y) === null)
    const isOneBar = isBar(turnStones)
    return noOverlay && isOneBar
}

export const sameItems = (a: Array<any>, b: Array<any>) => {
    if (a.length !== b.length) return false
    return a.every(item => b.includes(item))
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * Discovers all the bars in the given stones.
 * With this you can easily iterate over all bars in the state.
 */
export function barIterator (barStones: Array<Stone> = []) {
    const bars = []
    const direction = getDirectionOfBar(barStones)
    const firstStone = barStones[0]
    const oppositeDirection = direction === Direction.Horizontal ? Direction.Vertical : Direction.Horizontal;
    bars.push(firstStone.bar(direction, barStones))
    barStones.every(stone => {
        const possibleBar = stone.bar(oppositeDirection, barStones)
        if (possibleBar.length > 1) bars.push(possibleBar)
    })

    return bars
}

/**
 * We picked 1000 because there are no more than thousand stones in the game.
 * It is prefix.
 */
export const sortCoordinates = (a: Coordinate, b: Coordinate) => ((a[0] * 1000) + a[1]) - ((b[0] * 1000) + b[1])

/**
 * @see https://www.petermorlion.com/iterating-a-typescript-enum/
 */
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

/**
 * A Qwirkle Bar is a concept we use to determine what possible stones may be used on a specific coordinate.
 * When a bar is only one stone long, it contains all the stones for the different colors and the different shape.
 */
export const createQwirkleBar = (bar: Array<Stone>) => {
    const barQwirkle: Array<ColorShape> = []
    const firstStone = bar[0]
    const secondStone = bar?.[1]

    if (bar.length === 1) {
        for (const shape of enumKeys(Shapes)) barQwirkle.push([firstStone.color, Shapes[shape]])
        for (const color of enumKeys(Colors)) barQwirkle.push([Colors[color], firstStone.shape])
    }
    else {
        const barUsesShapes = firstStone.shape === secondStone.shape
        if (barUsesShapes) {
            for (const color of enumKeys(Colors)) barQwirkle.push([Colors[color], firstStone.shape])    
        }
        else {
            for (const shape of enumKeys(Shapes)) barQwirkle.push([firstStone.color, Shapes[shape]])
        }
    }
    return barQwirkle
}

/**
 * Given multiple arrays as seperate arguments to the funtion,
 * gives back all the items that exist in all the input arrays.
 */
export const getIntersection = (...input: Array<Array<unknown>>) => {
    return input.reduce((a, b) => b.filter(Set.prototype.has, new Set(a)))
}
