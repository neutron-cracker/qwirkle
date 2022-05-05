/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';
import { State } from './State'
import { render, html } from 'ube';
import { Turn } from './Turn';
import { Colors, Shapes } from './Types';
import { QwirkleGameViewer } from './QwirkleGameViewer';

//@ts-ignore
window.count = 0
let currentIndex = 2

const testState = new State();
testState.setInitial(referenceState1)
const correctTurn = new Turn([
    [2, 1, Colors.Red, Shapes.Circle, 1]
], testState)
  
const correctTurn2 = new Turn([
[-2, -4, Colors.Green, Shapes.Quadrogram, 1]
], testState)

const correctTurn3 = new Turn([
[1, -1, Colors.Purple, Shapes.Quadrogram, 1]
], testState)

const correctTurn4 = new Turn([
[0, -2, Colors.Red, Shapes.Flower, 1],
[-3, -2, Colors.Blue, Shapes.Flower, 1]
], testState)

testState.addTurn(correctTurn)
testState.addTurn(correctTurn2)
testState.addTurn(correctTurn3)
testState.addTurn(correctTurn4)

console.log(testState);

let gameViewer: QwirkleGameViewer

const updateIndex = (value: number) => {
  currentIndex += value
  if(currentIndex >= gameViewer.stoneSets.length) {
      currentIndex = gameViewer.stoneSets.length
  }
  else if (currentIndex < 0) {
      currentIndex = 0
  }
  draw()
}

function draw() {
    render(document.body, html`
    <div>
      <button onclick=${() => updateIndex(-1)}>-</button>
      <${QwirkleGameViewer} .state=${testState} index=${currentIndex} ref=${element => gameViewer = element}/>
      <button onclick=${() => updateIndex(+1)}>+</button>
    </div>
  `)
}

draw()
