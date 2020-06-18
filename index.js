fs = require('fs');

// set Up Canvas
const size =800;
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(size, size)
const context = canvas.getContext('2d')

// date

let today = new Date();

let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`


context.lineWidth = 8;
var step = size / 7;
var white = '#F2F5F1';
var colors = ['#D40920', '#1356A2', '#F7D842']

var squares = [{
    x: 0,
    y: 0,
    width: size,
    height: size
  }];

function splitSquaresWith(coordinates) {
  const { x, y } = coordinates;

  for (var i = squares.length - 1; i >= 0; i--) {
  const square = squares[i];

  if (x && x > square.x && x < square.x + square.width) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, x); 
      }
  }

  if (y && y > square.y && y < square.y + square.height) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, y); 
      }
  }
  }
}

function splitOnX(square, splitAt) {
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

function splitOnY(square, splitAt) {
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

for (var i = 0; i < size; i += step) {
  splitSquaresWith({ y: i });
  splitSquaresWith({ x: i });
}

function draw() {
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
    context.fill()
    context.stroke();
  }
}

draw()
//context.font = '30px Impact'
//context.fillStyle="#445555"
//context.fillText(`g12n ${name}`, 40, 40)

// Create folder if it doesnt exist
var dir = './_site';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Write JPEg

const out = fs.createWriteStream(__dirname + `/_site/${name}.jpeg`)
const stream = canvas.createJPEGStream({
    quality: 0.75,
    chromaSubsampling: false
  })
stream.pipe(out)
out.on('finish', () =>  console.log('The JPEG file was created.'))



// Create HTML 

let code = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}</title>
</head>
<body>
<img src="${name}.jpeg" alt="daily-image" />
</body>
</html>`


fs.writeFile('_site/index.html',code, function (err) {
    if (err) return console.log(err);
    console.log(`${today} > _site/index.html`);
  });