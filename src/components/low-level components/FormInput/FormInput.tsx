import React from 'react';

import './FormInput.css';

/*** Component ***/
const FormInput = ({
  moduleName,
  title,
  formValue,
  validationVal,
  type,
  name,
  placeholder,
  inputRef,
  minlength = 3,
  maxlength = 20,
  required = true,
  onClick,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`field ${moduleName}-${name}-wrapper`}>
      <label className='formInput-label' htmlFor={name}>
        {title}
      </label>
      <input
        id={name}
        className='formInput-input neutral-input'
        placeholder={placeholder}
        name={name}
        type={type}
        ref={inputRef}
        value={formValue}
        minLength={minlength}
        maxLength={maxlength}
        required={required}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
      />
      <p className='validation-p'>{validationVal}</p>
    </div>
  );
};

export default FormInput;
