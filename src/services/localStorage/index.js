export const getAnyItem = item => {
  return window.localStorage.getItem(item);
};

export const setAnyItem = (item, value) => {
  window.localStorage.setItem(item, value);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
