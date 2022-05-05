import { render, html } from 'ube';
import '/css/style.css'

import { QwirkleGameMutator } from './QwirkleGameMutator';

function draw() {
    render(document.body, html`
      <${QwirkleGameMutator} />
  `)
}

draw()
