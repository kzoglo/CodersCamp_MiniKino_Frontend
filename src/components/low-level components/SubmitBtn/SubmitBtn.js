import React from 'react';
import './SubmitBtn.css';

export const SubmitBtn = ({ classes, btnText, reference, children }) => {
  return (
    <button className={`submitBtn ${classes}`} type="submit" ref={reference}>
      {btnText}
      {children}
    </button>
  );
};

SubmitBtn.defaultProps = {
  classes: '',
  btnText: 'Wyślij',
};
