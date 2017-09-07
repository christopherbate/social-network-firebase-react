//------------------------------------------------------------------------
// Splash.js
// Author: Christopher Bate
// Description: Renders the "splash screen", which consists  of just
//    signup and login buttons.
//------------------------------------------------------------------------

import React from 'react';

import {Link} from 'react-router-dom';

export default class Splash extends React.Component {
  render() {
    return (
      <div className="SplashContainer">
        <h2 className="SplashHeader">Welcome!</h2>
        <Link className="SplashButton" to="/login"> Login </Link> <br/>
        <Link className="SplashButton" to="/signup"> Signup </Link>
      </div>
    );
  }
}
