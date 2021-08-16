import {getUnits} from '../modules/getUnits.js'
import {XORShift64} from 'random-seedable';
import vec2 from "gl-vec2"
import {drawRect , drawCircle} from '../modules/draw.js';
import  svgpath from "svgpath";

import { intersectLineCircle } from '../modules/intersectLineCircle.js';

export function clipped(viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=0) {
    let random =  new XORShift64( seed );
    let {x,y,width, height,center,svgTag, inner, padding} = getUnits(viewBox, 0.15)

    palette = random.shuffle([...palette])
    let r = inner.r
    let svg= svgTag; 

    let o1 = random.randRange(-90, 90) / 100;
    let o2 = random.randRange(-90, 90) / 100;
    
    let p1 = [x-10, center[1] - r*o1]
   // p1= center
    let p2 = [x + width+10, center[1] - r*o2]

    let intersections = intersectLineCircle(p1,p2,center,inner.r)

    svg +=`<path d="${drawRect({x,y,width,height})}" fill="${palette[0]}"/>`
    //svg += `<circle cx="${center[0]}" cy="${center[1]}" r="${inner.r*1.05}"  fill="${palette[]}" />`
    
    svg +=`<path d="${drawCircle({r:inner.r*1.05, center})}" fill="${palette[4]}"/>`

    if (intersections.length >1){
       let [p1,p2] = intersections;
       
       let pc = vec2.lerp([],p2,p1,0.5)
       let dir= vec2.sub([],pc,center)
       vec2.normalize(dir,dir);
       
       
       let dot = vec2.mul([],dir,[r,r])
       vec2.add(dot, dot, center)
       vec2.lerp(dot,dot,pc,0.5)

       let dotR = vec2.dist(dot,pc) * 0.6;
       
       let path1, path2

       if(dir[1] < 0){
         path1 = `M${p1}A ${r} ${r} 0 0 0 ${p2}z`
         path2 = `M${p1}A ${r} ${r} 0 1 1 ${p2}z`
       } else{
        path2 = `M${p1}A ${r} ${r} 0 1 0 ${p2}z`
        path1 = `M${p1}A ${r} ${r} 0 0 1 ${p2}z`
       }
      
       path1 = svgpath(path1).rel().round(1);
       path2 = svgpath(path2).rel().round(1);
       
       svg += `<path d="${path1}"  fill="${palette[1]}" />`
       svg += `<path d="${path2}"  fill="${palette[2]}" />`
       svg +=`<path d="${drawCircle({r:dotR, center: dot})}" fill="${palette[3]}"/>`
    }
    svg += `<path d="M${p1}L${p2}" stroke-width="${r*0.05}" stroke="${palette[3]}" />`
    svg += "</svg>"
    return svg;
}