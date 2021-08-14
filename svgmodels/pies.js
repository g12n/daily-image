import {XORShift64} from 'random-seedable';
import { drawArc, drawRect } from '../modules/draw.js';
import {getUnits} from '../modules/getUnits.js'

export let pies = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    
    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.15)
    let svg = svgTag;

    let random =  new XORShift64( seed );
    svg += `<title>${seed}-${random.int()}</title>`
    palette = random.shuffle([...palette])

    let bg = palette.pop();
    let circle = palette.pop();
    let innerCircle = palette.pop(); 

    let r = inner.r;

    let ri = random.randRange(0.1,0.15) *r ;

    svg +=`<path d="${drawRect({x,y,width,height})}" fill="${bg}"/>`
    svg += `<path d="${drawArc({center,radius:r})}" fill="${circle}"/>`
    
    let data = palette.map(c => random.randRange(1,5))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let sum = data.reduce(reducer);
    
    let start = 0;
    palette.map((color,i) =>{
        let sweep = data[i]/sum;

        let radius = r * 0.9; 
        let  ratio = random.randRange(0.12,0.95) ;

        let settings = {
            center,
            radius, 
            ratio,
            start, 
            sweep
        }
        svg += `<path d="${drawArc(settings)}" fill="${color}"/>`
        start+= sweep;
    })

    svg += `<path d="${drawArc({center,radius: ri})}" fill="${innerCircle}"/>`

    svg +="</svg>"
    return svg
}