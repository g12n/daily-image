import {XORShift64} from 'random-seedable';
import {getUnits} from '../modules/getUnits.js'
import {drawPolygon,drawRect} from '../modules/draw.js'
import vec2 from "gl-vec2";

import  svgpath from "svgpath";


import pkg from 'perfect-freehand';
const { getStroke } = pkg;


export let tenthousand = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    let random =  new XORShift64( seed );
    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15)
    let svg = svgTag;
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
    for (let s=0; s <= 60; s++){

        let inputPoints = []
        let point = [...center]

        let direction = [1, 1]

        let velocity = 5;

        vec2.rotate(direction, direction, random.randRange(0,2*Math.PI) )
    
        for (let i = 0; i<= 100; i++){
            inputPoints.push([...point]);
            vec2.rotate(direction, direction, random.randRange(-15,15) * 0.02)
            velocity = velocity * random.randRange(0.8,1.2);
            let vector = vec2.mul([],direction,[velocity,velocity]);
            point = vec2.add([],point,vector)
        }
        const outlinePoints = getStroke(inputPoints, {
            size: 20,
            thinning: 0.9,
            smoothing: 0.5,
            streamline: 1,
            easing: (t) => t,
            simulatePressure: true,
            last: true,
            start: {
              cap: true,
              taper: 0,
              easing: (t) => t,
            },
            end: {
              cap: false,
              taper: 20,
              easing: (t) => t,
            },
        })
    
        let path = drawPolygon(outlinePoints)
        path = svgpath(path).rel().round(0).toString();
        svg += `<path d="${path}"  fill="${random.choice(palette)}" />`


    }






    svg += `</svg>`

    return svg
}