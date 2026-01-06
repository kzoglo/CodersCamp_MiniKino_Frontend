const baseFetch = async ({
  path,
  body = null,
  contentType = 'application/json',
  method = 'GET',
  authToken = '',
}) => {
  // Use relative URL for API calls (proxied through CloudFront)
  const url = path.startsWith('/api/') ? path : `${process.env.REACT_APP_API_URL}${path}`;

  return await fetch(url, {
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
