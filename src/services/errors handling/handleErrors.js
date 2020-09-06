/*** Variables ***/
export const errorCodes = {
  ok: 200,
  created: 201,
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  unprocessable_entity: 422,
  internal_server_error: 500,
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
    bad_request,
    unauthorized,
    forbidden,
    not_found,
    conflict,
    unprocessable_entity,
    internal_server_error,
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
    case bad_request:
      handler(badReqErrMsg, bad_request);
      break;
    case unauthorized:
      handler(authErrMsg, unauthorized);
      break;
    case forbidden:
      handler(forbiddenErrMsg, forbidden);
      break;
    case not_found:
      if (optionsObj.concurrentReserv)
        handler(concurrentReservErrMsg, not_found);
      else handler(notFoundErrMsg, not_found);
      break;
    case conflict:
      handler(conflictErrMsg, conflict);
      break;
    case unprocessable_entity:
      handler(validationErrMsg, unprocessable_entity);
      break;
    case internal_server_error:
      handler(serverErrMsg, internal_server_error);
      break;
    default:
      handler(serverErrMsg, internal_server_error);
  }

  return;
};
