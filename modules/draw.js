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
        radius = 0,
        ratio = 0.5,
        start= 0,
        sweep = 0.5
    } = settings;


    let startAngle = start * Math.PI * 2;
    let endAngle =  startAngle + sweep * Math.PI * 2;
    let outerRadius = radius;
    let innerRadius = radius * ratio;

    let p1 = vec2.rotate([],[innerRadius,0],startAngle);
        vec2.add(p1,p1,center)

    let p2 = vec2.rotate([],[outerRadius,0],startAngle);
        vec2.add(p2,p2,center)

    let p3 = vec2.rotate([],[outerRadius,0],endAngle);
        vec2.add(p3,p3,center)

    let p4 = vec2.rotate([],[innerRadius,0],endAngle);
        vec2.add(p4,p4,center)

   let large = sweep >= 0.5 ? 1 : 0 

   let path = `M${p1}L${p2}`

   path += `A ${outerRadius} ${outerRadius} 0 ${large} 1 ${p3}`
   path += `L${p4}`
   path += `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${p1}`
   path = svgpath(path).rel().round(1);
   
   return path

}