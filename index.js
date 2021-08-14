import fs from 'fs';
import  sharp from 'sharp'
import {XORShift64} from 'random-seedable';

import {getRandomPalette} from './modules/palettes.js'
import {generateHtml} from './modules/generate-html.js'

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

// Create folder if needed
var dir = './_site';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Save SVG Files

svgs.map(svg =>{
  fs.writeFile(`${dir}/${svg.name}.svg`,svg.code, function (err) {
      if (err) return console.log(err);
  });
})

// Create HTML 

fs.writeFile(`${dir}/index.html`,generateHtml(svgs,today), function (err) {
  if (err) return console.log(err);
 // console.log(`${today} > _site/index.html`);
});

let svg = random.choice(svgs).code;
var buffer = Buffer.from(svg);

sharp(buffer)
  .webp({quality:90})
  .toFile(`${dir}/${name}.webp`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

  sharp(buffer)
  .avif()
  .toFile(`${dir}/${name}.avif`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });

  sharp(buffer)
  .jpeg()
  .toFile(`${dir}/${name}.jpg`)
 // .then(info => { console.log(info) })
  .catch(err => {  console.log(err) });