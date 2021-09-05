/*** Variables ***/
const classes = {
  invisible: 'invisible',
  visible: 'visible',
  show: 'show',
  hide: 'hide',
};

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
  const { show, hide, visible, invisible } = classes;
  modifyClasses(
    element,
    [hide, invisible, ...classesToDel],
    [show, visible, ...classesToAdd]
  );
};

export const finishLoading = (element) => {
  const { show, hide, visible, invisible } = classes;
  modifyClasses(element, [show, visible], [hide, invisible]);
};

export const disableElement = (
  element,
  classesToAdd = [],
  classesToDel = []
) => {
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

export const validateCommonTextInput = (value) => {
  if (/^[A-Ż]?[a-ż]*$/.test(value)) return false;
  return true;
};

export const validateSurname = (value) =>
  !/(^[A-Za-ż][']?[A-Z]?[a-ż]+[-|\s]?[A-Za-ż]+$)/.test(value);
