import React from 'react';

import PriceList from './parts/PriceList/PriceList';
import pricesData from './parts/pricesData';
import './Prices.css';

/*** Component ***/
const Prices = (): JSX.Element => {
  return (
    <div className="prices-wrapper">
      <div className="prices-content">
        <h1 className="prices-title">Ceny biletów</h1>

        <PriceList prices={pricesData.twoD} title="FILMY 2D" />

        <PriceList prices={pricesData.threeD} title="FILMY 3D" />
      </div>
    </div>
  );
};

export default Prices;
