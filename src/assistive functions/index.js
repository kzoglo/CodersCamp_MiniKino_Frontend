/*** Assistive Functions ***/
/* Generic */
export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    bahavior: 'smooth',
  });
};

export const addClasses = (element, classes) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.add(newClass);
  });
};

export const removeClasses = (element, classes) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.remove(newClass);
  });
};

export const modifyClasses = (
  element,
  classesToDel = [],
  classesToAdd = []
) => {
  removeClasses(element, classesToDel);
  addClasses(element, classesToAdd);
};

export const startLoading = (element, classesToDel = [], classesToAdd = []) => {
  modifyClasses(
    element,
    ['invisible', ...classesToDel],
    ['visible', ...classesToAdd]
  );
};

export const finishLoading = (element) => {
  modifyClasses(element, ['visible'], ['invisible']);
};

export const disableElement = (element, classesToAdd, classesToDel) => {
  element.setAttribute('disabled', true);
  modifyClasses(element, classesToDel, classesToAdd);
};

export const enableElement = (element, classesToAdd, classesToDel) => {
  element.removeAttribute('disabled', true);
  modifyClasses(element, classesToDel, classesToAdd);
};

/* Form related */
export const validateEmail = (emailValue) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
    return false;
  return true;
};
