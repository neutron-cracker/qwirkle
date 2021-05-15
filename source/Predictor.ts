import { createQwirkleBar, getIntersection, barIterator, getDirectionOfBar, getPossibleColorShapesForCoordinate} from './helpers';
import { State } from './State'
import { Stone } from './Stone'
import { Turn } from './Turn';
import { ColorShape, Colors, Shapes, Coordinate, Direction, ColorShapeString, StoneNotation } from './Types'

/**
 * The predicator is used for determining the best possible scores given a certain state and a certain hand of stones.
 * It does this with a pushed based system.
 * The data is updated when a turn is done. This way we can make predictions very fast.
 */
export class Predictor {
    public possibleStones: { [key in `${Colors}${Shapes}`]?: Array<Coordinate> } = {}
    private state: State;

    constructor(state: State) {
        this.state = state;
        
        this.startCache()
        this.state.addEventListener('turn-added', (event: Event) => {
            const turn = (event as CustomEvent).detail
            this.updateCache(turn.stones)
        })
    }

    startCache () {
        for (const borderCoordinate of this.state.borderCoordinates.values()) {
            const possibleColorShapesForCoordinate = getPossibleColorShapesForCoordinate(this.state.stones, borderCoordinate, this.state.stonesCoordinates)
            for (const possibleColorShape of possibleColorShapesForCoordinate) {
                if (!this.possibleStones[possibleColorShape.join('')]) this.possibleStones[possibleColorShape.join('')] = []
                this.possibleStones[possibleColorShape.join('')].push(borderCoordinate)
            }
        }
    }

    /**
     * Stones may be empty as the player can change one or multiple stone in a turn instead of playing stones.
     */
    updateCache (stones: Array<Stone>) {
        // Determine which coordinates should be recalculated.
        // calculate possible ColorShapes for a specific coordinate.

        const coordinatesToBeChanged: Array<Coordinate> = []
        
        for (const stone of stones) {
            // First remove the old possibility.
            const colorShape = `${stone.color}${stone.shape}`
            const oldCoordinate = this.possibleStones[colorShape].find((coordinate: Coordinate) => stone.x === coordinate[0] && stone.y === coordinate[1])
            const indexOfCoordinate = this.possibleStones[colorShape].indexOf(oldCoordinate)
            this.possibleStones[colorShape].splice(indexOfCoordinate, 1)
            
            for (const neighbourCoordinate of stone.allNeighbourCoordinates.values()) {
                const stateStonesCoordinateHasCoordinate = this.state.stonesCoordinates.has(neighbourCoordinate.toString())
                if (!stateStonesCoordinateHasCoordinate) coordinatesToBeChanged.push(neighbourCoordinate)
            }
        }

        // Additions
        const bars = barIterator(stones)

        for (const bar of bars) {
            // Bar has to be in order. Doesn't matter if it is ascending or descending.
            const firstStone: Stone = bar[0]
            const lastStone: Stone = bar[bar.length-1]
            const directionIsVertical = getDirectionOfBar(bar) === Direction.Vertical
            const coordinatesAfterAndBeforeBar: Array<Coordinate> = []

            if (directionIsVertical) {
                const numberOfAxis: number = firstStone.x
                const firstStoneCoordinateIsSmaller = firstStone.y < lastStone.y
                const coordinates: Array<Coordinate> = firstStoneCoordinateIsSmaller ? [[numberOfAxis, firstStone.y - 1] , [numberOfAxis, lastStone.y + 1]] : [[numberOfAxis, lastStone.y - 1], [numberOfAxis, firstStone.y + 1]]
                coordinatesAfterAndBeforeBar.push(...coordinates)
            
            } else {
                const numberOfAxis = firstStone.y
                const firstStoneCoordinateIsSmaller = firstStone.x < lastStone.x
                const coordinates: Array<Coordinate> = firstStoneCoordinateIsSmaller ? [[firstStone.x - 1, numberOfAxis], [lastStone.x + 1, numberOfAxis]]: [[lastStone.x - 1, numberOfAxis], [firstStone.x + 1, numberOfAxis]]
                coordinatesAfterAndBeforeBar.push(...coordinates)
            }
            
            for (const coordinateFromBar of coordinatesAfterAndBeforeBar) {
                const alreadyExistsInCoordinatesToBeChanged = !!coordinatesToBeChanged.find(coordinate => coordinate.join(',') === coordinateFromBar.join(','))
                if(!alreadyExistsInCoordinatesToBeChanged) coordinatesToBeChanged.push(coordinateFromBar)
            }
        }

        for (const coordinate of coordinatesToBeChanged) {
            // get new colorShape for coordinate
            // go trough every item color shape and check if coordinate is there. If one of new color shape, add/leave it, else remove coordinate
            const possibleColorShapeStrings = getPossibleColorShapesForCoordinate(this.state.stones, coordinate, this.state.stonesCoordinates).map(colorShape => `${colorShape[0]}${colorShape[1]}` as ColorShapeString)
            for (const colorShapeKey in this.possibleStones) {
               
                const coordinateInEntry = this.possibleStones[colorShapeKey].find((innerCoordinate: Coordinate) => innerCoordinate.toString() === coordinate.toString())
                const inEntryWithPossibleShapeColor = !(possibleColorShapeStrings.find(colorShape => `${colorShape[0]}${colorShape[1]}` === colorShapeKey) === undefined)

                if(coordinateInEntry === undefined && inEntryWithPossibleShapeColor) {
                    this.possibleStones[colorShapeKey].push(coordinate)
                } else if (coordinateInEntry !== undefined && !inEntryWithPossibleShapeColor) {
                    const indexOfCoordinate = this.possibleStones[colorShapeKey].indexOf(coordinateInEntry)
                    this.possibleStones[colorShapeKey].splice(indexOfCoordinate, 1)
                }
            }
        }
    }


    getBestPossibleTurns(unplayedStones: Array<ColorShape>){
        // output one or multiple stones that give the best score.
        // required items: state, possibleStones, unplayedStones
    }
    

    getPossibleTurns (colorShapes: Array<ColorShape>) {
        const possibleTurns: Array<Turn> = []


        for (const colorShape of colorShapes) {
            const possibleCoordinates = this.possibleStones[colorShape.join('')]

            const processCoordinate = (coordinate: Coordinate, filteredColorShapes: Array<ColorShape>) => {
                const colorShapes = getPossibleColorShapesForCoordinate(this.state.stones, coordinate)
                //get possiblecolorshapes for Coordinate
                //
            }

            for (const possibleCoordinate of possibleCoordinates) {
                const otherColorShapes = colorShapes.filter(innerColorShape => innerColorShape !== colorShape)
                processCoordinate(possibleCoordinate, otherColorShapes)
            }

            //coordinate -> colorshapes -> intersection hand -> pop from trail > recurse!
        }
        return possibleTurns
    }

    

}
