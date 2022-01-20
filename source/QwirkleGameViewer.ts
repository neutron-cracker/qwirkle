import {SVG, HTML, render, html, svg} from 'ube';
import { QwirkleBoard } from './QwirkleBoard'
import { State } from './State'

export class QwirkleGameViewer extends (SVG.SVG as typeof SVGSVGElement) {

  public activeIndex: number
  private state: State
  private smallestX: number
  private smallestY: number
  private largestX: number
  private largestY: number
  private horizontalStoneCount: number
  private verticalStoneCount: number

  static get observedAttributes() { return ['index', 'l']; }

  upgradedCallback () {
    this.activeIndex = 0
    this.classList.add('qwirkle-game-viewer')
    this.update()
    this.draw()
  }

  draw () {
    this.smallestX = 0
    this.smallestY = 0
    this.largestX = 0
    this.largestY = 0
    this.horizontalStoneCount = 0
    this.verticalStoneCount = 0

    for (const { x, y } of this.state.stones) {
      if (x < this.smallestX) this.smallestX = x
      if (x > this.largestX) this.largestX = x
      if (y < this.smallestY) this.smallestY = y
      if (y > this.largestY) this.largestY = y
    }
    this.horizontalStoneCount = this.largestX - this.smallestX + 1
    this.verticalStoneCount = this.largestY - this.smallestY + 1

    // this.viewBox = `width: calc(var(--stoneWidth) * ${this.horizontalStoneCount})`
    // this.attributes.setAttribute(`viewbox`, `${this.smallestX} ${this.smallestY} ${this.horizontalStoneCount} ${this.verticalStoneCount}`)
    const viewbox = document.createAttributeNS("http://www.w3.org/2000/svg", 'viewbox')
    viewbox.nodeValue = `${this.smallestX} ${this.smallestY} ${this.horizontalStoneCount} ${this.verticalStoneCount}`
    this.attributes.setNamedItemNS(viewbox)

    render(this, svg`
        ${this.state.turns.map(turn => html`
          <${QwirkleBoard} .stones=${turn.stones} />
        `)}
    `)
  }

  update () {
    for (const [index, child] of Array.from(this.querySelectorAll('qwirkle-board')).entries()) {
      child.classList[index === this.activeIndex ? 'remove' : 'add']('hidden')
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name = 'index') {
        this.activeIndex = parseInt(newValue)
        this.update()      
    }
  }

}