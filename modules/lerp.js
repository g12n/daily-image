const  clamp = (value, min, max) => {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value);
}

export const lerp =  (min, max, t) => {
    return min * (1 - t) + max * t;
}

export const  lerpArray = (min, max, t, out) => {
    out = out || [];
    if (min.length !== max.length) {
      throw new TypeError('min and max array are expected to have the same length');
    }
    for (var i = 0; i < min.length; i++) {
      out[i] = lerp(min[i], max[i], t);
    }
    return out;
}

export const lerpFrames = (values, t, out) => {
    t = clamp(t, 0, 1);
  
    var len = values.length - 1;
    var whole = t * len;
    var frame = Math.floor(whole);
    var fract = whole - frame;
  
    var nextFrame = Math.min(frame + 1, len);
    var a = values[frame % values.length];
    var b = values[nextFrame % values.length];
    if (typeof a === 'number' && typeof b === 'number') {
      return lerp(a, b, fract);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return lerpArray(a, b, fract, out);
    } else {
      throw new TypeError('Mismatch in value type of two array elements: ' + frame + ' and ' + nextFrame);
    }
  }