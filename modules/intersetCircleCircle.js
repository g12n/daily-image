/**
 * Calculates the intersection points of two circles
 *
 * @see http://www.xarg.org/2016/07/calculate-the-intersection-points-of-two-circles/
 * @param {Array} p1
 * @param {Array} r1
 * @param {Array} p2
 * @returns {Array}
 */


export let intersetCircleCircle = (p1,r1, p2, r2) => {
    let [x1, y1 ] = p1;
    let [x2, y2] = p2;
    
    let d = Math.hypot(x2 - x1, y2 - y1)

    let intersections = []

    if (d <= r1 + r2 && d >= Math.abs(r2 - r1)) {
        let ex = (x2 - x1) / d
        let ey = (y2 - y1) / d
        let x = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
        let y = Math.sqrt(r1 * r1 - x * x)

        intersections[0] = [
            x1 + x * ex - y * ey,
            y1 + x * ey + y * ex
        ]

        intersections[1] = [
             x1 + x * ex + y * ey,
            y1 + x * ey - y * ex
        ]

    } else {
        // No Intersection, far outside or one circle within the other
        intersections = null
    }

    return intersections
}