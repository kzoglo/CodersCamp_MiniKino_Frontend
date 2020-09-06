export const getItem = (item) => {
  return window.localStorage.getItem(item);
};

export const setItem = (item, value) => {
  window.localStorage.setItem(item, value);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
