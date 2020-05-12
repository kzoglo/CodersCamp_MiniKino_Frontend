import { isEqual, isLower } from '../../../services/predicates';
import { validateEmail } from '../../../assistive functions';
import {
  labelPosition,
  pTagPosition,
} from '../../low-level_components/FormInput/FormInput';

/*** Assistive Functions ***/
export const negativeValidation = (parentNode, classList, warningText) => {
  parentNode.children[pTagPosition].innerText = warningText;
  classList.replace('neutral-input', 'invalid-input');
};

export const positiveValidation = (parentNode, classList) => {
  parentNode.children[pTagPosition].innerText = '';
  classList.replace('invalid-input', 'neutral-input');
};

export const validateInput = (
  { type, value, parentNode, classList },
  minlength
) => {
  let warningText;
  if (isEqual(type, 'email')) {
    if (validateEmail(value)) {
      warningText = `Niepoprawny email.`;
      negativeValidation(parentNode, classList, warningText);
    } else {
      positiveValidation(parentNode, classList);
    }
  } else {
    if (isLower(value.length, minlength)) {
      const polishNounForm = isEqual(minlength, 3) ? 'znaki' : 'znaków';
      warningText = `"${parentNode.children[labelPosition].innerText}" musi mieć co najmniej ${minlength} ${polishNounForm}.`;
      negativeValidation(parentNode, classList, warningText);
    } else {
      positiveValidation(parentNode, classList);
    }
  }
};
