/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';

/** @ts-ignore */
import { render, html } from 'uhtml'
import './QwirkleBoard'

render(document.body, html`

  <qwirkle-turns></qwirkle-turns>

  <qwirkle-board state=${JSON.stringify(referenceState1)} />
  <qwirkle-board highlights="[[-2,-1], [-2,-3], [-1,-2], [-3,-2]]" state=${JSON.stringify(referenceState1)} />
  <qwirkle-board state=${JSON.stringify(referenceState2)} />
`)