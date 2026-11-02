export const clamp = value => Math.max(0, Math.min(1, value));
export const easeLayer = (progress, index) => {
  const t = clamp(progress * 6 - index);
  return t * t * (3 - 2 * t);
};
