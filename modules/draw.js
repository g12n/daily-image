import  svgpath from "svgpath";
import vec2 from "gl-vec2"


export const drawPolygon = (polygon = [[0,0],[10,10][0,20]]) =>{
    let path = ""
    polygon.map( ([x,y],i) => {
        path+= i=== 0 ? `M${x}, ${y}` : `L ${x}, ${y}`;
    })
    path += "z"
    path = svgpath(path).rel().round(1)
    return path;
}

export const drawRect = ({x,y,width,height}) =>{

    let path= `M${x},${y}h${width}v${height}h-${width}z`;
   return path = svgpath(path).rel().round(1)
}

export const drawArc = (settings) =>{

    let {
        center = [0,0],
        radius = 100,
        ratio = 0,
        start= 0,
        sweep = 1
    } = settings;

    let startAngle = start * Math.PI * 2;
    
    let endAngle = sweep < 1 ? startAngle + sweep * Math.PI * 2 : startAngle + sweep * Math.PI;
    
    let outerRadius = radius;
    let innerRadius = radius * ratio;

    let p1 = vec2.rotate([],[outerRadius,0],startAngle);
    let p2 = vec2.rotate([],[outerRadius,0],endAngle);
    let p3 = vec2.rotate([],[innerRadius,0],endAngle);
    let p4 = vec2.rotate([],[innerRadius,0],startAngle);
    
    let large = sweep >= 0.5 ? 1 : 0 

    let path = `M${p1}`
    path += `A ${outerRadius} ${outerRadius} 0 ${large} 1 ${p2}`
   path += sweep < 1 ? `L${p3}` : `A ${outerRadius} ${outerRadius} 0 ${large} 1 ${p1}z`

   if(ratio >0){
    path += sweep < 1 ? "" : `M${p3}`;
    path += `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${p4}`
    path += sweep < 1 ? `z` : `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${p3}z`
   }

   path = svgpath(path).rel().translate(center[0],center[1]).round(1);
   return path

}