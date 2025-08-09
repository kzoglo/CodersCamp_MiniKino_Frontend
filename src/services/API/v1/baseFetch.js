const baseFetch = async ({
  path,
  body = null,
  contentType = 'application/json',
  method = 'GET',
  authToken = '',
}) => {
  return await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
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
