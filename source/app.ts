/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';
import { State } from './State'
/** @ts-ignore */
import {define, render, html, svg, css} from 'uce';

import './QwirkleTurns'
import './QwirkleBoard'

const currentIndex = 1

const testState = new State();
testState.setInitial(referenceState1)

render(document.body, html`

  <qwirkle-turns index=${currentIndex} .state=${testState} />

`)