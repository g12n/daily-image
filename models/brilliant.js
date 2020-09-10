const random = require('canvas-sketch-util/random');
const {lerpFrames} = require('canvas-sketch-util/math');
const { range } = require('canvas-sketch-util/random');

const brilliant = (context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=100) =>{
    random.setSeed(seed)
    let width = context.canvas.width;
    let height= context.canvas.height;
    let corners = random.rangeFloor(3,7);
    var padding = width*0.1; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    let center = [width/2, height/2] 
    
    let radius = vw/2
    
    let step = (2*Math.PI) / corners;
    let angleOffset = random.range(0,step)

    context.lineWidth = vw/20;
    context.lineJoin = "round"

    /* Points of the Polygon*/
    let polygon = [];
    for (let i =0; i<=corners; i++){
        let angle = i* step +angleOffset;
        let x = Math.sin(angle) * radius + center[0];
        let y = Math.cos(angle) * radius + center[1];
        polygon.push([x,y]);
    }
    palette = random.shuffle(palette)
    palette.map((color) =>{
        context.strokeStyle = color;
        context.beginPath();
        for (let i = 0; i<=2; i++){
            let [x,y] = lerpFrames(polygon,random.value());
            context.lineTo(x, y);
        }
        context.closePath()
        context.stroke()
    })
}

exports.brilliant = brilliant;