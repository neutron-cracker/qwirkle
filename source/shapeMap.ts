import {svg} from 'ube';

const colorMap = {
  'p': 'rgb(135, 41, 150)',
  'r': 'rgb(255, 46, 23)',
  'b': 'rgb(0, 144, 211)',
  'y': 'rgb(255, 217, 57)',
  'g': 'rgb(136, 201, 70)',
  'o': 'rgb(255, 144, 39)',
}

const factor = .7
const circleFactor = .65
const rectFactor = .63
const flowerFactor = .33
const innerQuadrogramFactor = .4
const outerQuadrogramFactor = .1
const diamondFactor = .15

export const shapeMap = {
  1: (x, y, color) => svg`<rect fill=${colorMap[color]} x=${x + 0.5 - rectFactor / 2} y=${y + 0.5 - rectFactor / 2} width=${rectFactor} height=${rectFactor} />`,
  2: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${circleFactor / 1.9} cx=${x + .5} cy=${y + .5} />`,
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