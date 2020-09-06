import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  clearLocalStorage,
  getItem as getTokenExpiration,
  setItem,
} from '../../services/localStorage';
import { getItem } from '../../services/localStorage';
import { getItem as getAutoLogoutTimerId } from '../../services/localStorage';
import { getItem as getAutoLogoutReminderTimerId } from '../../services/localStorage';
import { addClasses, modifyClasses } from '../../assistive functions';
import './AutoLogoutReminder.css';

/*** Variables ***/
const classes = {
  hide: 'hide',
  show: 'show',
  grid: 'grid',
  cursorPointer: 'cursor-pointer',
  submitBtn: 'submitBtn',
};

/*** Component ***/
class AutoLogoutReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: getTokenExpiration('expiresIn') - Date.now(),
    };
    this.wrapperRef = React.createRef();
    this.redirectWrapperRef = React.createRef();
    this.renewWrapperRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    this.countdownAutologout();
  }

  /* Assistive Methods */
  formatCountdown = () => {
    const time = Math.round(this.state.time / 1000);
    const minute = Math.floor(time / 60);
    const seconds = time - minute * 60;
    const formatedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minute}:${formatedSeconds}`;
  };

  countdownAutologout = () => {
    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { time: prevState.time - 1000 };
      });
    }, 1000);
    setItem('intervalId', intervalId);
  };

  cancelInterval = () => {
    clearInterval(getItem('intervalId'));
  };

  closeWindow = () => {
    const { hide, grid } = classes;
    this.cancelInterval();
    modifyClasses(this.wrapperRef.current, grid, hide);
  };

  renewSession = () => {
    const { hide, show } = classes;
    this.cancelInterval();
    modifyClasses(this.redirectWrapperRef.current, hide, show);
    addClasses(this.renewWrapperRef.current, hide);
  };

  agreeToRenew = () => {
    this.closeWindow();
    clearTimeout(getAutoLogoutTimerId('autoLogoutTimerId'));
    clearTimeout(getAutoLogoutReminderTimerId('autoLogoutReminderTimerId'));
    clearLocalStorage();
    this.props.history.push('/Login');
  };

  /* Render */
  render() {
    const { grid, hide, submitBtn, cursorPointer } = classes;
    return (
      <div
        className={`autoLogoutReminder-wrapper ${grid}`}
        ref={this.wrapperRef}
      >
        <div
          className='autoLogoutReminder-reminder-wrapper'
          ref={this.renewWrapperRef}
        >
          <div className='autoLogoutReminder-reminder-innerWrapper'>
            <div className='autoLogoutReminder-reminder-content'>
              <p className='autoLogoutReminder-reminder-text'>{`Za ${this.formatCountdown()} min. ${
                this.props.renewSessionText
              }`}</p>
              <button
                className={`${submitBtn} ${cursorPointer}`}
                onClick={this.renewSession}
              >
                {this.props.renewSessionBtn}
              </button>
            </div>
            <FontAwesomeIcon icon={faTimes} onClick={this.closeWindow} />
          </div>
        </div>

        <div
          className={`autoLogoutReminder-redirect-wrapper ${hide}`}
          ref={this.redirectWrapperRef}
        >
          <div className='autoLogoutReminder-redirect-innerWrapper'>
            <p>{this.props.redirectToLoginText}</p>
            <div className='autoLogoutReminder-btns-wrapper'>
              <button
                className={`${submitBtn} ${cursorPointer}`}
                onClick={this.agreeToRenew}
              >
                {this.props.agreeToRenewBtn}
              </button>
              <button
                className={`${submitBtn} ${cursorPointer}`}
                onClick={this.closeWindow}
              >
                {this.props.cancelRenewBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AutoLogoutReminder.defaultProps = {
  renewSessionText: 'zostaniesz wylogowany.',
  redirectToLoginText:
    'Teraz zostaniesz wylogowany i przeniesiony do strony logowania.',
  renewSessionBtn: 'Odnów sesję',
  agreeToRenewBtn: 'Kontynuuj',
  cancelRenewBtn: 'Przerwij',
};

export default withRouter(AutoLogoutReminder);
