const random = require('canvas-sketch-util/random');


const juwel = (context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=100) =>{


    random.setSeed(seed)

    let width = context.canvas.width;
    let height= context.canvas.height;
    let corners =palette.length+1;
    var padding = width*0.2; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    let center = [width/2, height/2] 
    
    let radius = vw/2

    let step = (2*Math.PI) / corners;

    palette = random.shuffle(palette)

    /* Points of the Polygon*/
    let polygon = [];
    for (let i =0; i<=corners; i++){
        let angle = i* step;

        let x = Math.sin(angle) * radius + center[0];
        let y = Math.cos(angle) * radius + center[1];
        polygon.push([x,y]);

    }
    palette.map(color =>{
        context.fillStyle = color;
        context.beginPath();
        polygon =  random.shuffle(polygon)
        for (let i= 0; i<= 2; i++){
            let [x,y] = polygon[i]
            context.lineTo(x, y);
        }
        context.fill()
    })
}

exports.juwel = juwel;