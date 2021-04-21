import { createQwirkleBar, getIntersection } from './helpers';
import { State } from './State'
import { Stone } from './Stone'
import { ColorShape, Colors, Shapes, Coordinate, Direction, ColorShapeString } from './Types'

/**
 * The predicator is used for determining the best possible scores given a certain state and a certain hand of stones.
 * It does this with a pushed based system.
 * The data is updated when a turn is done. This way we can make predictions very fast.
 */
export class Predictor {
    private possibleStones: { [key in `${Colors}${Shapes}`]?: Array<Coordinate> } = {}
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
            const possibleColorShapesForCoordinate = this.getPossibleColorShapesForCoordinate(borderCoordinate)
            for (const possibleColorShape of possibleColorShapesForCoordinate) {
                if (!this.possibleStones[possibleColorShape.join('')]) this.possibleStones[possibleColorShape.join('')] = []
                this.possibleStones[possibleColorShape.join('')].push(borderCoordinate)
            }
        }

        console.log(this.possibleStones)
    }

    /**
     * Stones may be empty as the player can change one or multiple stone in a turn instead of playing stones.
     */
    updateCache (stones: Array<Stone> = []) {
        // Determine which coordinates should be recalculated.
        // calculate possible ColorShapes for a specific coordinate.
    }

    getBestPossibleTurns(unplayedStones: Array<ColorShape>){
        // output one or multiple stones that give the best score.
    }
    
    getPossibleColorShapesForCoordinate (coordinate: Coordinate): Array<ColorShape> {
        const [ x, y ] = coordinate
        const neighbourStones = [
            [x, y - 1],
            [x + 1, y],
            [x, y + 1],
            [x - 1, y]
        ].filter((coordinate: Coordinate) => this.state.stonesCoordinates.has(coordinate.join(',')))
        .map(coordinate => this.state.stones.find((stone: Stone) => stone.coordinates(true) === coordinate.join(',')))
        
        const bars = neighbourStones.map(neighbourStone => {
            const direction = neighbourStone.x === coordinate[0] ? Direction.Vertical : Direction.Horizontal
            return neighbourStone.bar(direction)
        })

        const allPossibleColorShapeStrings = bars.map(bar => {
            const colorShapeBar = bar.map((stone: Stone): ColorShapeString => `${stone.color}${stone.shape}` as ColorShapeString)
            const qwirkleBar = createQwirkleBar(bar).map(colorShape => `${colorShape[0]}${colorShape[1]}` as ColorShapeString)
            return qwirkleBar.filter(colorShapeString => !colorShapeBar.includes(colorShapeString))
        })
        const possibleColorShapeStrings = getIntersection(...allPossibleColorShapeStrings)

        const possibleColorShapes = possibleColorShapeStrings.map((possibleColorShapeString: string): ColorShape => {
            const split = possibleColorShapeString.split('')
            return [split[0], parseInt(split[1])] as ColorShape
        })

        return possibleColorShapes
    }

    getPossibleTurns () {

    }

    

}
