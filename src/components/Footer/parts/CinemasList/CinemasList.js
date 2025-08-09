import React from 'react';

/*** Component ***/
const CinemasList = ({ className = 'item', cinemasList }) => {
  return cinemasList.map(({ content }, index) => {
    return (
      <div className={className} key={index}>
        {content}
      </div>
    );
  });
};



export default CinemasList;
