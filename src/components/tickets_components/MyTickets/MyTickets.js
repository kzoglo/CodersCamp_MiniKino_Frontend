import React, { Component } from 'react';

import { handleErrors } from '../../../services/errors handling/handleErrors';
import redirectError from '../../../services/errors handling/redirectError';
import baseFetch from '../../../services/apis/baseFetch';
import { getAnyItem as getUserId } from '../../../services/localStorage';
import { getAnyItem as getToken } from '../../../services/localStorage';
import { isEqual as areReservationsFetched } from '../../../services/predicates';
import { isEqual as isUserLoggedIn } from '../../../services/predicates';
import Loading from '../../conditional_components/Loading/Loading';
import { LogInNeeded } from '../../conditional_components/LogInNeeded/LogInNeeded';
import { Movies } from './parts/Movies';
import './MyTickets.css';

/*** Assistive Functions ***/
const renderTickets = ({ user_id, reservations }) => {
  if (isUserLoggedIn(user_id, '') || isUserLoggedIn(user_id, null)) {
    return <LogInNeeded />;
  } else if (areReservationsFetched(reservations, null)) {
    return <Loading />;
  } else {
    return (
      <div className="myTickets-outerWrapper">
        <Movies reservations={reservations} />
      </div>
    );
  }
};

/*** Component ***/
export class MyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: getUserId('userId'),
      reservations: null,
    };
  }

  /* Lifecycle Methods */
  async componentDidMount() {
    if (
      !(
        isUserLoggedIn(this.state.user_id, '') ||
        isUserLoggedIn(this.state.user_id, null)
      )
    ) {
      try {
        const resp = await baseFetch({
          path: `api/reservation/${this.state.user_id}/none`,
          authToken: getToken('token'),
        });

        handleErrors(resp.status);

        const reservations = await resp.json();

        this.setState({ reservations });
      } catch (err) {
        redirectError(this.props.history, err);
      }
    }
  }

  /* Render */
  render() {
    return renderTickets(this.state, this.props);
  }
}
