export const clamp = value => Math.max(0, Math.min(1, value));
export const easeLayer = (progress, index) => {
  const t = clamp(progress * 6 - index);
  return t * t * (3 - 2 * t);
};

export const follow = (current,target,elapsed) => current+(target-current)*(1-Math.exp(-Math.min(elapsed,64)/340));
export const scrollProgress = (top,height,viewport) => clamp((viewport*.7-top)/Math.max(1,height-viewport*.4));
