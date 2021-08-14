import fs from 'fs';
import  sharp from 'sharp'
import {XORShift64} from 'random-seedable';


import {getRandomPalette} from './modules/palettes.js'

import {brilliant} from "./svgmodels/brilliant.js"
import {circles} from "./svgmodels/circles.js"
import {pies} from "./svgmodels/pies.js"
import {juwel} from "./svgmodels/juwel.js"
import {mondrian} from "./svgmodels/mondrian.js"
let models = [brilliant,pies,circles,juwel,mondrian]

let today = new Date();
let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
let ms = 1000* 60 * 60 * 24;
let seed = Math.floor(today.getTime() / ms) 

const random = new XORShift64(seed);

let viewBox = "0 0 1000 1000"
let palette = getRandomPalette(seed)


let svgs = []

models.map(model =>{
  svgs.push({
    name: `${model.name}-${seed}`,
    code: model(viewBox,[...palette],seed)
  })
})

// Save SVG Files
svgs.map(svg =>{
  fs.writeFile(`_site/${svg.name}.svg`,svg.code, function (err) {
      if (err) return console.log(err);
  });
})

let svg = random.choice(svgs).code;
var buffer = Buffer.from(svg);

sharp(buffer)
  .webp({quality:90})
  .toFile(`_site/${name}.webp`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

  sharp(buffer)
  .avif()
  .toFile(`_site/${name}.avif`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

  sharp(buffer)
  .jpeg()
  .toFile(`_site/${name}.jpg`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

// Create HTML 

let code = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{margin: 0; 
  padding: 10vmin;
  --min: 40ch;
  --gap: 1rem;
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  font-family: sans-serif
}

img{width: 100%; height: auto; margin: 0 auto;
  vertical-align: bottom;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 8px 8px rgba(0,0,0,0.11), 
              0 16px 16px rgba(0,0,0,0.11), 
              0 32px 32px rgba(0,0,0,0.11);
}
figcaption{padding: 0.5em; text-align: center }
</style>
<title>Daily Image ${seed} by G12Nss</title>
</head>
<body>

`

svgs.map(svg =>{
   code += `<figure><img width=1000 height=1000 src="${svg.name}.svg"/><figcaption>${svg.name}-${seed}</figcaption></figure>`
})

code += `</body></html>`


fs.writeFile('_site/index.html',code, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
});




fs.writeFile(`_site/${name}.svg`,svg, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
});