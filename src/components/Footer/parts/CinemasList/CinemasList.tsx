import React from 'react';

/*** Component ***/
const CinemasList = ({ className, cinemasList }) => {
  return cinemasList.map(({ content }, index) => {
    return (
      <div className={className} key={index}>
        {content}
      </div>
    );
  });
};

CinemasList.defaultProps = {
  className: 'item',
};

export default CinemasList;
