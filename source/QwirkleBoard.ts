import { svg, reder } from 'uhtml'

export class QwirkleBoard extends HTMLElement {

  private state: Array<any> 

  connectedCallback () {
    this.state = JSON.parse(this.getAttribute('state'))

    console.log(this.state)
  }

}

customElements.define('qwirkle-board', QwirkleBoard)