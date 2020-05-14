import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { loginLink } from '../NavBar/parts/linksList';
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
      document.querySelector(`a[href*='${loginLink}']`).innerText = 'Zaloguj';
    } else {
      setTimeout(() => {
        window.location.assign('./autologout');
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
      <Router>
        <NavBar />
        <div className="main-container" ref={this.mainContainerRef}>
          {this.renderRouting()}
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
