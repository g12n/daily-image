

const circles = (context, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"]) =>{
    let width = context.canvas.width;
    let height= context.canvas.height;
    var padding = 6; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    let center = [width/2, height/2] 
    palette.map(color =>{
        context.fillStyle = color;
        let startAngle = Math.random() * (2* Math.PI);

        let endAngle = startAngle -  Math.random() * (Math.PI);
        let radius = Math.random() * vw / 2;
        let radius2 = radius * Math.random() ;

        context.beginPath();
        context.arc(center[0], center[1], radius, startAngle,  endAngle, true);
        context.arc(center[0], center[1], radius2, endAngle,  startAngle, false);
        context.fill()
    })

}

exports.circles = circles;