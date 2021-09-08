import { ClassesToManipulate } from '../../enums';
import { IClassManipulator } from './types';

/* Generic */
export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const addClasses = (
  element: HTMLElement,
  classes: IClassManipulator
) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.add(newClass);
  });
};

export const removeClasses = (
  element: HTMLElement,
  classes: IClassManipulator
) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.remove(newClass);
  });
};

export const modifyClasses = (
  element: HTMLElement,
  classesToDel: IClassManipulator = [],
  classesToAdd: IClassManipulator = []
) => {
  removeClasses(element, classesToDel);
  addClasses(element, classesToAdd);
};

export const startLoading = (
  element: HTMLElement,
  classesToDel: IClassManipulator = [],
  classesToAdd: IClassManipulator = []
) => {
  const { INVISIBLE, SHOW, VISIBLE, HIDE } = ClassesToManipulate;
  modifyClasses(
    element,
    [HIDE, INVISIBLE, ...classesToDel],
    [SHOW, VISIBLE, ...classesToAdd]
  );
};

export const finishLoading = (element: HTMLElement) => {
  const { INVISIBLE, SHOW, VISIBLE, HIDE } = ClassesToManipulate;
  modifyClasses(element, [SHOW, VISIBLE], [HIDE, INVISIBLE]);
};

export const disableElement = (
  element: HTMLElement,
  classesToAdd: IClassManipulator = [],
  classesToDel: IClassManipulator = []
) => {
  element.setAttribute('disabled', 'true');
  modifyClasses(element, classesToDel, classesToAdd);
};

export const enableElement = (
  element: HTMLElement,
  classesToAdd: IClassManipulator = [],
  classesToDel: IClassManipulator = []
) => {
  element.removeAttribute('disabled');
  modifyClasses(element, classesToDel, classesToAdd);
};

/* Form related */
//TODO - update regexes
export const validateEmail = (emailValue: string) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
    return false;
  return true;
};

export const validateCommonTextInput = (value: string) => {
  if (/^[A-Ż]?[a-ż]*$/.test(value)) return false;
  return true;
};

export const validateSurname = (value: string) =>
  !/(^[A-Za-ż][']?[A-Z]?[a-ż]+[-|\s]?[A-Za-ż]+$)/.test(value);
