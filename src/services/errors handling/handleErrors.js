import { isEqual } from '../predicates';

/*** Variables ***/
export const errorTexts = {
  serverErrMsg: 'Błąd serwera. Spróbuj ponownie później.',
  concurrentReservErrMsg:
    'Przepraszamy, miejsce zostało już zarezerwowane. Odśwież stronę i spróbuj ponownie.',
  validationErrMsg: 'Wprowadzono dane w niedozwolonym formacie.',
  authErrMsg: 'Nieprawidłowy email lub hasło.',
  conflictErrMsg: 'Taki użytkownik już istnieje.',
  badReqErrMsg: 'Niepoprawne żądanie. Spróbuj ponownie później',
  forbiddenErrMsg: 'Nie masz dostępu do żądanego zasobu.',
  notFoundErrMsg: 'Nie znaleziono żądanego zasobu',
};

/*** Functions ***/
export const handleErrors = (status) => {
  const handler = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
  };

  if (isEqual(status, 200) || isEqual(status, 201)) {
    return;
  } else if (isEqual(status, 400)) {
    handler(errorTexts.badReqErrMsg, 400);
  } else if (isEqual(status, 401)) {
    handler(errorTexts.authErrMsg, status);
  } else if (isEqual(status, 403)) {
    handler(errorTexts.forbiddenErrMsg, status);
  } else if (isEqual(status, 404)) {
    handler(errorTexts.notFoundErrMsg, status);
  } else if (isEqual(status, 409)) {
    handler(errorTexts.conflictErrMsg, status);
  } else if (isEqual(status, 422)) {
    handler(errorTexts.validationErrMsg, status);
  } else if (isEqual(status, 500)) {
    handler(errorTexts.serverErrMsg, status);
  } else {
    handler(errorTexts.serverErrMsg, 500);
  }
};
