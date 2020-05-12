import React, { Component } from 'react';

import { handleErrors } from '../../services/errors handling/handleErrors';
import baseFetch from '../../services/apis/baseFetch';
import {
  clearLocalStorage,
  setAnyItem as setUserId,
  getAnyItem as getUserId,
} from '../../services/localStorage';
import { setAnyItem as setAuthToken } from '../../services/localStorage';
import {
  setAnyItem as setExpiresIn,
  getAnyItem as getExpiresIn,
} from '../../services/localStorage';
import LoadingSpinner from '../low-level_components/LoadingSpinner/LoadingSpinner';
import { LogInNeeded as LogOutSuccessful } from '../conditional_components/LogInNeeded/LogInNeeded';
import { SubmitBtn as LoginBtn } from '../low-level_components/SubmitBtn/SubmitBtn';
import FormInput from '../low-level_components/FormInput/FormInput';
import { loginLink } from '../NavBar/parts/linksList';
import { startLoading, finishLoading } from '../../assistive functions';
import './Login.css';

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
    };
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.validateLoginInfoRef = React.createRef();
    this.loginSpinnerRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    if (getUserId('userId')) {
      setTimeout(() => this.props.history.goBack(), 1000);
      document.querySelector(`a[href*='${loginLink}']`).innerText = 'Zaloguj';
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
            moduleName="login"
            key={index}
            title={title}
            type={type}
            name={name}
            formValue={formValue}
            reference={reference}
            onChange={(e) => this.handleInputChange(name, e.target.value)}
          />
        );
      }
    );
  };

  /* Handlers */
  handleAutoLogout = (expiresIn) => {
    setTimeout(() => {
      if (getExpiresIn('expiresIn')) this.props.history.push('./autologout');
    }, expiresIn - Date.now());
  };

  handleInputChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
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
      finishLoading(this.loginSpinnerRef.current);

      setUserId('userId', userId);
      setAuthToken('token', token);
      setExpiresIn('expiresIn', Date.now() + expiresIn);
      this.handleAutoLogout(getExpiresIn('expiresIn'));

      this.props.history.push('./');
      document.querySelector(`a[href*='${loginLink}']`).innerText = 'Wyloguj';
    } catch ({ message }) {
      finishLoading(this.loginSpinnerRef.current);
      this.setState({ afterSubmitInfo: message }, () => {
        setTimeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });
    }
  };

  /* Render */
  render() {
    if (getUserId('userId')) {
      return <LogOutSuccessful logInText="Wylogowano prawidłowo." />;
    }

    return (
      <div className="login-outerWrapper">
        <div className="login-wrapper">
          <h1 className="login-title">{this.props.title}</h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            {this.renderLoginInputs()}
            <LoginBtn classes="loginBtn" btnText="Zaloguj">
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
              className="validate-login-info invalid"
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
