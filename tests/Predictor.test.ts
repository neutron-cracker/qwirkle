import {  Predictor } from '../source/Predictor'
import { State } from '../source/State';
import { ColorShape, Colors, Shapes, Coordinate } from '../source/Types';
import { referenceState1, referenceState2 } from './stateReferences';
import { sortCoordinates } from '../source/helpers'

const testState = new State()
testState.setInitial(referenceState1)
const predictor = new Predictor(testState);

test('predictor returns the best turn', () => {
  // const bestTurn = predictor.getBestPossibleTurns([
  //   [Colors.Red, Shapes.Circle],
  //   // [Colors.Red, Shapes.Circle],
  //   // [Colors.Green, Shapes.Circle],
  //   // [Colors.Purple, Shapes.Circle],
  //   // [Colors.Blue, Shapes.Square],
  //   // [Colors.Blue, Shapes.Diamond],
  // ])
  




})
// test('getBorderCoordinates returns the correct border coordinates', () => {
//     const testState = new State(referenceState2);
//     const predictor = new Predictor(testState);   
//     const border = predictor.getBorderCoordinates(testState.stones).sort(sortCoordinates)

//     const expectedBorder: Array<Coordinate> = [
//         <Coordinate> [1,0],
//         <Coordinate> [-1,0],
//         <Coordinate> [-1,1],
//         <Coordinate> [1,1],
//         <Coordinate> [0,-1],
//         <Coordinate> [0,2],
        
//     ].sort(sortCoordinates)
    
//     expect(border).toEqual(expectedBorder)
// })