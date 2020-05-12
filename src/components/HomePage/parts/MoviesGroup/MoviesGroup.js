import React from 'react';

import MovieLinkWithTitle from '../MovieLinkWithTitle/MovieLinkWithTitle';
import './MoviesGroup.css';

/*** Assistive Functions ***/
const renderMovies = (movies) => {
  return movies.map(({ imageUrl, title, _id, available }, index) => {
    return (
      <MovieLinkWithTitle
        key={index}
        imageUrl={imageUrl}
        title={title}
        available={available}
        _id={_id}
      />
    );
  });
};

/*** Component ***/
const MoviesGroup = ({ title, movies }) => {
  return (
    <div className="moviesGroup-wrapper">
      <h1 className="moviesGroup-title">{title}</h1>
      <div className="moviesGroup-list">{renderMovies(movies)}</div>
    </div>
  );
};

export default MoviesGroup;
