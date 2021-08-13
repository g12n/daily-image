import random from 'canvas-sketch-util/random';
import {pie} from 'd3-shape'

const {getUnits} = require('../lib/units.js');

export const pies = (context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    random.setSeed(seed)
    let TAU = 2* Math.PI;
    let {r, center, width, height} = getUnits(context); 
    
    palette = random.shuffle(palette)

    let bg = palette.pop();
    let circle = palette.pop();
    let inner = palette.pop(); 

    // draw bg
    context.fillStyle= bg;
    context.fillRect(0, 0,width, height )

    // draw outer circle 
    context.fillStyle= circle;
    context.beginPath();
    context.arc(center[0], center[1], r, 0,  TAU);
    context.fill()

    // draw inner circle 
    context.fillStyle= inner;
    context.beginPath();
    let ri = random.range(r*0.05, r * 0.15)
    context.arc(center[0], center[1], ri, 0,  TAU);
    context.fill()
    
    let data = palette.map(c => random.range(1,5))
    let angles = pie()(data)
    
    // draw wedges

    angles.map(({startAngle,endAngle},i)=>{
        context.fillStyle= palette[i];
        let radius = r * 0.9; 
        let radius2 = random.range(ri*1.5, radius * 0.95);
        context.beginPath();
        context.arc(center[0], center[1], radius, startAngle,  endAngle, false);
        context.arc(center[0], center[1], radius2, endAngle,  startAngle, true);
        context.fill()
    })
}

