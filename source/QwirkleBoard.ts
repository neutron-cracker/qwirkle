import {SVG, HTML, render, html, svg} from 'ube';
import { shapeMap } from './shapeMap';

import { State } from './State';
import { Stone } from './Stone';
import { Colors, Coordinate } from './Types'
import { stoneFactor } from './consts';

export class QwirkleBoard extends (SVG.G as typeof SVGGElement) {

  private stones: Array<Stone>

  upgradedCallback () {
    this.classList.add('qwirkle-board')
    this.draw()
  }

  draw () {
    render (this, svg`
    ${this.stones.map(({x, y, color, shape}) => {
      return svg`
        <g class=${'stone'}>
          <rect class="background" x=${x + stoneFactor} y=${y + stoneFactor} width=${1 - stoneFactor * 2} height=${1 - stoneFactor * 2} />
          ${shapeMap[shape](x, y, color)}
        </g>  
      `
    })}
  `
    )}
}