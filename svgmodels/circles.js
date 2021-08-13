import {XORShift64} from 'random-seedable';
import { drawArc,drawRect } from '../modules/draw.js';

export let circles = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    let random =  new XORShift64( seed );
    let [x,y,width, height] = viewBox.split(" ").map(v =>Number(v))
    var padding = width*0.1; 
    let vw = width -2*padding;
    let vh = height -2*padding;
    let r = vw/2;
    let center = [width/2 + x, height/2 + y] 
    
    palette = random.shuffle(palette)

    let svg = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`

    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`

    palette.map(color =>{
        let settings = {
            center,
            radius : random.randRange(r/10 , r ),
            ratio : random.float(),
            start:  random.float(),
            sweep : random.float()
        }
        svg += `<path d="${drawArc(settings)}" fill="${color}"/>`
    })
    svg +="</svg>"
    return svg


}