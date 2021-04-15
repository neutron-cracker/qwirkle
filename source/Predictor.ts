import { State } from './State'
import { Stone } from './Stone'
import { ColorShape, Colors, Shapes, Coordinate } from './Types'

export class Predictor {
    private possibleStones: { [key in `${Colors}${Shapes}`]: Array<Coordinate> }
    private state: State;

    constructor(state: State) {
        this.state = state;

        this.updateCache()
        this.state.addEventListener('turn-added', (event: Event) => {
            const turn = (event as CustomEvent).detail
            this.updateCache(turn.stones)
        })
    }



    updateCache (stones: Array<Stone> = []) {
        

        // Determine which coordinates should be recalculated.
        // calculate possible ColorShapes for a specific coordinate.
    }

    getBestPossibleTurns(unplayedStones: Array<ColorShape>){
        // output one or multiple stones that give the best score.
    }
    
    getPossibleTurns () {

    }

    

}
