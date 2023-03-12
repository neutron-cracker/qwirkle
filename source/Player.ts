import { State } from "./State"
import { Stone } from "./Stone"

export class Player {

    public readonly playerId
    private readonly state

    constructor (playerId: number, state: State) {
        this.playerId = playerId
        this.state = state
    }

    // addTurn(stone: Stone, location)

    // finishTurn()
}