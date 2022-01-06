import {XORShift64} from 'random-seedable';
import {getUnits} from '../modules/getUnits.js'
import {drawPolygonSmooth,drawPolygon,drawRect} from '../modules/draw.js'
import {mapRange} from "../modules/mapRange.js"

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



export let fluxim = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    let random =  new XORShift64( seed );
    const simplex = new SimplexNoise(seed);

    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15);
    
    let max = Math.max(width,height)

    let linecount = random.randRange(60,180);
    let lenght = 1;
    let frequency = 3;


    let svg = svgTag;
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
    for (let s=0; s < linecount; s++){
        let inputPoints = []

        let ypos = random.randRange(y,y+height)
        let xpos = mapRange(s, 0,linecount,x,x+width)
        let point = [xpos,ypos]

        let direction = [0, 0]
        let norm = vec2.normalize([],[0,1]);

        let velocity = height/1000;

        //vec2.rotate(direction, direction, random.randRange(0,2*Math.PI) )
    
        for (let i = 0; i<= (velocity * (1000*lenght)); i++){
          let [px,py] = point;
          let nx =  mapRange(px, x, x+max,0,frequency,false);
          let ny =  mapRange(py, y, y+max,0,frequency,false);

          let n = simplex.noise3D(nx, ny,0.11)

          let pressure = mapRange(n,-1,1,0,1,true); 
         
          if(withinBound(point, inner)){
            inputPoints.push([...point, pressure]);
          }


         

          direction = vec2.rotate(direction, norm, mapRange(n,-1,1,-Math.PI/3,Math.PI/3,true))
          let vector = vec2.mul([],direction, [velocity,velocity]);
          point = vec2.add([],point,vector)
          
        }

        const outlinePoints = getStroke(inputPoints, {
            size: width/linecount,
            thinning: 0.9,
            smoothing: 0.4,
            streamline: 0.5,
            simulatePressure: false,
            last: true,
            start: {
              cap: true,
              taper: 0
            },
            end: {
              cap: true,
              taper: 0
            },
        })
    
        let path = drawPolygonSmooth(outlinePoints,10)
       // path = svgpath(path).rel().round(0).toString();
        svg += `<path d="${path}"  fill="${random.choice(palette)}" />`


    }






    svg += `</svg>`

    return svg
}