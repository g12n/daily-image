import {XORShift64} from 'random-seedable';
import { drawArc,drawRect } from '../modules/draw.js';
import {getUnits} from '../modules/getUnits.js'

export let circles = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    
    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15)
    let svg = svgTag;
    
    let random =  new XORShift64( seed );
    svg += `<title>${seed}-${random.int()}</title>`

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
        svg += `<path d="${drawArc(settings)}" fill="${color}"/>`
    })
    svg +="</svg>"
    return svg
}