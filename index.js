import fs from 'fs';
import  sharp from 'sharp'
import {XORShift64} from 'random-seedable';


import {getRandomPalette} from './modules/palettes.js'

import {brilliant} from "./svgmodels/brilliant.js"

//
let today = new Date();
let name =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
let seed = today.getFullYear() * today.getMonth()+4 * today.getDate();

const random = new XORShift64(seed);

let viewBox = "-255 -250 500 500"
let palette = getRandomPalette(seed)

let svg = brilliant(viewBox, palette, seed)

var buffer = Buffer.from(svg);

sharp(buffer)
  .webp({quality:90})
  .toFile(`_site/${name}.webp`)
  .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

  sharp(buffer)
  .avif()
  .toFile(`_site/${name}.avif`)
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
<title>${name} by G12Nss</title>
</head>
<body>
${svg}
</body>
</html>`


fs.writeFile('_site/index.html',code, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
});


fs.writeFile(`_site/${name}.svg`,svg, function (err) {
    if (err) return console.log(err);
   // console.log(`${today} > _site/index.html`);
});