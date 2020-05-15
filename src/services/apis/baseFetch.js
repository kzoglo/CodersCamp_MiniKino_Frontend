export const baseUrl = 'http://localhost:3001/';
// https://mini-kino.herokuapp.com/

const baseFetch = async ({
  path,
  body = null,
  contentType = 'application/json',
  method = 'GET',
  authToken = '',
}) => {
  return await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType,
      Authorization: `Bearer ${authToken}`,
    },
    body,
  });
};

export default baseFetch;
