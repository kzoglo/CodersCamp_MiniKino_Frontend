import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Select from '../../../../components/low-level components/Select/Select';

describe('Select', () => {
  let props = {
    selectNameProp: 'test',
    classes: 'test',
    labelTextProp: 'test',
    spinnerComp: <p>spinner-test</p>,
    optionTitleProp: 'test',
    dataArr: ['test1', 'test2'],
    optionContentFunc: (x) => x,
    optionValueFunc: (x) => x,
    handlerFunc: () => {},
    reference: undefined,
  };

  test('should render "Select" component containing <option/> elements with values consistent with props.dataArr items, if dataArr contains at least one item which is not of type "undefined".', () => {
    const { getByRole } = render(
      <Select {...props} />,
      document.body.appendChild(document.createElement('div'))
    );
    const select = getByRole('combobox');
    const optionTest1 = select.children[1];

    userEvent.selectOptions(select, ['test1']);
    expect(optionTest1.selected).toBe(true);
  });

  test('should render "Select" component containing only one <option/> element with fallback value - "Brak dostępnych terminów", if dataArr contains no items of type different than "undefined".', () => {
    props.dataArr = [undefined, undefined];
    const div = document.createElement('div');
    const { getByRole, getByText } = render(
      <Select {...props} />,
      document.body.appendChild(div)
    );
    const select = getByRole('combobox');
    const numberOfOptions = select.children.length;
    const fallbackText = 'Brak dostępnych terminów';

    expect(getByText(fallbackText)).toBeInTheDocument();

    userEvent.selectOptions(select, [fallbackText]);
    expect(getByText(fallbackText).selected).toBe(true);
    expect(numberOfOptions).toBe(1);
  });
});
