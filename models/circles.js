const random = require('canvas-sketch-util/random');



const circles = (context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    
    random.setSeed(seed)

    let width = context.canvas.width;
    let height= context.canvas.height;
    var padding = width*0.1; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    let r = vw/2;
    let center = [width/2, height/2] 

    palette = random.shuffle(palette)

    palette.map(color =>{
        context.fillStyle = color;
        let startAngle = random.range(0, 2* Math.PI);

        let endAngle = random.range( startAngle+ 0.1* Math.PI, startAngle+ 1.5* Math.PI);

        let radius = random.range(r/10 ,r );

        let thickness = random.range(radius*0.1,radius*0.8) 

        let radius2 = radius - thickness;

        context.beginPath();
        context.arc(center[0], center[1], radius, startAngle,  endAngle, false);
        context.arc(center[0], center[1], radius2, endAngle,  startAngle, true);
        context.fill()
    })

}

exports.circles = circles;