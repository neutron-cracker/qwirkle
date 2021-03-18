import { State } from './State'
import { Stone } from './Stone'
import { ColorShape, Colors, Shapes, Coordinate } from './Types'

export class Predictor {
    private possibleStones: { [key in `${Colors}${Shapes}`]: Array<string> }
    private state: State;
    private boardStonesCoordinates: Set<string>

    constructor(state: State) {
        this.state = state;
        this.boardStonesCoordinates = new Set(this.state.stones.map(stone => `${stone.x},${stone.y}`))

        this.updateCache(this.state.stones)
        this.state.addEventListener('turn-added', (event: Event) => {
            const turn = (event as CustomEvent).detail
            for (const stone of turn.stones) this.boardStonesCoordinates.add(`${stone.x},${stone.y}`)

            this.updateCache(turn.stones)
        })
    }

    /**
     * Give the whole state.stones or give it the stones of one turn by incremential updates.
     */
    getBorderCoordinates (stones: Array<Stone>) {
        const coordinates: Map<string, Coordinate> = new Map()


        for (const stone of stones) {

            for (const neighbourCoordinate of stone.neighbourCoordinates) {
                const neighbourCoordinateKey = neighbourCoordinate.join(',')
                if (this.boardStonesCoordinates.has(neighbourCoordinateKey)) continue;

                if (!coordinates.has(neighbourCoordinateKey)) coordinates.set(neighbourCoordinateKey, neighbourCoordinate)
            }
        }

        return Array.from(coordinates.values())
    }

    updateCache (stones: Array<Stone>) {

    }

    getBestPossibleTurns(unplayedStones: Array<ColorShape>){

        // output one or multiple stones that give the best score.
    }
    
    getPossibleTurns () {

    }

    

}
