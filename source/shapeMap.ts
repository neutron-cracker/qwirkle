import {svg} from 'ube';
import { Shapes, Colors } from './Types';

const colorMap = {
  [Colors.Purple]: 'rgb(135, 41, 150)',
  [Colors.Red]: 'rgb(255, 46, 23)',
  [Colors.Blue]: 'rgb(0, 144, 211)',
  [Colors.Yellow]: 'rgb(255, 217, 57)',
  [Colors.Green]: 'rgb(136, 201, 70)',
  [Colors.Orange]: 'rgb(255, 144, 39)',
}

const factor = .7
const circleFactor = .65
const rectFactor = .63
const flowerFactor = .33
const innerQuadrogramFactor = .4
const outerQuadrogramFactor = .1
const diamondFactor = .15

export const shapeMap = {
  [Shapes.Square]: (x, y, color) => svg`<rect fill=${colorMap[color]} x=${x + 0.5 - rectFactor / 2} y=${y + 0.5 - rectFactor / 2} width=${rectFactor} height=${rectFactor} />`,
  [Shapes.Circle]: (x, y, color) => svg`<circle fill=${colorMap[color]} r=${circleFactor / 1.9} cx=${x + .5} cy=${y + .5} />`,
  [Shapes.Flower]: (x, y, color) => svg`
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + 1 -flowerFactor} cy=${y + .5} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + flowerFactor} cy=${y + .5} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + .5} cy=${y + 1 -flowerFactor} />
    <circle fill=${colorMap[color]} r=${factor / 4} cx=${x + .5} cy=${y + flowerFactor} />`,
  [Shapes.Quadrogram]: (x, y, color, rotate = false) => svg`<polygon fill=${colorMap[color]} points=${`
    ${x + .5},${y + outerQuadrogramFactor} 
    ${x + 1 - innerQuadrogramFactor},${y + innerQuadrogramFactor} 
    ${x + 1 - outerQuadrogramFactor},${y + .5} 
    ${x + 1 - innerQuadrogramFactor},${y + 1 - innerQuadrogramFactor} 
    ${x + .5},${y + 1 - outerQuadrogramFactor} 
    ${x + innerQuadrogramFactor},${y + 1 - innerQuadrogramFactor} 
    ${x + outerQuadrogramFactor},${y + .5}
    ${x + innerQuadrogramFactor},${y + innerQuadrogramFactor} 
  `} transform=${rotate ? `rotate(45 ${x + .5} ${y + .5})`: null} />`,
  [Shapes.Diamond]: (x, y, color) => svg`<polygon fill=${colorMap[color]} points=${`
    ${x + .5},${y + 1 - diamondFactor} 
    ${x + diamondFactor},${y + .5} 
    ${x + .5},${y + diamondFactor} 
    ${x + 1 - diamondFactor},${y + .5}
  `} />`,
  [Shapes.Octogram]: (x, y, color) => svg`${shapeMap[Shapes.Quadrogram](x, y, color)}${shapeMap[Shapes.Quadrogram](x, y, color, true)}`,
}