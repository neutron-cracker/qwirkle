/** @ts-ignore */
import { svg, html, render } from 'uhtml/async'
import { Colors } from './Types'

const colorMap = {
  'p': 'rgb(135, 41, 150)',
  'r': 'rgb(255, 46, 23)',
  'b': 'rgb(0, 144, 211)',
  'y': 'rgb(255, 217, 57)',
  'g': 'rgb(136, 201, 70)',
  'o': 'rgb(255, 144, 39)',
}

const factor = .7
const flowerFactor = .33
const innerQuadrogramFactor = .4
const outerQuadrogramFactor = .1
const diamondFactor = .15
const stoneFactor = .02

const shapeMap = {
  1: (x, y, color) => svg`<rect fill=${colorMap[color]} x=${x + 0.5 - factor / 2} y=${y + 0.5 - factor / 2} width=${factor} height=${factor} />`,
  2: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${factor / 1.9} cx=${x + .5} cy=${y + .5} />`,
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

  private smallestX = 0
  private smallestY = 0
  private biggestX = 0
  private biggestY = 0
  private horizontalStoneCount = 0
  private verticalStoneCount = 0


  connectedCallback () {
    this.state = JSON.parse(this.getAttribute('state'))

    for (const [x, y] of this.state) {
      if (x < this.smallestX) this.smallestX = x
      if (x > this.biggestX) this.biggestX = x
      if (y < this.smallestY) this.smallestY = y
      if (y > this.biggestY) this.biggestY = y
    }
    this.horizontalStoneCount = this.biggestX - this.smallestX + 1
    this.verticalStoneCount = this.biggestY - this.smallestY + 1
    this.draw()
  }

  draw () {
    render(this, html`
    <style>
      :root {--stoneWidth: 40px;}
      qwirkle-board {
        transform: scale(1, -1);
        display: block;
      }
    </style>
    ${ svg`
    <svg style=${`width: calc(var(--stoneWidth) * ${this.horizontalStoneCount})`} viewBox=${`${this.smallestX} ${this.smallestY} ${this.horizontalStoneCount} ${this.verticalStoneCount}`} xmlns="http://www.w3.org/2000/svg">
      ${this.state.map(([x, y, color, shape]) => svg`
        <rect fill="rgb(44, 46, 53)" x=${x + stoneFactor} y=${y + stoneFactor} width=${1 - stoneFactor * 2} height=${1 - stoneFactor * 2} />
        ${shapeMap[shape](x, y, color)}
      `)}
    </svg>
  `}`)
  }

}

customElements.define('qwirkle-board', QwirkleBoard)