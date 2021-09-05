const redirectError = (history, err) => {
  history.push({
    pathname: '/servererror',
    state: {
      err,
    },
  });
};

export default redirectError;
