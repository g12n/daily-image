/**
 * Calculates the intersection points of two circles
 *
 * @see http://devmag.org.za/2009/04/17/basic-collision-detection-in-2d-part-2/
 * @param {Array} p1 Starting Point of the Line 
 * @param {Array} p2 End Point of the line
 * @param {Array} pc Center Point of the Circle
 * @param {Number} r Radius of the Circle
 * @returns {Array} 
 */

 import vec2 from "gl-vec2"

 
let sq = (value) =>Math.pow(value,2);
let sqrt = Math.sqrt;

export function intersectLineCircle(p1=[0,0],p2=[1,1], pc=[0,0],r=100) {

   // Transform to local coordinates
	// localP1 = LineP1 – CircleCentre
	// localP2 = LineP2 – CircleCentre

    let localP1 = vec2.sub([],p1,pc);
    let localP2 = vec2.sub([],p2,pc);

	// Precalculate this value. We use it often
	//P2MinusP1 = LocalP2 – LocalP1 

    let P2MinusP1 = vec2.sub([],localP2,localP1);
    
	//a = (P2MinusP1.X) * (P2MinusP1.X) + (P2MinusP1.Y) * (P2MinusP1.Y)
    let a = (P2MinusP1[0]) * (P2MinusP1[0]) + (P2MinusP1[1]) * (P2MinusP1[1])
    
    //b = 2 * ((P2MinusP1.X * LocalP1.X) + (P2MinusP1.Y * LocalP1.Y))
    let b = 2 * ((P2MinusP1[0] * localP1[0]) + (P2MinusP1[1] * localP1[1]))

    //	c = (LocalP1.X * LocalP1.X) + (LocalP1.Y * LocalP1.Y) – (Radius * Radius)
    let c = (localP1[0] * localP1[0]) + (localP1[1] * localP1[1]) - (r * r)

	//delta = b * b – (4 * a * c)
    let delta = b * b - (4 * a * c)


	if (delta < 0){ // No intersection
        return null;
    } 
		
	else if (delta == 0) { // One intersection
        u = -b / (2 * a);
		//return LineP1 + (u * P2MinusP1)

        let out = [];
        out[0] = vec2.add([],p1, vec2.mul([],P2MinusP1,[u,u]))

        return out;

		/* Use LineP1 instead of LocalP1 because we want our answer in global
		   space, not the circle's local space */

    }
		
	else if (delta > 0) {// Two intersections
	    //SquareRootDelta = sqrt(delta)
        
        let SquareRootDelta = Math.sqrt(delta);

		let u1 = (-b + SquareRootDelta) / (2 * a)
		let u2 = (-b - SquareRootDelta) / (2 * a)
        
        //return { LineP1 + (u1 * P2MinusP1) ; LineP1 + (u2 * P2MinusP1)}

        let out = []
        out[0] = vec2.add([],p1,vec2.mul([],[u1,u1],P2MinusP1))
        out[1] = vec2.add([],p1,vec2.mul([],[u2,u2],P2MinusP1))
        return out;


    }
}