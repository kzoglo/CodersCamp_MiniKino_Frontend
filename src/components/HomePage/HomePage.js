import React, { Component } from 'react';

import { handleErrors } from '../../services/errors handling/handleErrors';
import {
  isInequal as moviesBeenFetched,
  isEqual,
  isLowerEqual as isHigherEqual,
} from '../../services/predicates';
import baseFetch from '../../services/apis/baseFetch';
import Loading from '../conditional_components/Loading/Loading';
import MoviesGroup from './parts/MoviesGroup/MoviesGroup';
import './HomePage.css';

/*** Component ***/
class HomePage extends Component {
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
      this.props.history.push('./servererror');
    }
  }

  /* Assistive Methods */
  classifyMovies = (movies) => {
    const newMovies = [];
    const recommendedMovies = [];

    movies.forEach((movie) => {
      isHigherEqual(movie.year, new Date().getFullYear() - 1)
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

  /* Render */
  render() {
    if (!moviesBeenFetched(this.state.recommendedMovies.length, 0)) {
      return <Loading />;
    }

    return (
      <div className="homepage-wrapper">
        <img className="homepage-img" src="img/jumanji4.png" alt="Home" />

        <MoviesGroup
          title="POLECANE FILMY"
          movies={this.state.recommendedMovies}
        />

        <MoviesGroup title="NOWE FILMY" movies={this.state.newMovies} />
      </div>
    );
  }
}

export default HomePage;