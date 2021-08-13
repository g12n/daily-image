import  svgpath from "svgpath";

export const drawPolygon = (polygon = [[0,0],[10,10][0,20]]) =>{
    let path = ""
    polygon.map( ([x,y],i) => {
        path+= i=== 0 ? `M${x}, ${y}` : `L ${x}, ${y}`;
    })
    path += "z"
    path = svgpath(path).rel().round(1)
    return path;
}
