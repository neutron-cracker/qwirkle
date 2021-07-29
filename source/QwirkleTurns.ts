import {define, render, html, svg, css} from 'uce';

define('qwirkle-turns', {
  init () {
    console.log(this.state)
  },
})

// class QwirkleTurns extends HTMLElement {

//   public activeIndex = 0

//   connectedCallback () {
//     this.update()

//     const styleTag = document.createElement('style')
//     styleTag.innerHTML = `
//       qwirkle-turns {
//         position: relative;
//         cursor: pointer;
//       }

//       qwirkle-turns qwirkle-board.hidden {
//         position: absolute;
//         top: 0;
//         left: 0;
//       }
//     `
//     this.appendChild(styleTag)
//   }

//   update () {
//     for (const [index, child] of Array.from(this.querySelectorAll('qwirkle-board')).entries()) {
//       child.classList[index === this.activeIndex ? 'remove' : 'add']('hidden')
//     }
//   }

//   static get observedAttributes() { return ['index', 'l']; }

//   attributeChangedCallback(name, oldValue, newValue) {
//     if(name = 'index') {
//         this.activeIndex = parseInt(newValue)
//         this.update();      
//     }
//   }
// }

// customElements.define('qwirkle-turns', QwirkleTurns)