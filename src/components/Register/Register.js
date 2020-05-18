import React, { Component } from 'react';

import timeout from '../../services/timeout';
import { handleErrors } from '../../services/errors handling/handleErrors';
import baseFetch from '../../services/apis/baseFetch';
import { isEqual, isInequal } from '../../services/predicates';
import { getAnyItem as getUserId } from '../../services/localStorage';
import LoadingSpinner from '../low-level_components/LoadingSpinner/LoadingSpinner';
import FormInput from '../low-level_components/FormInput/FormInput';
import { SubmitBtn as RegisterBtn } from '../low-level_components/SubmitBtn/SubmitBtn';
import {
  startLoading,
  finishLoading,
  enableElement as enableRegisterBtn,
  disableElement as disableRegisterBtn,
} from '../../assistive functions';
import { validateInput } from './parts/assistive functions';
import './Register.css';

/*** Component ***/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      confirmPass: '',
      afterSubmitInfo: '',
    };
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.confirmPassRef = React.createRef();
    this.validateRegisterInfoRef = React.createRef();
    this.registerSpinnerRef = React.createRef();
    this.registerBtnRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    this.firstNameRef.current.focus();
  }

  /* Assistive Methods */
  renderInputs = () => {
    const inputsData = [
      {
        title: 'Imię',
        name: 'firstName',
        placeholder: 'min. 3 znaki',
        formValue: this.state.firstName,
        type: 'text',
        reference: this.firstNameRef,
      },
      {
        title: 'Nazwisko',
        name: 'lastName',
        placeholder: 'min. 3 znaki',
        formValue: this.state.lastName,
        type: 'text',
        reference: this.lastNameRef,
      },
      {
        title: 'Email',
        name: 'email',
        placeholder: 'email',
        formValue: this.state.email,
        type: 'email',
        reference: this.emailRef,
      },

      {
        title: 'Hasło',
        name: 'pass',
        placeholder: 'min. 8 znaków',
        formValue: this.state.pass,
        type: 'password',
        minlength: 8,
        reference: this.passRef,
      },
      {
        title: 'Potwierdź hasło',
        name: 'confirmPass',
        placeholder: 'min. 8 znaków',
        formValue: this.state.confirmPass,
        type: 'password',
        minlength: 8,
        reference: this.confirmPassRef,
      },
    ];

    return inputsData.map(
      ({
        title,
        name,
        formValue,
        type,
        placeholder,
        minlength = 3,
        maxlength,
        reference,
      }) => {
        return (
          <FormInput
            moduleName="register"
            key={title}
            title={title}
            name={name}
            placeholder={placeholder}
            formValue={formValue}
            type={type}
            minlength={minlength}
            maxlength={maxlength}
            reference={reference}
            onChange={(e) => this.handleInputChange(name, e.target.value)}
            onBlur={(e) => validateInput(e.target, minlength)}
          />
        );
      }
    );
  };

  validatePass = () => {
    if (isInequal(this.state.pass, this.state.confirmPass)) {
      this.setState({ afterSubmitInfo: 'Hasła muszą być jednakowe!' }, () => {
        timeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });

      throw new Error('Different passwords!');
    }
  };

  validateRegisterInfo = (status, errMsg) => {
    const validateRegisterInfoParagraph = this.validateRegisterInfoRef.current;
    let isRegistrationSuccessful = true;
    if (isEqual(status, 201) || isEqual(status, 200)) {
      this.setState({ afterSubmitInfo: 'Zarejestrowano' });
      validateRegisterInfoParagraph.classList.replace('invalid', 'valid');
    } else {
      this.setState({ afterSubmitInfo: errMsg });
      isRegistrationSuccessful = false;
    }

    timeout(() => {
      this.setState({ afterSubmitInfo: '' });
      validateRegisterInfoParagraph.classList.replace('valid', 'invalid');
      this.dispatchToLogin(isRegistrationSuccessful);
    }, 1000);
  };

  dispatchToLogin = (isRegistrationSuccessful) => {
    if (isRegistrationSuccessful && !getUserId('userId'))
      this.props.history.push('/login');
  };

  endRegister = () => {
    finishLoading(this.registerSpinnerRef.current);
    enableRegisterBtn(
      this.registerBtnRef.current,
      ['cursor-pointer'],
      ['cursor-auto']
    );
  };

  /* Handlers */
  handleInputChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    disableRegisterBtn(
      this.registerBtnRef.current,
      ['cursor-auto'],
      ['cursor-pointer']
    );
    startLoading(this.registerSpinnerRef.current);

    // Checks password length
    try {
      this.validatePass();
    } catch (err) {
      this.endRegister();
      return;
    }

    // Creates new user
    try {
      const userData = {
        name: this.state.firstName,
        surname: this.state.lastName,
        email: this.state.email,
        password: this.state.pass,
        confirmPassword: this.state.confirmPass,
      };

      const { status } = await baseFetch({
        path: 'api/user',
        body: JSON.stringify(userData),
        method: 'POST',
      });

      handleErrors(status);

      this.endRegister();
      this.validateRegisterInfo(status);
    } catch ({ statusCode, message }) {
      this.endRegister();
      this.validateRegisterInfo(statusCode, message);
    }
  };

  /* Render */
  render() {
    return (
      <div className="register-outerWrapper">
        <div className="register-wrapper">
          <h1 className="register-title">Rejestracja</h1>
          <form
            className="register-form"
            onSubmit={this.handleSubmit}
            ref={this.registerFormRef}
          >
            {this.renderInputs()}
            <RegisterBtn
              classes="registerBtn cursor-pointer"
              btnText="Zarejestruj"
              reference={this.registerBtnRef}
            >
              <LoadingSpinner
                reference={this.registerSpinnerRef}
                classes={{
                  outerWrapper: 'registerSpinner-outerWrapper',
                  spinner: 'registerSpinner',
                }}
              />
            </RegisterBtn>
            <p
              ref={this.validateRegisterInfoRef}
              className="validate-register-info invalid"
            >
              {this.state.afterSubmitInfo}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
