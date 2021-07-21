/** @ts-ignore */
import { referenceState1, referenceState2 } from './stateReferences';

/** @ts-ignore */
import { render, html } from 'uhtml'
import './QwirkleBoard'

render(document.body, html`
  <qwirkle-board state=${JSON.stringify(referenceState1)} />
  <qwirkle-board state=${JSON.stringify(referenceState2)} />
`)