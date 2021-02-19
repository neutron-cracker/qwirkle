import { Stone } from "./Stone";
import { Direction } from "./Types"

    // No gaps in the bar: eg.. 1 2 _ 4
    // Must not be on top of other stones.
    // 

export function isValidBar (stones: Array<Stone>){
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

    return isSingleColoredOrSingleShaped && hasUniqueColorsOrUniqueShapes && hasAtleastOneNeighbour;
}

export function isBar (stones: Array<Stone>) {
    const firstStone = stones[0];
    const oneColumn = stones.every((stone) => stone.x === firstStone.x);
    const oneRow = stones.every((stone) => stone.y === firstStone.y);
    const isOneBar = (oneRow || oneColumn) && oneRow !== oneColumn || stones.length === 1;
    return isOneBar
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
