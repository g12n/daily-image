function splitSquaresWith(squares ,coordinates) {
  const { x, y } = coordinates;

  for (var i = squares.length - 1; i >= 0; i--) {
  const square = squares[i];

  if (x && x > square.x && x < square.x + square.width) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, x,squares); 
      }
  }

  if (y && y > square.y && y < square.y + square.height) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, y, squares); 
      }
  }
  }
}

function splitOnX(square, splitAt,squares) {
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

function splitOnY(square, splitAt, squares) {
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



const mondrian=(context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"]) =>{

    context.lineWidth = 12;
    var padding = 6; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    
    
    var step = vw / 8
    var white = '#F2F5F1';
    var colors = palette;
    
  var squares = [{
        x: padding,
        y: padding,
        width: vw,
        height: vh,
  }];

  for (var i = 0; i < vw; i += step) {
    splitSquaresWith(squares,{ y: i + padding});
    splitSquaresWith(squares,{ x: i + padding });
  }

  for (var i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  }
  for (var i = 0; i < squares.length; i++) {
    
    context.beginPath();
    context.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height
    );
    if(squares[i].color) {
      context.fillStyle = squares[i].color;
    } else {
      context.fillStyle = white
    }
    context.closePath()
    context.fill()
    context.stroke();
  }

}

exports.mondrian = mondrian;