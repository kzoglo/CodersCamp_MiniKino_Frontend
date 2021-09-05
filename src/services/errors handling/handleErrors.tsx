/*** Variables ***/
export const errorCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  unprocessableEntity: 422,
  internalServerError: 500,
};

export const errorTexts = {
  serverErrMsg: 'Błąd serwera. Spróbuj ponownie później.',
  concurrentReservErrMsg:
    'Przepraszamy, miejsce zostało już zarezerwowane. Odśwież stronę i spróbuj ponownie.',
  validationErrMsg: 'Wprowadzono dane w niedozwolonym formacie.',
  authErrMsg: 'Nieprawidłowy email lub hasło.',
  conflictErrMsg: 'Taki użytkownik już istnieje.',
  badReqErrMsg: 'Niepoprawne żądanie. Spróbuj ponownie później.',
  forbiddenErrMsg: 'Nie masz dostępu do żądanego zasobu.',
  notFoundErrMsg: 'Nie znaleziono żądanego zasobu.',
};

/*** Functions ***/
export const handleErrors = (
  status,
  optionsObj = { concurrentReserv: false }
) => {
  const handler = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
  };

  const {
    ok,
    created,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    unprocessableEntity,
    internalServerError,
  } = errorCodes;
  const {
    badReqErrMsg,
    authErrMsg,
    forbiddenErrMsg,
    concurrentReservErrMsg,
    notFoundErrMsg,
    conflictErrMsg,
    validationErrMsg,
    serverErrMsg,
  } = errorTexts;

  switch (status) {
    case ok:
    case created:
      break;
    case badRequest:
      handler(badReqErrMsg, badRequest);
      break;
    case unauthorized:
      handler(authErrMsg, unauthorized);
      break;
    case forbidden:
      handler(forbiddenErrMsg, forbidden);
      break;
    case notFound:
      if (optionsObj.concurrentReserv)
        handler(concurrentReservErrMsg, notFound);
      else handler(notFoundErrMsg, notFound);
      break;
    case conflict:
      handler(conflictErrMsg, conflict);
      break;
    case unprocessableEntity:
      handler(validationErrMsg, unprocessableEntity);
      break;
    case internalServerError:
      handler(serverErrMsg, internalServerError);
      break;
    default:
      handler(serverErrMsg, internalServerError);
  }

  return;
};
