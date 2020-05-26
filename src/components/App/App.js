import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import timeout from '../../services/timeout';
import {
  getAnyItem as getExpiresIn,
  clearLocalStorage,
} from '../../services/localStorage';
import { setAnyItem as setAutoLogoutTimerId } from '../../services/localStorage';
import { setAnyItem as setAutoLogoutReminderTimerId } from '../../services/localStorage';
import AutoLogoutReminder from '../AutoLogoutReminder/AutoLogoutReminder';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import routingList from '../App/routing/routingList';
import './App.css';

/*** Component ***/
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reminder: false,
    };
    this.appWrapperRef = React.createRef();
    this.mainContainerRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    const expiresIn = getExpiresIn('expiresIn');
    if (expiresIn) {
      this.handleAutoLogout(getExpiresIn('expiresIn'));
      this.handleAutoLogoutReminder(expiresIn);
    }
  }

  componentDidUpdate() {
    const expiresIn = getExpiresIn('expiresIn');
    this.handleAutoLogoutReminder(expiresIn);
  }

  /* Assistive Methods */
  handleAutoLogout = (expiresIn) => {
    if (Date.now() > expiresIn) {
      clearLocalStorage();
    } else {
      const autoLogoutRedirect = () => {
        this.props.history.push('/autologout');
      };
      const autoLogoutTimerId = timeout(
        autoLogoutRedirect,
        expiresIn - Date.now()
      );
      setAutoLogoutTimerId('autoLogoutTimerId', autoLogoutTimerId);
    }
  };

  handleAutoLogoutReminder = (expiresIn) => {
    const timeToShowReminder = 300000;
    if (expiresIn && Date.now() - timeToShowReminder < expiresIn) {
      const autoLogoutReminderCb = () => {
        this.setState({ reminder: true });
      };
      const autoLogoutReminderTimerId = timeout(
        autoLogoutReminderCb,
        expiresIn - Date.now() - timeToShowReminder
      );
      setAutoLogoutReminderTimerId(
        'autoLogoutReminderTimerId',
        autoLogoutReminderTimerId
      );
    } else if (!expiresIn) {
      this.setState({ reminder: false });
    }
  };

  renderRouting = () => {
    return routingList.map(({ path, component, exact }, index) => {
      return (
        <Route key={index} path={path} exact={exact} component={component} />
      );
    });
  };

  renderAutoLogoutReminder = () => {
    if (this.state.reminder) return <AutoLogoutReminder />;
  };

  /* Render */
  render() {
    return (
      <>
        <NavBar />
        <div className="main-container" ref={this.mainContainerRef}>
          {this.renderRouting()}
          {this.renderAutoLogoutReminder()}
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
