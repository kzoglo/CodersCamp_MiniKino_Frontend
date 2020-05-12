import React from 'react';

import { isEqual } from '../../../services/predicates';
import './MoviePoster.css';

const MoviePoster = ({ src, alt, available, classes }) => {
  const renderMoviePoster = () => {
    if (isEqual(available, true) || isEqual(available, false)) {
      return (
        <div className="moviePoster-wrapper">
          <img
            className={`${classes} moviePoster-poster`}
            src={src}
            alt={alt}
          />
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
      return (
        <div className="moviePoster-wrapper">
          <img
            className={`${classes} moviePoster-poster`}
            src={src}
            alt={alt}
          />
        </div>
      );
    }
  };

  return renderMoviePoster();
};

MoviePoster.defaultProps = {
  classes: '',
};

export default MoviePoster;
