import React from 'react';

import { scrollTop } from '../../assistive functions';
import { clearLocalStorage, getItem } from '../../services/localStorage';
import './AutoLogout.css';

/*** Component ***/
class AutoLogout extends React.Component {
  /* Lifecycle Methods */
  componentDidMount() {
    scrollTop();
    clearInterval(getItem('intervalId'));
    clearLocalStorage();
  }

  render() {
    return (
      <div className='autologout-wrapper'>
        <h1 className='autologout-info'>{this.props.infoText}</h1>
      </div>
    );
  }
}

AutoLogout.defaultProps = {
  infoText: 'Zostałeś automatycznie wylogowany.',
};

export default AutoLogout;
