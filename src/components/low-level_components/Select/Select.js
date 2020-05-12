import React from 'react';

import { isEqual } from '../../../services/predicates';
import './Select.css';

/*** Assistive Functions ***/
const doesDataExist = (data) => {
  return !data.every((elem) => isEqual(elem, undefined));
};

const renderOptionTags = (
  optionTitle,
  data,
  optionContent,
  optionValue,
  fallbackValue
) => {
  if (doesDataExist(data)) {
    return (
      <>
        <option>{optionTitle}</option>
        {data.map((item, index) => {
          return (
            <option key={index} value={optionValue(item)}>
              {optionContent(item)}
            </option>
          );
        })}
      </>
    );
  }
  return <option>{fallbackValue}</option>;
};

/*** Component ***/
const Select = ({
  selectName,
  classes,
  labelText,
  spinner,
  optionTitle,
  data,
  optionContent,
  optionValue,
  fallbackValue,
  handler,
  reference,
}) => {
  return (
    <label>
      <div style={{ display: 'inline' }}>{labelText}</div>
      {spinner}
      <select
        name={selectName}
        className={classes}
        ref={reference}
        onChange={handler}
      >
        {renderOptionTags(
          optionTitle,
          data,
          optionContent,
          optionValue,
          fallbackValue
        )}
      </select>
    </label>
  );
};

Select.defaultProps = {
  classes: '',
  fallbackValue: 'Brak dostępnych terminów',
};

export default Select;
