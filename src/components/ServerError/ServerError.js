import React from 'react';

import { isEqual } from '../../services/predicates';
import './ServerError.css';
import { scrollTop } from '../../assistive functions';

/*** Component ***/
class ServerError extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: '',
      errCode: 0,
    };
  }

  /* Lifecycle Methods */
  componentDidMount() {
    scrollTop();
    if (this.props.history.location.state) {
      const { message, statusCode } = this.props.history.location.state.err;

      this.setState({
        errMsg: message,
        errCode: isEqual(statusCode, undefined) ? 500 : statusCode,
      });
    } else {
      this.setState({
        errMsg: 'Wystąpił błąd. Spróbuj ponownie później.',
        errCode: 500,
      });
    }
  }

  render() {
    return (
      <div className='serverError-outerWrapper'>
        <div className='serverError-wrapper'>
          <h1>{`Error ${this.state.errCode}`}</h1>
          <h2>{`${this.state.errMsg}`}</h2>
        </div>
      </div>
    );
  }
}

export default ServerError;
