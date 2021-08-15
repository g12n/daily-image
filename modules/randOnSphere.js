import { XORShift64 } from 'random-seedable';

// Generate Arrays of points format [x,y,(z)]

export function randOnSphere(radius = 1, random = new XORShift64) {
    let out = [];
    var u = random.float() * Math.PI * 2;
    var v = random.float() * 2 - 1;
    var phi = u;
    var theta = Math.acos(v);
    out[0] = radius * Math.sin(theta) * Math.cos(phi);
    out[1] = radius * Math.sin(theta) * Math.sin(phi);
    out[2] = radius * Math.cos(theta);
    return out;
}
