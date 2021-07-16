import { State } from './State';
import { Turn } from './Turn';

import {  Predictor } from './Predictor'
import { Colors, Shapes, Coordinate, StoneNotation } from './Types';
/** @ts-ignore */
import { referenceState1 } from './stateReferences';
import { Stone } from './Stone';
import { getPossibleColorShapesForCoordinate } from './helpers';

/** @ts-ignore */
import { render, html } from 'uhtml'
import './QwirkleBoard'

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);
const turns = predictor.getPossibleTurns([
  [Colors.Blue, Shapes.Square],
  [Colors.Blue, Shapes.Circle],
])

const turnNotations = turns.map(turn => turn.stones.map(stone => stone.toNotation()))

render(document.body, html`
  <h1>test</h1>
  ${turnNotations.map(turnNotation => html`<qwirkle-board state=${JSON.stringify(turnNotation)} />`)}
`)