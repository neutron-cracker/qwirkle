import {SVG, HTML, render, html, svg} from 'ube';
/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';
import { State } from './State'
import { Turn } from './Turn';
import { Colors, Shapes } from './Types';
import { QwirkleGameViewer } from './QwirkleGameViewer';
import { normalizeZero } from './helpers';
import { stoneFactor } from './consts';

export class QwirkleGameMutator extends (HTML.Div as typeof HTMLElement) {

  private state: State
  private qwirkleGameViewer: any

  upgradedCallback () {
    this.classList.add('qwirkle-game-mutator')

    /** Development */
    this.state = new State();
    this.state.setInitial(referenceState1)
    const correctTurn = new Turn([
        [2, 1, Colors.Red, Shapes.Circle, 1]
    ], this.state)
      
    const correctTurn2 = new Turn([
    [-2, -4, Colors.Green, Shapes.Quadrogram, 1]
    ], this.state)
    
    const correctTurn3 = new Turn([
    [1, -1, Colors.Purple, Shapes.Quadrogram, 1]
    ], this.state)
    
    const correctTurn4 = new Turn([
    [0, -2, Colors.Red, Shapes.Flower, 1],
    [-4, -2, Colors.Blue, Shapes.Flower, 1]
    ], this.state)
    
    this.state.addTurn(correctTurn)
    this.state.addTurn(correctTurn2)
    this.state.addTurn(correctTurn3)
    this.state.addTurn(correctTurn4)
    /** Development */

    this.draw()
  }

  blockClick(x, y) {
      console.log(x, y);
  }

  draw () {
    const {smallestX, smallestY, horizontalStoneCount, verticalStoneCount} = this.state.getBoardSizeInformation()
    let minX = smallestX - 1;
    let minY = smallestY - 1;
    let countX = horizontalStoneCount + 2;
    let countY = verticalStoneCount + 2;

    const blocks = [...this.state.borderCoordinates.values()].map(([x, y]) => ({x , y}))

    render(this, html`
      <svg style=${`width: calc(var(--stoneWidth) * ${countX})`} class="grid" viewBox=${`${minX} ${minY} ${countX} ${countY}`}>
        ${blocks.map(({x, y}) => svg`<rect onclick=${() => this.blockClick(x, normalizeZero(y * -1))} x=${x + stoneFactor} y=${y + stoneFactor} width=${1 - stoneFactor * 2} height=${1 - stoneFactor * 2} />`)}
      </svg>
      <${QwirkleGameViewer} ref=${element => {
        if (this.qwirkleGameViewer) return
        this.qwirkleGameViewer = element
      }} .state=${this.state} index=${this.state.turns.length} />
    `)
  }
}