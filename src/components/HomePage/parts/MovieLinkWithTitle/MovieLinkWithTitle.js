import React from 'react';
import { Link } from 'react-router-dom';

import { baseUrl } from '../../../../services/apis/baseFetch';
import { setAnyItem as setMovieId } from '../../../../services/localStorage';
import { appName } from '../../../App/routing/routingList';
import MoviePoster from '../../../low-level_components/MoviePoster/MoviePoster';
import './MovieLinkWithTitle.css';

/*** Component ***/
const MovieLinkWithTitle = ({ imageUrl, _id, title, available }) => {
  return (
    <>
      <Link
        to={`${appName}/reservation`}
        className="movieLinkWithTitle-wrapper"
        onClick={() => setMovieId('movieId', _id)}
      >
        <MoviePoster
          src={`${baseUrl}${imageUrl}`}
          alt={title}
          available={available}
        />
        <p className="movieLinkWithTitle-title" data-movie-id={_id}>
          {title}
        </p>
      </Link>
    </>
  );
};

export default MovieLinkWithTitle;
