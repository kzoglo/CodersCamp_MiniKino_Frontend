import { Component } from 'react';

import { scrollTop } from '../../../tools/utils';
import localStorage from '../../services/localStorage';
import './AutoLogout.css';
import { DefProps } from './enums';
import { IAutoLogoutProps } from './types';

class AutoLogout extends Component<IAutoLogoutProps> {
  /* Lifecycle Methods */
  componentDidMount() {
    scrollTop();
    clearInterval(localStorage.getItem('intervalId'));
    localStorage.clearLocalStorage();
  }

  render() {
    const { infoText = DefProps.INFO_TEXT } = this.props;
    return (
      <div className='autologout-wrapper'>
        <h1 className='autologout-info'>{infoText}</h1>
      </div>
    );
  }
}

export default AutoLogout;
