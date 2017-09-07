//------------------------------------------------------------------------
// Login.js
// Author: Christopher Bate
// Description: Renders login view, handles form submission by
// calling the loginFBUser method from our Firebase Social Network framework file
// Updates its error state by providing a callback
// TODO: Change these callbacks to promises.
//------------------------------------------------------------------------

import React from 'react';
import {loginFBUser} from '../Firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error:null
    }

    this.handleErrorCallback = this.handleErrorCallback.bind(this);
  }

  render() {
    return (
      <div className="SignupContainer">

        <h2>Login to the FB-React Social Network</h2>

        <form onSubmit={this.onSubmit.bind(this)} noValidate className="SignupForm">
          <input className="SignupForm--input" type="text" ref="email" placeholder="Your email" />
          <input className="SignupForm--input" type="password" ref="password" placeholder="Password" />
          <button className="SignupForm--button">Login</button>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderError() {
    if(this.state.error) {
      return(<p>{this.state.error.message}</p>);
    }
  }

  handleErrorCallback(error){
    if(error){
      this.setState({
        error: error
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    loginFBUser(email,password,this.handleErrorCallback);
  }
}
