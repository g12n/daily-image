import {XORShift64} from 'random-seedable';
import {radialPoints} from '../modules/radial-points.js'
import {drawRect } from '../modules/draw.js';
import {getUnits} from '../modules/getUnits.js'


export const juwel = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=100) =>{

    let random =  new XORShift64( seed );

    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15)
    let corners =palette.length+1;

    palette = random.shuffle([...palette])

    let polygon = radialPoints(center,inner.r,corners);

    let svg = svgTag;
    svg += `<title>juwel ${seed}</title>`
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`

    palette.map(color =>{
        polygon =  random.shuffle(polygon)
        let path = `M${polygon[0]}L${polygon[1]} ${polygon[2]} Z`

        svg += `<path d="${path}" fill="${color}"/>`
    })
    svg +="</svg>"
    return svg;s
}

