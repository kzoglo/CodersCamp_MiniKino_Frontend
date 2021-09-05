import timeout from '../../../services/timeout/';

describe('Timeout', () => {
  test('should return id of a created timeout', () => {
    const idOne = timeout(() => {}, 200);
    const idTwo = timeout(() => {}, 300);

    expect(idOne).toBeTruthy();
    expect(idOne).toBeGreaterThan(0);
    expect(idTwo).toBeTruthy();
    expect(idTwo).toBeGreaterThan(0);
  });
});
