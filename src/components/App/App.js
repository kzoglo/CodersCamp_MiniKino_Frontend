import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import timeout from '../../services/timeout';
import {
  getAnyItem as getExpiresIn,
  clearLocalStorage,
} from '../../services/localStorage';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import routingList from '../App/routing/routingList';
import './App.css';

/*** Component ***/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.appWrapperRef = React.createRef();
    this.mainContainerRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    if (getExpiresIn('expiresIn'))
      this.handleAutoLogout(getExpiresIn('expiresIn'));
  }

  /* Assistive Methods */
  handleAutoLogout = (expiresIn) => {
    if (Date.now() > expiresIn) {
      clearLocalStorage();
    } else {
      timeout(() => {
        this.props.history.push('/autologout');
      }, expiresIn - Date.now());
    }
  };

  renderRouting = () => {
    return routingList.map(({ path, component, exact }, index) => {
      return (
        <Route key={index} path={path} exact={exact} component={component} />
      );
    });
  };

  /* Render */
  render() {
    return (
      <>
        <NavBar />
        <div className="main-container" ref={this.mainContainerRef}>
          {this.renderRouting()}
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
