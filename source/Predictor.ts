import { State } from './State'
import { Stone } from './Stone'
import { ColorShape, Colors, Shapes, Coordinate, Direction } from './Types'

export class Predictor {
    private possibleStones: { [key in `${Colors}${Shapes}`]: Array<Coordinate> }
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
        // check for every this.state.borderCoordinates which stones are possible
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
    
    getPossibleStonesForCoordinate (coordinate: Coordinate) {
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

        for (const bar of bars) {
            const isSameColor = bar[0].color === bar[1].color
            // create the barQwirkle array containing all the shapes from one color or all the colors one shape and compare with bar
            // return the stones present in all bars
            const barQwirkle = []
        }

        /*
                 | |
            ___  |_|_______
            ___| |X|_|______
                 | |
                 | |
        */
        //get all connected bars (max 4)
        //check if bars are valid

        // bar [rood vierkant, rood rondje] Diff: []
        //  
    }

    getPossibleTurns () {

    }

    

}
