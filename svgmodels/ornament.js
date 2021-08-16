import {getUnits} from '../modules/getUnits.js'
import {XORShift64} from 'random-seedable';
import vec2 from "gl-vec2"
import {drawRect , drawCircle} from '../modules/draw.js';
import  svgpath from "svgpath";

import { intersectLineCircle } from '../modules/intersectLineCircle.js';
import {intersetCircleCircle} from  '../modules/intersetCircleCircle.js';

export function ornament(viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed=0) {
    let random =  new XORShift64( seed );
    let {x,y,width, height,center,svgTag, inner, padding} = getUnits(viewBox, 0.15)
    let [cx,cy] = center
    let r= inner.r;

    let lines = random.randRange(3,9) ;
    
    let thickness = (r*2.5)/lines;

    center = [parseInt(cx),parseInt(cy)];


    

    // Path for Connector
    let hangerR = r/6;
    let pathOffset= hangerR/4
    let hangerCenter = [parseInt(cx),parseInt(cy)- r - pathOffset ];
    let intersection = intersetCircleCircle(center, parseInt(r)+pathOffset, hangerCenter, hangerR);
    let [pi1, pi2] = intersection;
    let connectorPath =`M${pi1}` 
	    connectorPath += `A ${hangerR} ${hangerR} 0 0 0 ${pi2[0]} ${pi2[1]}`
	    connectorPath += `A ${parseInt(r)} ${parseInt(r)} 0 0 1 ${pi1[0]} ${pi1[1]}`

    //
    let hangerPath  = `M${cx},${y}V${hangerCenter[1] - hangerR}`


    let paths = []
    let debugLines = [];

    let fills = [];
    for (let i = 0; i< lines; i++){
        let angle = random.randRange(Math.PI/(-lines*1.5), Math.PI/(lines*1.5));
		let offset = vec2.lerp([],[0,-r],[0,r] , i/(lines-1));
	    
        vec2.add(offset,offset,[0,random.randRange(-thickness/2, thickness/2)])
	
        let lineCenter = vec2.add([], center,offset )


	    let barThickness = random.randRange(thickness/1.4, thickness/3);

	    let normal = vec2.rotate([],[0,barThickness], angle)

	
	    let p1 = vec2.rotate([],[r,10], angle)
	    let p2 = vec2.negate([],p1)

	    vec2.add(p1, p1, lineCenter)
	    vec2.add(p2, p2, lineCenter)

	//debugLines.push([p1,p2]);


	let a = vec2.add([],p1,normal);
	let b = vec2.add([],p2,normal);
	debugLines.push([a,b]);

	let c = vec2.subtract([],p1,normal);
	let d = vec2.subtract([],p2,normal);

	debugLines.push([c,d]);
	

	let line = intersectLineCircle(a, b, center, r);

	
	let line2 = intersectLineCircle(c, d, center, r);
	let path = ""
	if(line.length >1){
		let[p1,p2] = line;
		path += `M ${p1}L${p2}`
		if(line2.length >1){
			let[p3,p4] = line;
			path += `A ${r} ${r} 0 0 0 ${line2[1][0]} ${line2[1][1]}`
			path += `L ${line2[1]}L${line2[0]}`
			path += `A ${r} ${r} 0 0 0 ${line[0][0]} ${line[0][1]}`
		} else{
			path += `A ${r} ${r} 0 0 0 ${line[0][0]} ${line[0][1]}`
		}
	} else{
			if(line2.length >1){
				path += `M ${line2[0]}L${line2[1]}`
				path += `A ${r} ${r} 0 0 1 ${line2[0][0]} ${line2[0][1]}`
			}	
	}

	if(path != "") {
		    paths.push(path)	
		    
	    }
    }

    

    let svg = svgTag;
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`
    svg +=`<path d="${connectorPath}" fill="#fff"/>`


   let strokeWidth= parseInt(r / 30);

    svg +=`<path d="${hangerPath}" stroke="#fff" stroke-linecap="round" stroke-dasharray="0.01 ${strokeWidth*1.5}" stroke-width="${strokeWidth}"/>`

    paths.map((path,i)=>{
        let fill = random.choice(palette)

        
        svg += `<path d="${svgpath(path).rel().round(1)}" fill="${fill}" />`
    })
    
    svg += "</svg>"
    
    return svg

}