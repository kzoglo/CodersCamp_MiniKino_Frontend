import React, { Component } from 'react';

import timeout from '../../services/timeout';
import { handleErrors } from '../../services/errors handling/handleErrors';
import baseFetch from '../../services/API/v1/baseFetch';
import {
  clearLocalStorage,
  setItem as setUserId,
  getItem as getUserId,
} from '../../services/localStorage';
import { setItem as setAuthToken } from '../../services/localStorage';
import {
  setItem as setExpiresIn,
  getItem as getExpiresIn,
} from '../../services/localStorage';
import {
  setItem as setAutoLogoutTimerId,
  getItem as getAutoLogoutTimerId,
} from '../../services/localStorage';
import { getItem as getAutoLogoutReminderTimerId } from '../../services/localStorage';
import LoadingSpinner from '../low-level components/LoadingSpinner/LoadingSpinner';
import { LogInNeeded as LogOutSuccessful } from '../conditional components/LogInNeeded/LogInNeeded';
import { SubmitBtn as LoginBtn } from '../low-level components/SubmitBtn/SubmitBtn';
import FormInput from '../low-level components/FormInput/FormInput';
import {
  startLoading,
  finishLoading,
  disableElement as disableLoginBtn,
  enableElement as enableLoginBtn,
} from '../../assistive functions';
import './Login.css';

/*** Variables ***/
const classes = {
  cursorPointer: 'cursor-pointer',
  cursorAuto: 'cursor-auto',
};

/*** Component ***/
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      afterSubmitInfo: '',
      autoLogoutTimerId: '',
      isLoggedIn: false,
    };
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.validateLoginInfoRef = React.createRef();
    this.loginSpinnerRef = React.createRef();
    this.loginBtnRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    if (getUserId('userId')) {
      this.setState({ isLoggedIn: true });
      timeout(() => {
        this.props.history.goBack();
      }, 1000);
      clearTimeout(getAutoLogoutTimerId('autoLogoutTimerId'));
      clearTimeout(getAutoLogoutReminderTimerId('autoLogoutReminderTimerId'));
      clearLocalStorage();
    } else {
      this.emailRef.current.focus();
    }
  }

  /* Assistive Methods */
  renderLoginInputs = () => {
    const loginData = [
      {
        title: 'E-mail',
        name: 'email',
        formValue: this.state.email,
        type: 'email',
        reference: this.emailRef,
      },
      {
        title: 'Hasło',
        name: 'pass',
        formValue: this.state.pass,
        type: 'password',
        reference: this.passRef,
      },
    ];

    return loginData.map(
      ({ title, name, formValue, type, reference }, index) => {
        return (
          <FormInput
            moduleName='login'
            key={index}
            title={title}
            type={type}
            name={name}
            formValue={formValue}
            inputRef={reference}
            onChange={(e) => this.handleInputChange(name, e.target.value)}
          />
        );
      }
    );
  };

  endLogin = () => {
    const { cursorAuto, cusorPointer } = classes;
    finishLoading(this.loginSpinnerRef.current);
    enableLoginBtn(this.loginBtnRef.current, [cusorPointer], [cursorAuto]);
  };

  /* Handlers */
  handleAutoLogout = (expiresIn) => {
    const autoLogoutRedirect = () => {
      if (expiresIn) this.props.history.push('/autologout');
    };
    const autoLogoutTimerId = timeout(
      autoLogoutRedirect,
      expiresIn - Date.now()
    );
    setAutoLogoutTimerId('autoLogoutTimerId', autoLogoutTimerId);
  };

  handleInputChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { cursorAuto, cusorPointer } = classes;
    disableLoginBtn(this.loginBtnRef.current, [cursorAuto], [cusorPointer]);
    startLoading(this.loginSpinnerRef.current);

    const loginData = {
      email: this.state.email,
      password: this.state.pass,
    };

    try {
      const resp = await baseFetch({
        path: 'api/login',
        body: JSON.stringify(loginData),
        method: 'POST',
      });

      handleErrors(resp.status);
      const { token, userId, expiresIn } = await resp.json();
      this.endLogin();

      setUserId('userId', userId);
      setAuthToken('token', token);
      setExpiresIn('expiresIn', Date.now() + expiresIn);
      this.handleAutoLogout(getExpiresIn('expiresIn'));

      this.props.history.push('/');
    } catch ({ message }) {
      this.endLogin();
      this.setState({ afterSubmitInfo: message }, () => {
        timeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return <LogOutSuccessful logInText='Wylogowano prawidłowo.' />;
    }
    const { cursorPointer } = classes;

    return (
      <div className='login-outerWrapper'>
        <div className='login-wrapper'>
          <h1 className='login-title'>{this.props.title}</h1>
          <form className='login-form' onSubmit={this.handleSubmit}>
            {this.renderLoginInputs()}
            <LoginBtn
              classes={`loginBtn ${cursorPointer}`}
              btnText='Zaloguj'
              reference={this.loginBtnRef}
            >
              <LoadingSpinner
                reference={this.loginSpinnerRef}
                classes={{
                  outerWrapper: 'login-spinner-outerWrapper',
                  spinner: 'login-spinner',
                }}
              />
            </LoginBtn>
            <p
              ref={this.validateLoginInfoRef}
              className='validate-login-info invalid'
            >
              {this.state.afterSubmitInfo}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  title: 'Zaloguj',
};

export default Login;
