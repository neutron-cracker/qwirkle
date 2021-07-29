class QwirkleTurns extends HTMLElement {

  public activeIndex = 0

  connectedCallback () {
    this.update()

    // this.addEventListener('click', () => {
    //   this.activeIndex++
    //   if (this.activeIndex === this.querySelectorAll('qwirkle-board').length) this.activeIndex = 0
    //   this.update()
    // })

    const styleTag = document.createElement('style')
    styleTag.innerHTML = `
      qwirkle-turns {
        position: relative;
        cursor: pointer;
      }

      qwirkle-turns qwirkle-board.hidden {
        position: absolute;
        top: 0;
        left: 0;
      }
    `
    this.appendChild(styleTag)

    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = '0'
    slider.max = (this.querySelectorAll('qwirkle-board').length - 1).toString()
    slider.addEventListener('change', (event) => {
      this.activeIndex = parseInt((event.target as HTMLInputElement).value)
      this.update()
    })
    this.appendChild(slider)
  }

  update () {
    for (const [index, child] of Array.from(this.querySelectorAll('qwirkle-board')).entries()) {
      child.classList[index === this.activeIndex ? 'remove' : 'add']('hidden')
    }
  }
}

customElements.define('qwirkle-turns', QwirkleTurns)