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
const flowerFactor = .33
const innerQuadrogramFactor = .4
const outerQuadrogramFactor = .1
const diamondFactor = .15
const innerOctagramFactor = innerQuadrogramFactor
const outerOctagramFactor = outerQuadrogramFactor

const shapeMap = {
  1: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 1.9} cx=${x + .5} cy=${y + .5} />`,
  2: (x, y, color) => svg`<rect fill=${colorMap[color]} x=${x + 0.5 - factor / 2} y=${y + 0.5 - factor / 2} width=${factor} height=${factor} />`,
  3: (x, y, color) => svg`
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + 1 -flowerFactor} cy=${y + .5} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + flowerFactor} cy=${y + .5} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + .5} cy=${y + 1 -flowerFactor} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + .5} cy=${y + flowerFactor} />`,
  4: (x, y, color, rotate = false) => svg`<polygon fill=${colorMap[color]} points=${`
    ${x + .5},${y + outerQuadrogramFactor} 
    ${x + 1 - innerQuadrogramFactor},${y + innerQuadrogramFactor} 
    ${x + 1 - outerQuadrogramFactor},${y + .5} 
    ${x + 1 - innerQuadrogramFactor},${y + 1 - innerQuadrogramFactor} 
    ${x + .5},${y + 1 - outerQuadrogramFactor} 
    ${x + innerQuadrogramFactor},${y + 1 - innerQuadrogramFactor} 
    ${x + outerQuadrogramFactor},${y + .5}
    ${x + innerQuadrogramFactor},${y + innerQuadrogramFactor} 
  `} transform=${rotate ? `rotate(45 ${x + .5} ${y + .5})`: null} />`,
  5: (x, y, color) => svg`<polygon fill=${colorMap[color]} points=${`
    ${x + .5},${y + 1 - diamondFactor} 
    ${x + diamondFactor},${y + .5} 
    ${x + .5},${y + diamondFactor} 
    ${x + 1 - diamondFactor},${y + .5}
  `} />`,
  6: (x, y, color) => svg`${shapeMap[4](x, y, color)}${shapeMap[4](x, y, color, true)}`,}

export class QwirkleBoard extends HTMLElement {

  private state: Array<any> 

  connectedCallback () {
    this.state = JSON.parse(this.getAttribute('state'))
    this.draw()
  }

  draw () {
    render(this, svg`
      <svg viewBox="-3 -3 10 10" xmlns="http://www.w3.org/2000/svg">
        ${this.state.map(([x, y, color, shape]) => svg`
          <rect x=${x} y=${y} width="1" height="1" />
          ${shapeMap[shape](x, y, color)}
        `)}
      </svg>
    `)
  }

}

customElements.define('qwirkle-board', QwirkleBoard)