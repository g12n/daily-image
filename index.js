fs = require('fs');
const sharp = require('sharp');

const random = require('canvas-sketch-util/random');

// set Up Canvas
const size =800;
const viewBox = "-400 -400 800 800"
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(size, size)
const context = canvas.getContext('2d')

const {mondrian} = require("./models/mondiran.js")
const {circles} = require("./models/circles.js")
const {pies} = require("./models/pies.js")
const {juwel} = require("./models/juwel.js")
const {brilliant} = require("./models/brilliant.js")

const {brilliantSVG} = require("./svgmodels/brilliant.js")

// date

let today = new Date();

let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
let seed = name;

//seed = name
random.setSeed(seed)

let palettes = [
  ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"],
  ["#e63946","#f1faee","#a8dadc","#457b9d","#1d3557"],
  ["#112233","#14213d","#fca311","#e5e5e5","#ffffff"],
  ["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"],
  ["#6E819E","#FFFFFF","#F6C8AC","#EFF7F5","#2C4D5D","#EF8F88"],
  [ "#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"]
];

let palette = random.pick(palettes);
random.setSeed(seed)

let modelNumber = random.rangeFloor(0,5)
//modelNumber = 1;

switch (modelNumber) {
  case 0:
    juwel(context,palette, seed);
      break;
  case 1:
    mondrian(context, palette, seed)
    break;
  case 2:
    circles(context,palette, seed);
    break;
  case 3:
    brilliant(context,palette, seed);
    break;
  case 4:
    pies(context,palette, seed);
    break;
}

// Create folder if it doesnt exist

var dir = './_site';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Write JPEg

let canvasBuffer = canvas.toBuffer()

let s = sharp(canvasBuffer);

  s.jpeg({quality:90})
  .toFile(`_site/${name}.jpeg`)
  .then(info => { console.log("jpeg:", info.size) })
  .catch(err => {  console.log(err) });


// File from SVG

let svg =  brilliantSVG(viewBox, palette,seed)
var buffer = Buffer.from(svg);

sharp(buffer)
  .webp({quality:90})
  .toFile('_site/test.webp')
  .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

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
<title>${name} by G12N</title>
</head>
<body>
<img src="${name}.jpeg" alt="daily-image" />
</body>
</html>`


fs.writeFile('_site/index.html',code, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
});