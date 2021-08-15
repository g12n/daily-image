import {XORShift64} from 'random-seedable';
import {drawRect } from '../modules/draw.js';
import {getUnits} from '../modules/getUnits.js'

import  svgpath from "svgpath";
import vec2 from "gl-vec2"


export const drawWedge = (settings) =>{

    let {
        center = [0,0],
        radius = 100,
        ratio = 0,
        start= 0,
        sweep = 1
    } = settings;

    let startAngle = start * Math.PI * 2;
    let endAngle = startAngle + sweep * Math.PI * 2;
    let outerRadius = radius;
    let innerRadius = radius * ratio;

    let p1 = vec2.rotate([],[outerRadius,0],startAngle);
    let p2 = vec2.rotate([],[outerRadius,0],endAngle);
    let p3 = vec2.rotate([],[innerRadius,0],endAngle);
    let p4 = vec2.rotate([],[innerRadius,0],startAngle);
    
    let path = `M${p1}L${p2}L${p3}L${p4}z`
    path = svgpath(path).rel().translate(center[0],center[1]).round(1);
   
    return path

}


export let odyssey = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    
    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0)
    let svg = svgTag;
    let random =  new XORShift64( seed );
    svg += `<title>${seed}</title>`

    palette = random.shuffle([...palette])

    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
    
    palette.map(color =>{
        let settings = {
            center,
            radius : random.randRange(0.1 , 1 ) * inner.r,
            ratio : random.float(),
            start:  random.float(),
            sweep : random.float()
        }
        svg += `<path d="${drawWedge(settings)}" fill="${color}"/>`
    })
    svg +="</svg>"
    return svg
}