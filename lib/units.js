let getUnits = (context, pad=0.1) =>{
    let width = context.canvas.width;
    let height= context.canvas.height;
    var padding = width*pad; 
    let vw = context.canvas.width -2*padding;
    let vh = context.canvas.height -2*padding;
    
    let vmin = Math.min(vh,vw);
    let vmax = Math.max(vh,vw);
    let r = vmin/2;
    let center = [width/2, height/2]

    return {width, height, padding, vh, vw, vmin, vmax, r, center}
}

exports.getUnits = getUnits;