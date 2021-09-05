import React from 'react';

import { isEqual } from '../../../services/predicates';
import './MoviePoster.css';

const MoviePoster = ({ src, alt, available, classes }) => {
  const image = (
    <img className={`${classes} moviePoster-poster`} src={src} alt={alt} />
  );

  const renderMoviePoster = () => {
    if (isEqual(available, true) || isEqual(available, false)) {
      return (
        <div className='moviePoster-wrapper'>
          {image}
          <span
            className={`${
              isEqual(available, true)
                ? 'moviePoster-available'
                : 'moviePoster-unavailable'
            } moviePoster-availability`}
          >{`${isEqual(available, true) ? 'Dostępny' : 'Niedostępny'}`}</span>
        </div>
      );
    } else if (isEqual(available, undefined)) {
      return <div className='moviePoster-wrapper'>{image}</div>;
    }
  };

  return renderMoviePoster();
};

MoviePoster.defaultProps = {
  classes: '',
};

export default MoviePoster;
