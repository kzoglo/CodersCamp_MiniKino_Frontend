import React, { Component } from 'react';

import { scrollTop } from '../../../assistive functions';
import redirectError from '../../../services/errors handling/redirectError';
import { handleErrors } from '../../../services/errors handling/handleErrors';
import baseFetch from '../../../services/apis/baseFetch';
import {
  isEqual as isUserLoggedIn,
  isEqual as isMovieFetched,
} from '../../../services/predicates';
import { getItem as getId } from '../../../services/localStorage';
import { getItem as getToken } from '../../../services/localStorage';
import { LogInNeeded } from '../../conditional_components/LogInNeeded/LogInNeeded';
import Loading from '../../conditional_components/Loading/Loading';
import Movie from './parts/Movie/Movie';
import BuyTicket from './parts/BuyTicket/BuyTicket';
import '../../tickets_components/MyTickets/MyTickets.css';
import './Reservation.css';

/*** Component ***/
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: getId('userId'),
      movie_id: '',
      movie: null,
    };
    this.wrapperRef = React.createRef();
  }

  /* Lifycycle Methods */
  async componentDidMount() {
    const movie_id = getId('movieId');

    if (
      !(
        isUserLoggedIn(this.state.user_id, '') ||
        isUserLoggedIn(this.state.user_id, null)
      )
    ) {
      try {
        const resp = await baseFetch({
          path: `api/movie/${movie_id}`,
          authToken: getToken('token'),
        });

        handleErrors(resp.status);

        const movie = await resp.json();
        this.setState({
          movie_id,
          movie,
        });
      } catch (err) {
        redirectError(this.props.history, err);
      }
    }
  }

  componentDidUpdate() {
    scrollTop();
  }

  /* Assistive Methods */
  renderReservation = () => {
    if (
      isUserLoggedIn(this.state.user_id, '') ||
      isUserLoggedIn(this.state.user_id, null)
    ) {
      setTimeout(() => {
        this.props.history.push('/login');
      }, 1000);

      return <LogInNeeded />;
    } else if (isMovieFetched(this.state.movie, null)) {
      return <Loading />;
    } else {
      return (
        <div className='reservation-outerWrapper'>
          <div className='reservation-wrapper' ref={this.wrapperRef}>
            <div className='reservation-itemWrapper'>
              <Movie movie={this.state.movie} />
            </div>

            <div className='reservation-itemWrapper'>
              <BuyTicket
                history={this.props.history}
                movie_id={this.state.movie_id}
                user_id={this.state.user_id}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  /* Render */
  render() {
    return this.renderReservation();
  }
}

export default Reservation;
