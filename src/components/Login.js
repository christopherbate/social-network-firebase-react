import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="SignupContainer">

        <h2>Login to the FB-React Social Network</h2>

        <form onSubmit={this.onSubmit.bind(this)} noValidate className="SignupForm">
          <input className="SignupForm--input" type="text" ref="email" placeholder="Your email" />
          <input className="SignupForm--input" type="password" ref="password" placeholder="Password" />
          <button className="SignupForm--button">Login</button>
        </form>

      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
  }
}
