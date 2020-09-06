import {
  combinePredicates,
  isLower,
  isLowerEqual,
  isEqual,
} from '../../../services/predicates';

describe('Predicates', () => {
  let obj = {
    a: 'a',
    b: 'b',
  };
  let arr = [1, 2, 3];

  describe('combinePredicates', () => {
    let f1, f2;
    test('should return true, if every argument of the first function returns "true".', () => {
      f1 = (x, y) => true;
      f2 = (x, z) => true;
      expect(combinePredicates(f1, f2)(1, 2, 3)).toBe(true);
    });

    test('should return false, if every argument of the first function returns "false".', () => {
      f1 = (x, y) => true;
      f2 = (x, z) => false;
      expect(combinePredicates(f1, f2)(1, 2, 3)).toBe(false);
    });

    test('should return true, if every argument of the first function returns "true".', () => {
      f1 = (x, y) => false;
      f2 = (x, z) => false;
      expect(combinePredicates(f1, f2)(1, 2, 3)).toBe(false);
    });
  });

  describe('isLower', () => {
    test('should return "true", if first argument is lower than second.', () => {
      expect(isLower(1, 2)).toBe(true);
    });

    test('should return "false", if first argument is higher or equal to second.', () => {
      expect(isLower(2, 1)).toBe(false);
      expect(isLower(2, 2)).toBe(false);
    });
  });

  describe('isLowerEqual', () => {
    test('should return "true", if second argument is lower or equal to first.', () => {
      expect(isLowerEqual(3, 2)).toBe(true);
      expect(isLowerEqual(3, 3)).toBe(true);
    });

    test('should return "false", if second argument is higher than first.', () => {
      expect(isLowerEqual(2, 3)).toBe(false);
    });
  });

  describe('isEqual', () => {
    test('should return "false", if arguments are strictly different.', () => {
      expect(isEqual(arr[0], 2)).toBe(false);
      expect(isEqual('3', '2')).toBe(false);
      expect(isEqual('b', obj.a)).toBe(false);
    });

    test('should return "true", if arguments are strictly the same.', () => {
      expect(isEqual(arr[2], 3)).toBe(true);
      expect(isEqual('3', '3')).toBe(true);
      expect(isEqual('a', obj.a)).toBe(true);
    });
  });
});
