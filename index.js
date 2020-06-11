fs = require('fs');

// set Up Canvas
const size =800;
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(size, size)
const context = canvas.getContext('2d')

// date

let today = new Date();

let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`




// Draw on Canvas
context.lineWidth = 10;
context.lineCap = 'round';
var step = size/10;

var aThirdOfHeight = size/3;
context.fillStyle="#000"
context.strokeStyle="#fff"
context.fillRect(0,0,size,size)

function draw(x, y, width, height, positions) {
  context.save();
  context.translate(x + width/2, y + height/2);
  context.rotate(Math.random() * 5);
  context.translate(-width/2, -height/2);
  
  for(var i = 0; i <= positions.length; i++) {
    context.beginPath();
    context.moveTo(positions[i] * width, 0);
    context.lineTo(positions[i] * width, height);
    context.stroke();
  }

  context.restore();
}
  
for(var y = step; y < size - step; y += step) {
  for(var x = step; x < size - step; x+= step) {
    if(y < aThirdOfHeight) {
      draw(x, y, step, step, [0.5]);   
    } else if(y < aThirdOfHeight * 2) {
      draw(x, y, step, step, [0.2, 0.8]);      
    } else {
      draw(x, y, step, step, [0.1, 0.5, 0.9]);      
    }
  }
}


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