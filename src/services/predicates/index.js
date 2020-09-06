export const combinePredicates = (predicateOne, predicateTwo) => (x, y, z) =>
  (predicateOne(x, y) && predicateTwo(x, z)) ||
  (predicateOne(y, x) && predicateTwo(z, x));

export const isLower = (x, y) => y > x;

export const isLowerEqual = (x, z) => z <= x;

export const isEqual = (x, y) => {
  return x === y;
};
