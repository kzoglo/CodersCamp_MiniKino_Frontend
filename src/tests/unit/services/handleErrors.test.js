import { handleErrors } from '../../../services/errors handling/handleErrors';

describe('handleErrors', () => {
  test('should return undefined, if argument "status" is equal to 200 or 201.', () => {
    expect(handleErrors(200)).toBe(undefined);
    expect(handleErrors(201)).toBe(undefined);
  });

  test('should throw an error with statusCode 400 and message "Niepoprawne żądanie. Spróbuj ponownie później.", if argument "status" is equal to 400', () => {
    try {
      handleErrors(400);
    } catch (err) {
      expect(err.message).toBe(
        'Niepoprawne żądanie. Spróbuj ponownie później.'
      );
      expect(err.statusCode).toBe(400);
    }
  });

  test('should throw an error with statusCode 401 and message "Nieprawidłowy email lub hasło.", if argument "status" is equal to 401', () => {
    try {
      handleErrors(401);
    } catch (err) {
      expect(err.message).toBe('Nieprawidłowy email lub hasło.');
      expect(err.statusCode).toBe(401);
    }
  });

  test('should throw an error with statusCode 403 and message "Nie masz dostępu do żądanego zasobu.", if argument "status" is equal to 403', () => {
    try {
      handleErrors(403);
    } catch (err) {
      expect(err.message).toBe('Nie masz dostępu do żądanego zasobu.');
      expect(err.statusCode).toBe(403);
    }
  });

  test('should throw an error with statusCode 404 and message "Nie znaleziono żądanego zasobu.", if argument "status" is equal to 404', () => {
    try {
      handleErrors(404);
    } catch (err) {
      expect(err.message).toBe('Nie znaleziono żądanego zasobu.');
      expect(err.statusCode).toBe(404);
    }
  });

  test('should throw an error with statusCode 409 and message "Taki użytkownik już istnieje.", if argument "status" is equal to 409', () => {
    try {
      handleErrors(409);
    } catch (err) {
      expect(err.message).toBe('Taki użytkownik już istnieje.');
      expect(err.statusCode).toBe(409);
    }
  });

  test('should throw an error with statusCode 500 and message "Błąd serwera. Spróbuj ponownie później.", if argument "status" is equal to 500', () => {
    try {
      handleErrors(500);
    } catch (err) {
      expect(err.message).toBe('Błąd serwera. Spróbuj ponownie później.');
      expect(err.statusCode).toBe(500);
    }
  });

  test('should throw an error with statusCode 500 and message "Błąd serwera. Spróbuj ponownie później.", if argument "status" is not equal to 200, 201, 400, 401, 403, 404, 409, 422, 500', () => {
    try {
      handleErrors(500);
    } catch (err) {
      expect(err.message).toBe('Błąd serwera. Spróbuj ponownie później.');
      expect(err.statusCode).toBe(500);
    }
  });
});
