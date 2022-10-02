import {SVG, HTML, render, html, svg} from 'ube';
import { QwirkleBoard } from './QwirkleBoard'
import { State } from './State'

export class QwirkleGameViewer extends (SVG.SVG as typeof SVGSVGElement) {

  public activeIndex: number
  private state: State

  static get observedAttributes() { return ['index', 'l']; }

  upgradedCallback () {
    this.activeIndex = this.hasAttribute('index') ? parseInt(this.getAttribute('index')) : -1
    this.setAttribute('index', this.activeIndex.toString())
    this.classList.add('qwirkle-game-viewer')
    this.draw()
    this.setAttribute("transform", "scale(1 -1)")
  }

  get stoneSets() {return [this.state.initialStones, ...this.state.turns.map(turn => turn.stones)].filter(Boolean)}  

  draw () {
    const {smallestX, smallestY, horizontalStoneCount, verticalStoneCount} = this.state.getBoardSizeInformation()

    const hasActive = this.activeIndex !== -1 && this.activeIndex !== this.stoneSets.length

    this.classList.toggle('has-active', hasActive)

    this.setAttribute('viewBox', `${smallestX} ${smallestY} ${horizontalStoneCount} ${verticalStoneCount}`)
    this.setAttribute('style', `width: calc(var(--stoneWidth) * ${horizontalStoneCount})`)
    render(this, svg`
        ${this.stoneSets.map((stoneSet, index) => svg`
          <${QwirkleBoard} .stones=${stoneSet} 
          class=${`${index < this.activeIndex ? '' : (index === this.activeIndex ? 'active' : 'hidden')} qwirkle-board`}/>
        `)}
    `)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name = 'index' && oldValue !== newValue) {
        this.activeIndex = parseInt(newValue)
        if (this.activeIndex < -1) {
          this.activeIndex = -1
          this.setAttribute('index', this.activeIndex.toString())
        } 
        else if (this.activeIndex >= this.stoneSets.length) {
          this.activeIndex = this.stoneSets.length
          this.setAttribute('index', this.activeIndex.toString())
        }
        this.draw()
    }
  }
}