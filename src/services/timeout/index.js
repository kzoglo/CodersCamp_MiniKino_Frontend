const timeout = (func, time) => {
  const id = setTimeout(func, time);
  return id;
};

export default timeout;
