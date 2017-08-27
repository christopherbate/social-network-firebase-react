import React, { Component } from 'react';
import {Link,Switch,Route} from 'react-router-dom';
import logo from '../logo.svg';
import '../styles/App.css';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {firebaseAuth,firebaseDB} from '../Firebase';

// Components
import Splash from './Splash';
import Friends from './Friends';
import MainFeed from './MainFeed';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

// Models
import UserInfo from '../model/UserInfo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth.onAuthStateChanged( (user) => {
      if(user) {
        firebaseDB.ref('userinfo/'+ user.uid).on('value', (snapshot) => {
          this.setState({
            user:snapshot.val()
          });
        });
      } else {
        this.setState({
          user:null
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  onLogout() {
    firebaseAuth.signOut().then( function() {
      // Sign out successful
    }).catch( (error) =>{
      // Error Occured.
      console.log(error.errorMessage);
    });
  }

  renderLogout() {
    if(firebaseAuth.currentUser) {
      return(<a className="HeaderNav--Logout" onClick={this.onLogout}>Logout</a>)
    }
    else {
      return null;
    }
  }

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
            {this.renderLogout()}
          </nav>
        </div>
        <Switch>
          <PublicRoute exact user={this.state.user} path="/" component={Splash} />
          <PublicRoute exact user={this.state.user} path="/signup" component={Signup} />
          <PublicRoute exact user={this.state.user} path="/login" component={Login} />
          <PrivateRoute user={this.state.user} exact path="/friends" component={Friends} />
          <PrivateRoute user={this.state.user} exact path="/main" component={MainFeed} />
          <PrivateRoute user={this.state.user} exact path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
