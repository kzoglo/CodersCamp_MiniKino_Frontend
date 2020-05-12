export const check = (p1, p2) => (x, y, z) =>
  (p1(x, y) && p2(x, z)) || (p1(y, x) && p2(z, x));

export const isLower = (x, y) => y > x;

export const isLowerEqual = (x, z) => z <= x;

export const isInequal = (x, y) => x !== y;

export const isEqual = (x, y) => {
  return x === y;
};
