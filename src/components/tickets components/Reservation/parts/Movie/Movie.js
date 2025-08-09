import React from 'react';

import { getImageUrl } from '../../../../../services/imageService';
import MoviePoster from '../../../../low-level components/MoviePoster/MoviePoster';
import MovieInfo from '../../../../low-level components/MovieInfo/MovieInfo';
import './Movie.css';

/*** Assistive Functions ***/
const renderMovie = ({ _id, imageUrl, title, description }) => {
  return (
    <div className='movie-wrapper' key={_id}>
      <MoviePoster src={getImageUrl(imageUrl)} alt={title} />

      <div className='movie-utils'>
        <MovieInfo movie={{ description, title }} />
      </div>
    </div>
  );
};

/*** Component ***/
const Movie = ({ movie }) => {
  return renderMovie(movie);
};

export default Movie;
