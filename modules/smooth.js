// Chaikin
// http://www.idav.ucdavis.edu/education/CAGDNotes/Chaikins-Algorithm/Chaikins-Algorithm.html

export const lerp = (p0 = [0, 0], p1 = [1, 1], t = 0.5) => {
    const [p0x, p0y] = p0;
    const [p1x, p1y] = p1;
    return [(1 - t) * p0x + t * p1x, (1 - t) * p0y + t * p1y];
};
  
export const chakin = (input, closed = false, distance = 0.25) => {
    const output = [];
    const start = input[0];
    input.push(start);
  
    for (var i = 0; i < input.length - 1; i++) {
      const p0 = input[i];
      const p1 = input[i + 1];
  
      var Q = lerp(p0, p1, distance);
      var R = lerp(p0, p1, 1 - distance);
      output.push(Q);
      output.push(R);
    }
  return output;
};