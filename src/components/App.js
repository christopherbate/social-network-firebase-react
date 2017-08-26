import React, { Component } from 'react';
import {Link,Switch,Route} from 'react-router-dom';
import logo from '../logo.svg';
import '../styles/App.css';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Components
import Splash from './Splash';
import Friends from './Friends';
import MainFeed from './MainFeed';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>FB-React Social Network</h2>
          <nav className="HeaderNav">
          <Link className="HeaderNav--Link" to="/">SplashPage</Link>
          <Link className="HeaderNav--Link" to="/login">Login</Link>
          <Link className="HeaderNav--Link" to="/signup">Signup</Link>
          <Link className="HeaderNav--Link" to="/friends">Friends</Link>
          <Link className="HeaderNav--Link" to="/main">MainFeed</Link>
          <Link className="HeaderNav--Link" to="/profile">MyProfile</Link>
          </nav>
        </div>
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/main" component={MainFeed} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
