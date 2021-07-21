/** @ts-ignore */
import { referenceState1 } from './stateReferences';

/** @ts-ignore */
import { render, html } from 'uhtml'
import './QwirkleBoard'

render(document.body, html`
  <h1>test</h1>
  <qwirkle-board state=${JSON.stringify(referenceState1)} />
`)