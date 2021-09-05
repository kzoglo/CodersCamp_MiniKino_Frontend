import React from 'react';

import CinemasList from '../CinemasList/CinemasList';
import { cinemasList } from '../CinemasList/data';

/*** Component ***/
const OurCinemas = () => {
  return (
    <div className="item">
      <h2>NASZE KINA</h2>
      <div className="ui list">
        <CinemasList cinemasList={cinemasList} />
      </div>
    </div>
  );
};

export default OurCinemas;
