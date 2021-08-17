

export let  getUnits = (viewBox="0 0 100 100", pad=0.1) =>{

    let [x,y,width, height] = viewBox.split(" ").map(v =>Number(v))
    let vmin = Math.min(width,height);
    let vmax = Math.max(width,height);

    var padding = vmin * pad; 
    //let vw = width - 2 * padding;
    //let vh = height - 2 * padding;
    
    //let vmin = Math.min(vh,vw);
    //let vmax = Math.max(vh,vw);
    let r = vmin/2;
    let center = [width/2 + x , height/2 + y]
    let inner = {
        x: x+ padding,
        y: y + padding,
        width: width - padding * 2,
        height: height - padding * 2,
        r: r - padding
    }

    inner.min = Math.min(inner.width, inner.height);
    inner.max = Math.max(inner.width, inner.height);


    let svgTag = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`;

    return {x,y,width,height,padding,r,center, inner, svgTag}
}