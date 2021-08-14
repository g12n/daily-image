import {XORShift64} from 'random-seedable';
import vec3 from "gl-vec3"
import {getUnits} from '../modules/getUnits.js'
import {drawRect } from '../modules/draw.js';
import  svgpath from "svgpath";

function randOnSphere (radius = 1, random = new XORShift64){
    let  out = [];
    var u = random.float() * Math.PI * 2;
    var v = random.float() * 2 - 1;
    var phi = u;
    var theta = Math.acos(v);
    out[0] = radius * Math.sin(theta) * Math.cos(phi);
    out[1] = radius * Math.sin(theta) * Math.sin(phi);
    out[2] = radius * Math.cos(theta);
    return out;
}


function mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp=true) {
    if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
      return outputMin;
    } else {
      var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
      if (clamp) {
        if (outputMax < outputMin) {
          if (outVal < outputMax) outVal = outputMax;
          else if (outVal > outputMin) outVal = outputMin;
        } else {
          if (outVal > outputMax) outVal = outputMax;
          else if (outVal < outputMin) outVal = outputMin;
        }
      }
      return outVal;
    }
  }
  


export let sparkles = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{

let random =  new XORShift64( seed );
let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15)


let cx=center[0]
let cy=center[1]
let r=inner.r

let colors = [...palette]	

center = [cx,cy,0];
let dots = [];

for (let i=0; i<=180; i++){
    let [x,y,z] = randOnSphere(r, random);
    dots.push([x+cx,y+cy,z])
}

// sort dots by Z-Position

dots.sort((a, b) => a[2] - b[2] );

let paths = [];
let offset = random.randRange(0.5, 1)

dots.map(point =>{
    let start = vec3.lerp([],center, point, offset);
    let path = `M${start[0]},${start[1]}L${point[0]},${point[1]}`

    path = svgpath(path).rel().round(0).toString();

    paths.push(path)
})


let svg = svgTag;

svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
svg += `<style>.sparkles path{stroke-linecap:round}</style>`
svg +=`<g class="sparkles">`
paths.map((path,i)=>{
    let z = dots[i][2];
    let opacity = parseInt(mapRange(z,-r,r,0,255,true))
    let strokeWidth = mapRange(z,-r,r,1,10,true)
    let hexOpacity = Number(opacity).toString(16).toUpperCase()
    svg += `<path d="${path}" stroke-width="${strokeWidth.toFixed(1)}" stroke="${random.choice(colors)}${hexOpacity}"/>`
})
svg +=`</g>`;
svg += "</svg>"

return svg;    



}
