import React from 'react';
import {createFBUser} from '../Firebase';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    // bind the callback.
    this.handleErrorCallback = this.handleErrorCallback.bind(this);
  }

  render() {
    return (
      <div className="SignupContainer">

        <h2>Signup for the FB-React Social Network</h2>

        <form onSubmit={this.onSubmit.bind(this)} noValidate className="SignupForm">
          <input className="SignupForm--input" type="text" ref="username" placeholder="Username" />
          <input className="SignupForm--input" type="text" ref="email" placeholder="Your email" />
          <input className="SignupForm--input" type="password" ref="password" placeholder="Password" />
          <input className="SignupForm--input" type="password" ref="passwordconfirm" placeholder="Confirm Password" />
          <button className="SignupForm--button">Signup</button>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderError() {
    if(this.state.error) {
      return(<p>{this.state.error}</p>);
    }

    return null;
  }

  handleErrorCallback(error) {
    this.setState({
      error:("Error: " + error.code + ": " + error.message)
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let username = this.refs.username.value.trim();
    let passwordConfirm = this.refs.passwordconfirm.value.trim();

    if(password === passwordConfirm) {
      createFBUser(email,password,username,this.handleErrorCallback);
    } else {
      this.setState( {
        error:"Passwords do not match"
      });
    }
  }
}
