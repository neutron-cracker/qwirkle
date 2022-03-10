/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';
import { State } from './State'
import { render, html } from 'ube';
import { Turn } from './Turn';
import { Colors, Shapes } from './Types';
import { QwirkleGameViewer } from './QwirkleGameViewer';

const currentIndex = 1

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

render(document.body, html`

 <${QwirkleGameViewer} .state=${testState}/>

`)