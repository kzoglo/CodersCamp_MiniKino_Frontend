import { PureComponent, createRef } from 'react';
import { Route, withRouter } from 'react-router-dom';

import timeout from '../../services/timeout';
import localStorage from '../../services/localStorage'; 
import AutoLogoutReminder from '../AutoLogoutReminder/AutoLogoutReminder';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import routingList from '../App/routing/routingList';
import './App.css';
import { IProps, IState } from './types';
import {TimerValues} from '../../../enums';

class App extends PureComponent<IProps, IState> {
  private mainContainerRef = createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      reminder: false,
    };
  }

  /* Lifecycle Methods */
  componentDidMount() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      this.handleAutoLogout(expiresIn);
      this.handleAutoLogoutReminder(expiresIn);
    }
  }

  componentDidUpdate() {
    const expiresIn = localStorage.getItem('expiresIn');
    this.handleAutoLogoutReminder(expiresIn);
  }

  /* Assistive Methods */
  handleAutoLogout = (expiresIn: number) => {
    if (Date.now() > expiresIn) {
      localStorage.clearLocalStorage();
    } else {
      const autoLogoutRedirect = () => {
        this.props.history.push('/autologout');
      };
      const autoLogoutTimerId = timeout(autoLogoutRedirect, expiresIn - Date.now());
      localStorage.setItem('autoLogoutTimerId', autoLogoutTimerId);
    }
  };

  handleAutoLogoutReminder = (expiresIn: number) => {
    const timeToShowReminder = TimerValues.TIME_TO_SHOW_REMINDER;
    if (!expiresIn) {
      this.setState({ reminder: false });
      return;
    }
    if (Date.now() - timeToShowReminder < expiresIn) {
      const autoLogoutReminderCb = (): void => {
        this.setState({ reminder: true });
      };
      const autoLogoutReminderTimerId = timeout(
        autoLogoutReminderCb,
        expiresIn - Date.now() - timeToShowReminder
      );
      localStorage.setItem('autoLogoutReminderTimerId', autoLogoutReminderTimerId);
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

  render() {
    return (
      <>
        <NavBar />
        <div className='main-container' ref={this.mainContainerRef}>
          {this.renderRouting()}
          {this.renderAutoLogoutReminder()}
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
