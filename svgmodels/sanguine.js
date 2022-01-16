import {random, XORShift64} from 'random-seedable';
import {getUnits} from '../modules/getUnits.js'
import {drawPolygonSmooth,drawPolygon,drawRect} from '../modules/draw.js'
import { chakin } from '../modules/smooth.js';
import PoissonDiskSampling from "poisson-disk-sampling"

import vec3 from "gl-vec3"



import {polygonHull} from "d3-polygon"


import vec2 from "gl-vec2";

import SimplexNoise from 'simplex-noise';
import  svgpath from "svgpath";


import pkg from 'perfect-freehand';
const { getStroke } = pkg;



let withinBound = (point, bound) =>{
  let [px,py] = point;
  let {x,y,width,height} = bound;
  let x2 = x + width;
  let y2 = y + height;
  return px >= x && px <= x2 && py >= y && py<= y2;
}

let rng = ()=>{
  return random.float()
}



export let sanguine = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    let random =  new XORShift64( seed );
    const simplex = new SimplexNoise(seed);

    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.25);
    let min = Math.min(width,height)    

    let svg = svgTag;
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`

    let diskrandom =  new XORShift64( seed );
let rng = ()=>{
  return diskrandom.float()
}
    var p = new PoissonDiskSampling({
      shape: [inner.width, inner.height],
      minDistance: min * 0.45,
      maxDistance: min * 0.5,
      tries: 20
  }, rng );
 
 
 
  var centers = p.fill();
   



  centers.map(center =>{


      let points = [];


      let c = vec3.add([],center,[inner.x,inner.y]);
      

      for (let i= 0; i<= 7; i++ ){
        let px = random.randRange(-min/3,min/3);
        let py = random.randRange(-min/3,min/3,-min/3,min/3)
        points.push([c[0]+px,c[1]+py])
      }


      let polygon = polygonHull(points)


      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)

      //console.log(points, polygon)
  
      polygon.push(polygon[0])
      let path = drawPolygonSmooth(polygon,10)
      path = svgpath(path).rel().round(0).toString();
      svg += `<path d="${path}"  fill="${random.choice(palette)}" />`
  })

    svg += `</svg>`

    return svg
}