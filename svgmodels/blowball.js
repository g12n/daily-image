import {XORShift64} from 'random-seedable';
import {getUnits} from '../modules/getUnits.js'
import {drawRect , drawCircle} from '../modules/draw.js';
import  svgpath from "svgpath";

import { randOnSphere } from "../modules/randOnSphere.js";
import { mapRange } from '../modules/mapRange.js';

export let blowball = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{

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

let svg = svgTag;

svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
svg += `<style>.sparkles path{stroke-linecap:round; stroke-width:${parseInt(r/200)}}</style>`
svg +=`<g class="sparkles">`
dots.map((dot,i)=>{
    let z = dot[2];
    let d = [dot[0],dot[1]]
    let c = [center[0],center[1]]
    let opacity = parseInt(mapRange(z,-r,r,50,150,true))
    let hexOpacity = Number(opacity).toString(16).toUpperCase()
    
    let path = svgpath(`M${c}L${d}`).rel().round(1);

    svg += `<path d="${path}" stroke="${random.choice(colors)}${hexOpacity}"/>`
})
svg +=`</g>`;

svg +=`<g class="sparcs">`
dots.map((dot,i)=>{
    let z = dot[2]
    let opacity = parseInt(mapRange(z,-r,r,125,255,true))
    let radius = mapRange(z,-r,r,r/40,r/20,true)
    let hexOpacity = Number(opacity).toString(16).toUpperCase()
    let path = drawCircle({r:radius,center: dot})
    svg += `<path d="${path}" fill="${random.choice(colors)}${hexOpacity}"/>`
})
svg +=`</g>`;


svg += "</svg>"

return svg;    



}
