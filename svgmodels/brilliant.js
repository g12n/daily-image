const random = require('canvas-sketch-util/random');
const {lerpFrames} = require('canvas-sketch-util/math');
const {drawPolygon} = require('../lib/draw-polygon')
const {radialPoints} = require('../lib/radial-points')

const brilliant = (viewBox="-250 -250 500 500", palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=100) =>{
    random.setSeed(seed)

    let [x,y,width, height] = viewBox.split(" ").map(v =>Number(v))

    let corners = random.rangeFloor(3,7);
    var padding = width*0.1; 
    let vw = width -2*padding;
    let center = [width/2 + x, height/2 + y] 
    let radius = vw/2
    let lineWidth = vw/40;

    let svg = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`
    svg +=`<path d="M${x},${y}H${width}V${height}H${-width}Z" fill="#000"/>`

    let polygon = radialPoints(center,radius,corners);
    palette = random.shuffle(palette)
    palette.map((color) =>{
        points = [1,2,3].map(p => lerpFrames(polygon,random.value()))
        svg +=`<path d="${drawPolygon(points)}Z" fill="none" stroke="${color}" stroke-width="${lineWidth}" stroke-linejoin="round"/>`
    })
    svg +="</svg>"
    return svg
}

exports.brilliantSVG = brilliant;