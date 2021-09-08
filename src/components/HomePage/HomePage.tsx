import React, { Component } from 'react';

import { scrollTop } from '../../../tools/utils';
import redirectError from '../../services/errors handling/redirectError';
import { handleErrors } from '../../services/errors handling/handleErrors';
import {
  isEqual,
  isLowerEqual as isHigherEqual,
} from '../../services/predicates';
import { isEqual as wereNotMoviesFetched } from '../../services/predicates';
import baseFetch from '../../services/API/v1/baseFetch';
import Loading from '../conditional components/Loading/Loading';
import MoviesGroup from './parts/MoviesGroup/MoviesGroup';
import './HomePage.css';

/*** Component ***/
class HomePage extends Component {
  ageOfNewFMovie = 2;

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      recommendedMovies: [],
      newMovies: [],
      screenings: [],
      availableScreenings: [],
      unavailableScreenings: [],
    };
  }

  /* Lifecycle Methods */
  async componentDidMount() {
    scrollTop();
    try {
      const respMovies = await baseFetch({ path: 'api/movie' });
      handleErrors(respMovies.status);
      const movies = await respMovies.json();
      const screenings = await this.getScreenings();
      const { newMovies, recommendedMovies } = this.classifyMovies(movies);
      const { available, unavailable } = this.checkAvailability(
        movies,
        screenings
      );
      const moviesWithAvailability = this.addAvailability(
        available,
        unavailable,
        movies
      );

      this.setState({
        movies: moviesWithAvailability,
        recommendedMovies,
        newMovies,
      });
    } catch (err) {
      redirectError(this.props.history, err);
    }
  }

  /* Assistive Methods */
  classifyMovies = (movies) => {
    const newMovies = [];
    const recommendedMovies = [];

    movies.forEach((movie) => {
      const movieProductionDate = new Date().getFullYear() - this.ageOfNewFMovie;
      isHigherEqual(movie.year, movieProductionDate)
        ? newMovies.push(movie)
        : recommendedMovies.push(movie);
    });

    return { newMovies, recommendedMovies };
  };

  async getScreenings() {
    const respScreenings = await baseFetch({ path: 'api/screening' });
    handleErrors(respScreenings.status);
    const screenings = await respScreenings.json();
    return screenings;
  }

  checkAvailability(movies, screenings) {
    const available = [];
    const unavailable = [];

    movies.forEach((movie) => {
      screenings.forEach((screening) => {
        if (isEqual(movie._id, screening.movie_id)) {
          if (!available.includes(movie._id)) available.push(movie._id);
        } else {
          if (!unavailable.includes(movie._id)) unavailable.push(movie._id);
        }
      });
    });

    available.forEach((id) => {
      unavailable.forEach((_id, index) => {
        if (isEqual(id, _id)) delete unavailable[index];
      });
    });

    return { available, unavailable };
  }

  addAvailability(available, unavailable, movies) {
    const availableMovies = [];
    const unavailableMovies = [];
    const moviesCopy = [...movies];

    moviesCopy.forEach((movie) => {
      available.forEach((availableId) => {
        if (isEqual(movie._id, availableId)) {
          movie.available = true;
          availableMovies.push(movie);
        }
      });
    });

    unavailable.forEach((unavailableId) => {
      moviesCopy.forEach((movie) => {
        if (!unavailableMovies.includes(movie)) {
          if (isEqual(movie._id, unavailableId)) {
            movie.available = false;
            unavailableMovies.push(movie);
          }
        }
      });
    });

    const moviesWithAvailability = [...unavailableMovies, ...availableMovies];
    return moviesWithAvailability;
  }

  render() {
    if (wereNotMoviesFetched(this.state.recommendedMovies.length, 0)) {
      return <Loading />;
    }

    return (
      <div className='homepage-wrapper'>
        <img className='homepage-img' src='img/jumanji.png' alt='Home' />

        <MoviesGroup
          title='POLECANE FILMY'
          movies={this.state.recommendedMovies}
        />

        <MoviesGroup title='NOWE FILMY' movies={this.state.newMovies} />
      </div>
    );
  }
}

console.log();

export default HomePage;
