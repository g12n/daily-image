import {XORShift64} from 'random-seedable';
import {drawRect } from '../modules/draw.js';
import {getUnits} from '../modules/getUnits.js'

let random

 function splitOnX(square, splitAt, squares) {
  // Create two new squares, based on
  // splitting the given one at the
  // x coordinate given
  
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height
  };

  var squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height
  };

  squares.push(squareA);
  squares.push(squareB);
}

export function splitOnY(square, splitAt, squares) {
  // Create two new squares, based on
  // splitting the given one at the
  // x coordinate given
  
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y)
  };

  var squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y
  };

  squares.push(squareA);
  squares.push(squareB);
}



 function splitSquaresWith(squares, coordinates) {
   
  // Loops through the squares, and find if
  // one should be split

  const { x, y } = coordinates;
  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      if (random.bool()) {
        squares.splice(i, 1);
        splitOnX(square, x, squares);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (random.bool()) {
        squares.splice(i, 1);
        splitOnY(square, y, squares);
      }
    }
  }
}



export const mondrian=(viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=0) =>{

    random =  new XORShift64( seed );
  
    let {x,y,width,height,center,svgTag, inner, padding} = getUnits(viewBox, 0.0125)

    let svg = svgTag;
    
    svg += `<style>.monpath{stroke-width: ${padding*1.5}; stroke: #000}</style>`
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`


    var step = inner.max / 12
    //console.log(padding)

    var white = '#F2F5F1';
    var colors = palette;
    
    var squares = [inner];

    for (var i = 0; i < inner.max; i += step) {
        splitSquaresWith(squares,{ y: y + i + padding});
        splitSquaresWith(squares,{ x: x + i + padding });
    }

    
    
    for (var i = 0; i < colors.length; i++) {
        squares[Math.floor(random.float() * squares.length)].color = colors[i];
    }
    
    for (var i = 0; i < squares.length; i++) {
        let    color = squares[i].color || white;
        svg +=`<path d="${drawRect(squares[i])}" class="monpath" fill="${color}"/>`
    }

    svg +="</svg>"
    return svg
}