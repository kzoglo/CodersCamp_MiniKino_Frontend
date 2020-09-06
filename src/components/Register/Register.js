import React, { Component } from 'react';

import { isEqual, isLower } from '../../services/predicates';
import {
  validateEmail,
  validateCommonTextInput,
  validateSurname,
} from '../../assistive functions';
import timeout from '../../services/timeout';
import { handleErrors } from '../../services/errors handling/handleErrors';
import baseFetch from '../../services/apis/baseFetch';
import { getItem as getUserId } from '../../services/localStorage';
import LoadingSpinner from '../low-level_components/LoadingSpinner/LoadingSpinner';
import FormInput from '../low-level_components/FormInput/FormInput';
import { SubmitBtn as RegisterBtn } from '../low-level_components/SubmitBtn/SubmitBtn';
import {
  startLoading,
  finishLoading,
  enableElement as enableRegisterBtn,
  disableElement as disableRegisterBtn,
} from '../../assistive functions';

import './Register.css';

/*** Variables ***/
const classes = {
  invalid: 'invalid',
  valid: 'valid',
  neutralInput: 'neutral-input',
  invalidInput: 'invalid-input',
  cursorAuto: 'cursor-auto',
  cursorPointer: 'cursor-pointer',
};

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
      validationMsgFirstName: '',
      validationMsgLastName: '',
      validationMsgEmail: '',
      validationMsgPass: '',
      validationMsgConfirmPass: '',
      areInputsValidatedCorrectyle: false,
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
        inputRef: this.firstNameRef,
        validationMsg: this.state.validationMsgFirstName,
        validationMsgName: 'validationMsgFirstName',
      },
      {
        title: 'Nazwisko',
        name: 'lastName',
        placeholder: 'min. 3 znaki',
        formValue: this.state.lastName,
        type: 'text',
        inputRef: this.lastNameRef,
        validationMsg: this.state.validationMsgLastName,
        validationMsgName: 'validationMsgLastName',
      },
      {
        title: 'Email',
        name: 'email',
        placeholder: 'email',
        formValue: this.state.email,
        type: 'email',
        minlength: 6,
        maxlength: 40,
        inputRef: this.emailRef,
        validationMsg: this.state.validationMsgEmail,
        validationMsgName: 'validationMsgEmail',
      },

      {
        title: 'Hasło',
        name: 'pass',
        placeholder: 'min. 8 znaków',
        formValue: this.state.pass,
        type: 'password',
        minlength: 8,
        inputRef: this.passRef,
        validationMsg: this.state.validationMsgPass,
        validationMsgName: 'validationMsgPass',
      },
      {
        title: 'Potwierdź hasło',
        name: 'confirmPass',
        placeholder: 'min. 8 znaków',
        formValue: this.state.confirmPass,
        type: 'password',
        minlength: 8,
        inputRef: this.confirmPassRef,
        validationMsg: this.state.validationMsgConfirmPass,
        validationMsgName: 'validationMsgConfirmPass',
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
        inputRef,
        validationMsg,
        validationMsgName,
      }) => {
        return (
          <FormInput
            moduleName='register'
            key={title}
            title={title}
            name={name}
            placeholder={placeholder}
            formValue={formValue}
            validationVal={validationMsg}
            type={type}
            minlength={minlength}
            maxlength={maxlength}
            inputRef={inputRef}
            onChange={() =>
              this.handleInputChange(name, inputRef.current.value)
            }
            onBlur={() =>
              this.validateInput(
                title,
                inputRef.current,
                minlength,
                validationMsgName
              )
            }
          />
        );
      }
    );
  };

  negativeValidation = (inputClassList, warningText, validationMsgName) => {
    this.setState({ [validationMsgName]: warningText });
    const { neutralInput, invalidInput } = classes;
    inputClassList.replace(neutralInput, invalidInput);
  };

  positiveValidation = (inputClassList, validationMsgName) => {
    this.setState({ [validationMsgName]: '' });
    const { neutralInput, invalidInput } = classes;
    inputClassList.replace(invalidInput, neutralInput);
  };

  validateInput = (
    title,
    { name: inputName, value: inputValue, classList: inputClassList },
    minlength,
    validationMsgName
  ) => {
    let warningText;

    if (isEqual(inputName, 'email')) {
      if (validateEmail(inputValue)) {
        warningText = `Niepoprawny email.`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      } else {
        this.positiveValidation(inputClassList, validationMsgName);
      }
    } else if (isEqual(inputName, 'lastName')) {
      if (validateSurname(inputValue)) {
        warningText = `"${title}" nie może zawierać liczb oraz znaków specjalnych.`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      } else this.positiveValidation(inputClassList, validationMsgName);
    } else {
      if (isLower(inputValue.length, minlength)) {
        const polishNounForm = isEqual(minlength, 3) ? 'znaki' : 'znaków';
        warningText = `"${title}" musi mieć co najmniej ${minlength} ${polishNounForm}.`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      } else if (validateCommonTextInput(inputValue)) {
        warningText = `"${title}" nie może zawierać liczb oraz znaków specjalnych.`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      } else this.positiveValidation(inputClassList, validationMsgName);
    }
  };

  validatePass = () => {
    if (!isEqual(this.state.pass, this.state.confirmPass)) {
      const msg = 'Hasła muszą być jednakowe!';
      this.setState({ afterSubmitInfo: msg }, () => {
        timeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });

      throw new Error(msg);
    }
  };

  validateRegisterInfo = (status, errMsg) => {
    const { valid, invalid } = classes;
    const validateRegisterInfoParagraph = this.validateRegisterInfoRef.current;
    let isRegistrationSuccessful = true;
    if (isEqual(status, 201) || isEqual(status, 200)) {
      this.setState({ afterSubmitInfo: 'Zarejestrowano' });
      validateRegisterInfoParagraph.classList.replace(invalid, valid);
    } else {
      this.setState({ afterSubmitInfo: errMsg });
      isRegistrationSuccessful = false;
    }

    timeout(() => {
      this.setState({ afterSubmitInfo: '' });
      validateRegisterInfoParagraph.classList.replace(valid, invalid);
      this.dispatchToLogin(isRegistrationSuccessful);
    }, 1000);
  };

  checksDataEntirety = () => {
    let validationMsgs = [
      this.state.validationMsgConfirmPass,
      this.state.validationMsgEmail,
      this.state.validationMsgFirstName,
      this.state.validationMsgLastName,
      this.state.validationMsgPass,
    ];
    let areDataCorrect = validationMsgs.every((msg) => isEqual(msg, ''));
    if (!areDataCorrect) {
      const msg = 'Uzupełnij dane!';
      this.setState({ afterSubmitInfo: msg }, () => {
        timeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });
      throw new Error(msg);
    }
  };

  dispatchToLogin = (isRegistrationSuccessful) => {
    if (isRegistrationSuccessful && !getUserId('userId'))
      this.props.history.push('/login');
  };

  endRegister = () => {
    const { cursorAuto, cursorPointer } = classes;
    finishLoading(this.registerSpinnerRef.current);
    enableRegisterBtn(
      this.registerBtnRef.current,
      [cursorPointer],
      [cursorAuto]
    );
  };

  /* Handlers */
  handleInputChange = (stateKey, value) => {
    this.setState({ [stateKey]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { cursorAuto, cursorPointer } = classes;
    disableRegisterBtn(
      this.registerBtnRef.current,
      [cursorAuto],
      [cursorPointer]
    );
    startLoading(this.registerSpinnerRef.current);

    try {
      // Checks if all inputs are filled correectly
      this.checksDataEntirety();
      // Check password and confirmPassword equality
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
      <div className='register-outerWrapper'>
        <div className='register-wrapper'>
          <h1 className='register-title'>Rejestracja</h1>
          <form
            className='register-form'
            onSubmit={this.handleSubmit}
            ref={this.registerFormRef}
          >
            {this.renderInputs()}
            <RegisterBtn
              classes='registerBtn cursor-pointer'
              btnText='Zarejestruj'
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
              className={`validate-register-info ${classes.invalid}`}
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
