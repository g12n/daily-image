import {random, XORShift64} from 'random-seedable';
import {getUnits} from '../modules/getUnits.js'
import {drawPolygonSmooth,drawPolygon,drawRect} from '../modules/draw.js'
import { chakin } from '../modules/smooth.js';
import PoissonDiskSampling from "poisson-disk-sampling"
import {radialPoints} from "../modules/radialPoints.js"
import vec3 from "gl-vec3"

import polygonClipping from 'polygon-clipping';

import {polygonHull} from "d3-polygon"
import vec2 from "gl-vec2";

import SimplexNoise from 'simplex-noise';
import  svgpath from "svgpath";


import pkg from 'perfect-freehand';
const { getStroke } = pkg;


export let springglade = (viewBox, palette= ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"], seed) =>{
    let random =  new XORShift64( seed );
    const simplex = new SimplexNoise(seed);

    let {x,y,width, height,center,svgTag, inner} = getUnits(viewBox, 0.25);
    let min = Math.min(width,height)    

    let svg = svgTag;
    svg +=`<path d="${drawRect({x,y,width,height})}" fill="#000"/>`



    let p = [x + width/2, y + height];

    let branches = [];

    let branch = []
    
    branch.push([...p])

    for (let i =0; i <= 12; i++){
      let xOffset = random.randRange(-10, 60);
      vec2.add(p, p, [xOffset,-40]);
      let pressure = 1-i/9;
      branch.push([...p,pressure]);
    }

    let b = random.randRange(3,8);
    let branch2 = []
    let p2 = [branch[b][0], branch[b][1]] 
    branch2.push([...p2])

    for (let i =0; i <= 4; i++){
      let xOffset = random.randRange(-60, 0);
      vec2.add(p2, p2, [xOffset,-40]);
      let pressure = 0.5-i/8;
      branch2.push([...p2,pressure]);
    }


    branches = [branch,branch2]
    let wood = [[radialPoints([x + width/2, y + height],50, 16)]]

    branches.map(branch =>{
      const branchPoints = getStroke(branch, {
        size: 40,
        thinning: 0.9,
        smoothing: 0.2,
        streamline: 0.5,
        simulatePressure: false,
        last: true,
        start: {
          cap: true,
          taper: 0
        },
        end: {
          cap: true,
          taper: 0
        },
      })
      wood = polygonClipping.union(wood, [[branchPoints]] )
    })
      
     wood = chakin(wood[0][0], true)
     wood = chakin(wood, true)
    
  
    svg += `<path d="${drawPolygonSmooth(wood,10)}"  fill="${random.choice(palette)}" />`


    branches.map(branch =>{

      center = branch[branch.length - 1]
      let r = random.randRange(width/10, width/6)

     let offset = random.randRangeArray(2, -r/2, r/2)
     let c1 = vec2.add([], center, offset)

      let points = radialPoints(c1,r, 6)

      offset = random.randRange(-r*2, r*2)
      let c2 = vec2.add([], center, [offset,0])
      
      points.push(...radialPoints(c2,r/2, 6))
      let polygon = polygonHull(points)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon = chakin(polygon,true)
      polygon.push(polygon[0])
      let path = drawPolygonSmooth(polygon,10)
      path = svgpath(path).rel().round(0).toString();
      svg += `<path d="${path}"  fill="${random.choice(palette)}" />`
    
    })
    

    

    svg += `</svg>`

    return svg
}