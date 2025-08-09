import React from 'react';
import './SubmitBtn.css';

export const SubmitBtn = ({ classes = '', btnText = 'Wyślij', reference, children }) => {
  return (
    <button 
      className={`submitBtn ${classes}`} 
      type="submit" 
      ref={reference}
    >
      {btnText}
      {children}
    </button>
  );
};

