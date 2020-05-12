import React from 'react';

import './PriceList.css';

/*** Assistive Functions ***/
const renderRows = (table) => {
  const rows = [];

  for (let el in table) {
    rows.push(
      table[el].map((item, index) => {
        return <td key={index}>{item}</td>;
      })
    );
  }

  return rows;
};

const renderTable = (rows, rowClass) => {
  let table = rows.map((row, index) => {
    return (
      <tr className={`priceList-row ${rowClass}`} key={index}>
        {row}
      </tr>
    );
  });
  return table;
};

/*** Component ***/
const PriceList = ({
  title,
  prices,
  classes: { titleClass, tableClass, rowClass },
}) => {
  return (
    <>
      <div className={`priceList-title ${titleClass}`}>{title}</div>
      <table className={`priceList-table ${tableClass}`}>
        <tbody>{renderTable(renderRows(prices), rowClass)}</tbody>
      </table>
    </>
  );
};

PriceList.defaultProps = {
  classes: {
    titleClass: '',
    tableClass: '',
    rowClass: '',
  },
};

export default PriceList;
