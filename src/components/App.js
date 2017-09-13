//------------------------------------------------------------------------
// App.js
// Author: Christopher Bate
// Description: Contains the root React component for the application.
// This component is loaded by index.js in the /src/ directory
// Upon loading, establishes listener to firebaseAuth object
// Renders the entire navigation bar, and below it, the various views depending
// on the route.
//------------------------------------------------------------------------

// Framework Imports
import React, { Component } from 'react';
import {Link,Switch,Route} from 'react-router-dom';

// Local style / resource imports
import logo from '../logo.svg';
import '../styles/App.css';

// App-specific imports
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
      user: null,
      friendsList: []
    };
  }

  componentDidMount() {

    // Mount listeners for things we need to track:
    // 1) Auth state
    // 2) User friends
    // 3) PostIDs on the User's "Main Feed"

    // Auth state.
    // On authStateChanged returns the funciton to remove the listener.
    this.removeListener = firebaseAuth.onAuthStateChanged( (user) => {
      if(user) {
        firebaseDB.ref('userinfo/'+ user.uid).on('value', (snapshot) => {
          console.log("User logged in: " + user.uid)
          this.setState({
            user:snapshot.val()
          });

          // Set the listener for User friends
          firebaseDB.ref('userinfo/' + firebaseAuth.currentUser.uid+'/friends/').orderByChild("username")
          .on("value", snapshot=> {
            let friendsList = [];
            snapshot.forEach( child => {
              friendsList.push({username:child.val().username});
            });
            this.setState({friendsList:friendsList});
          });

          // Set the listener for postList
          firebaseDB.ref('userinfo/' + firebaseAuth.currentUser.uid + '/feedList/').orderByChild("timeStamp")
          .on( "value", snapshot=> {
            let postList = [];
            snapshot.forEach( child => {
              postList.push({content:child.val().content});
            });
            this.setState({postList:postList});
          });
        });
      } else {
        console.log("User status null / logged out");
        this.setState({
          user:null
        });
      }
    });


  }

  componentWillUnmount() {
    // Remove Listeners from componentDidMount/
    // Auth state
    this.removeListener();

    // Friends
    firebaseDB.ref('userinfo/'+firebaseAuth.currentUser.uid+'/friends/').off();

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
          <PrivateRoute user={this.state.user} friendsList={this.state.friendsList} exact path="/friends" component={Friends} />
          <PrivateRoute user={this.state.user} friendsList={this.state.friendsList}
                        postList={this.state.postList} exact path="/main" component={MainFeed} />
          <PrivateRoute user={this.state.user} exact path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
