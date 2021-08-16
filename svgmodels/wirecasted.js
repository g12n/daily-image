import {lerpFrames} from '../modules/lerp.js';
import {XORShift64} from 'random-seedable';
import  {drawPolygon} from '../modules/draw-polygon.js';
import {radialPoints} from '../modules/radialPoints.js';
import {getUnits} from '../modules/getUnits.js'


export const  wirecasted = (viewBox="-250 -250 500 500", palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=2) =>{

    let random =  new XORShift64( seed )

    let {x,y,width, height,inner,center} = getUnits(viewBox, 0.1);

    
    let corners = random.randRange(3,7);
    var padding = width*0.1; 
    let vw = width -2*padding;
    
    let radius = inner.r;
    let lineWidth = radius/20;
    

    let svg = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`
    svg +=`<path d="M${x},${y}H${width}V${height}H${-width}Z" fill="#000"/>`
    svg +=`<style>path{stroke-width:${lineWidth}; stroke-linejoin:round}</style>`
    let polygon = radialPoints(center,radius,corners);
    palette = random.shuffle([...palette])
    palette.map((color) => {
        let points = [1,2,3].map(p => lerpFrames(polygon,random.float()))
        svg +=`<path d="${drawPolygon(points)}Z" fill="none" stroke="${color}"/>`
    })
    svg +="</svg>"
    return svg
}