fs = require('fs');

const random = require('canvas-sketch-util/random');

// set Up Canvas
const size =800;
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(size, size)
const context = canvas.getContext('2d')

const {mondrian} = require("./models/mondiran.js")
const {circles} = require("./models/circles.js")
const {juwel} = require("./models/juwel.js")

// date

let today = new Date("2020-9-15");

let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

random.setSeed(name)

let palettes = [
  ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"],
  ["#e63946","#f1faee","#a8dadc","#457b9d","#1d3557"],
  ["#112233","#14213d","#fca311","#e5e5e5","#ffffff"],
  ["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"]
];


let palette = random.pick(palettes);

random.setSeed(name)
let modelNumber = random.rangeFloor(0,3)
//modelNumber = 0;

switch (modelNumber) {
  case 0:
    juwel(context,palette, name);
      break;
  case 1:
    mondrian(context, palette, name)
    break;
  case 2:
    circles(context,palette, name);
    break;

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
<style>
body{margin: 0; padding: 10vmin;}
img{width: 80vmin; height: 80vmin; margin: 0 auto; display: block;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 8px 8px rgba(0,0,0,0.11), 
              0 16px 16px rgba(0,0,0,0.11), 
              0 32px 32px rgba(0,0,0,0.11);
}
</style>
<title>${name}</title>
</head>
<body>
<img src="${name}.jpeg" alt="daily-image" />
</body>
</html>`


fs.writeFile('_site/index.html',code, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
  });