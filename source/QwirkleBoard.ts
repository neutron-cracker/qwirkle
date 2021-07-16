/** @ts-ignore */
import { svg, html, render } from 'uhtml/async'
import { Colors } from './Types'

const colorMap = {
  'p': 'purple',
  'r': 'red',
  'b': 'blue',
  'y': 'yellow',
  'g': 'green',
  'o': 'orange',
}

const factor = .7

const shapeMap = {
  1: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 1.9} cx=${x + .5} cy=${y + .5}>`,
  2: (x, y, color) => svg`<rect fill=${colorMap[color]} x=${x + 0.5 - factor / 2} y=${y + 0.5 - factor / 2} width=${factor} height=${factor} />`,
  3: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 2} cx=${x + .5} cy=${y + .5}>`,
  4: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 2} cx=${x + .5} cy=${y + .5}>`,
  5: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 2} cx=${x + .5} cy=${y + .5}>`,
  6: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 2} cx=${x + .5} cy=${y + .5}>`,
}


export class QwirkleBoard extends HTMLElement {

  private state: Array<any> 

  connectedCallback () {
    this.state = JSON.parse(this.getAttribute('state'))
    this.draw()
  }

  draw () {
    render(this, svg`
      <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        ${this.state.map(([x, y, color, shape]) => svg`
          <rect x=${x} y=${y} width="1" height="1" />
          ${shapeMap[shape](x, y, color)}
        `)}
      </svg>
    `)
  }

}

customElements.define('qwirkle-board', QwirkleBoard)