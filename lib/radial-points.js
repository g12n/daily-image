const radialPoints =  ( center=[0,0], radius=100, sides=6, angleOffset=0 ) =>{
    let step =  (2*Math.PI)/sides;
let startRadians = (0.25*Math.PI)+ angleOffset;

let [cx,cy] = center;

let points = [];
    for (let i = 0; i< sides; i++ ){
    let angle = startRadians + i*step;
    let x = cx + radius * Math.cos(angle)
    let y = cy + radius * Math.sin(angle)
    points.push([x,y])
    }		
    return points
}
exports.radialPoints = radialPoints;