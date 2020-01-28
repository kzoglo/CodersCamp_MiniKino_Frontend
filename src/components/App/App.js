import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Display from '../Display/Display';
import Footer from '../Display/footer/Footer';
import HomePage from '../Display/homePage/HomePage';
import Contact from '../Display/contact/Contact';
import Register from '../Display/register/Register';
import Login from '../Display/login/Login';
import MyTickets from '../tickets/myTickets/MyTickets';
import PriceList from '../Display/priceList/PriceList';
import Reservation from '../tickets/reservation/Reservation';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <div className="ui container">
            <Display />
            <Route
              path="/CodersCamp_MiniKino_Frontend"
              exact
              component={HomePage}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/contact"
              exact
              component={Contact}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/register"
              exact
              component={Register}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/login"
              exact
              component={Login}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/mytickets"
              exact
              component={MyTickets}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/pricelist"
              exact
              component={PriceList}
            />
            <Route
              path="/CodersCamp_MiniKino_Frontend/reservation"
              exact
              component={Reservation}
            />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
