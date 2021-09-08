import { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import localStorage from '../../services/localStorage';
import { addClasses, modifyClasses } from '../../../tools/utils';
import './AutoLogoutReminder.css';
import { IProps, IState } from './types';
import {DefProps} from './enums';
import { ClassesToManipulate } from '../../../enums';

class AutoLogoutReminder extends Component<IProps, IState> {
  private wrapperRef = createRef<HTMLDivElement>();
  private redirectWrapperRef = createRef<HTMLDivElement>();
  private renewWrapperRef = createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      time: localStorage.getItem('expiresIn') - Date.now(),
    };
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
    localStorage.setItem('intervalId', intervalId);
  };

  cancelInterval = () => {
    clearInterval(localStorage.getItem('intervalId'));
  };

  closeWindow = () => {
    const { HIDE, GRID } = ClassesToManipulate;
    this.cancelInterval();
    modifyClasses(this.wrapperRef.current, GRID, HIDE);
  };

  renewSession = () => {
    const { HIDE, SHOW } = ClassesToManipulate;
    this.cancelInterval();
    modifyClasses(this.redirectWrapperRef.current, HIDE, SHOW);
    addClasses(this.renewWrapperRef.current, HIDE);
  };

  agreeToRenew = () => {
    this.closeWindow();
    clearTimeout(localStorage.getItem('autoLogoutTimerId'));
    clearTimeout(localStorage.getItem('autoLogoutReminderTimerId'));
    localStorage.clearLocalStorage();
    this.props.history.push('/Login');
  };

  render() {
    const {
      agreeToRenewBtn = DefProps.AGREE_TO_RENEW_BTN,
      renewSessionText = DefProps.RENEW_SESSION_TEXT,
      renewSessionBtn = DefProps.RENEW_SESSION_BTN,
      redirectToLoginText = DefProps.REDIRECT_TO_LOGIN_TEXT,
      cancelRenewBtn = DefProps.CANCEL_RENEW_BTN,
    } = this.props;
    const { HIDE, GRID, SUBMIT_BTN, CURSOR_POINTER } = ClassesToManipulate;
    return (
      <div
        className={`autoLogoutReminder-wrapper ${GRID}`}
        ref={this.wrapperRef}
      >
        <div
          className='autoLogoutReminder-reminder-wrapper'
          ref={this.renewWrapperRef}
        >
          <div className='autoLogoutReminder-reminder-innerWrapper'>
            <div className='autoLogoutReminder-reminder-content'>
              <p className='autoLogoutReminder-reminder-text'>{`Za ${this.formatCountdown()} min. ${
                renewSessionText
              }`}</p>
              <button
                className={`${SUBMIT_BTN} ${CURSOR_POINTER}`}
                onClick={this.renewSession}
              >
                {renewSessionBtn}
              </button>
            </div>
            <FontAwesomeIcon icon={faTimes} onClick={this.closeWindow} />
          </div>
        </div>

        <div
          className={`autoLogoutReminder-redirect-wrapper ${HIDE}`}
          ref={this.redirectWrapperRef}
        >
          <div className='autoLogoutReminder-redirect-innerWrapper'>
            <p>{redirectToLoginText}</p>
            <div className='autoLogoutReminder-btns-wrapper'>
              <button
                className={`${SUBMIT_BTN} ${CURSOR_POINTER}`}
                onClick={this.agreeToRenew}
              >
                {agreeToRenewBtn}
              </button>
              <button
                className={`${SUBMIT_BTN} ${CURSOR_POINTER}`}
                onClick={this.closeWindow}
              >
                {cancelRenewBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AutoLogoutReminder);
