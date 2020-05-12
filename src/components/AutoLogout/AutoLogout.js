import React from 'react';

import { scrollTop } from '../../assistive functions';
import { clearLocalStorage } from '../../services/localStorage';
import { loginLink } from '../NavBar/parts/linksList';
import './AutoLogout.css';

/*** Component ***/
class AutoLogout extends React.Component {
  /* Lifecycle Methods */
  componentDidMount() {
    scrollTop();
    clearLocalStorage();
    document.querySelector(`a[href*='${loginLink}']`).innerText = 'Zaloguj';
  }

  /* Render */
  render() {
    return (
      <div className="autologout-wrapper">
        <h1 className="autologout-info">Zostałeś automatycznie wylogowany.</h1>
      </div>
    );
  }
}

export default AutoLogout;
