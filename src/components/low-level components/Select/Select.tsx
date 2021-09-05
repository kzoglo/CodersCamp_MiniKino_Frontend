import React from 'react';

import { isEqual } from '../../../services/predicates';
import './Select.css';

/*** Assistive Functions ***/
const doesDataExist = (dataArr) => {
  return !dataArr.every((elem) => isEqual(elem, undefined));
};

const renderOptionTags = (
  optionTitleProp,
  dataArr,
  optionContentFunc,
  optionValueFunc,
  fallbackValueProp
) => {
  if (doesDataExist(dataArr)) {
    return (
      <>
        <option>{optionTitleProp}</option>
        {dataArr.map((item, index) => {
          return (
            <option key={index} value={optionValueFunc(item)}>
              {optionContentFunc(item)}
            </option>
          );
        })}
      </>
    );
  } else return <option>{fallbackValueProp}</option>;
};

/*** Component ***/
const Select = ({
  selectNameProp,
  classes,
  labelTextProp,
  spinnerComp,
  optionTitleProp,
  dataArr,
  optionContentFunc,
  optionValueFunc,
  fallbackValueProp,
  handlerFunc,
  reference,
}) => {
  return (
    <label>
      <div style={{ display: 'inline' }}>{labelTextProp}</div>
      {spinnerComp}
      <select
        name={selectNameProp}
        className={classes}
        ref={reference}
        onChange={handlerFunc}
      >
        {renderOptionTags(
          optionTitleProp,
          dataArr,
          optionContentFunc,
          optionValueFunc,
          fallbackValueProp
        )}
      </select>
    </label>
  );
};

Select.defaultProps = {
  classes: '',
  fallbackValueProp: 'Brak dostępnych terminów',
};

export default Select;
