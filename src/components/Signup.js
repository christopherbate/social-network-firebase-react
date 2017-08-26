import React from 'react';

export default class Signup extends React.Component {
  render() {
    return (
      <div className="SignupContainer">

        <h2>Signup for the FB-React Social Network</h2>

        <form onSubmit={this.onSubmit.bind(this)} noValidate className="SignupForm">
          <input className="SignupForm--input" type="text" ref="username" placeholder="Username" />
          <input className="SignupForm--input" type="text" ref="email" placeholder="Your email" />
          <input className="SignupForm--input" type="password" ref="password" placeholder="Password" />
          <input className="SignupForm--input" type="password" ref="password-confirm" placeholder="Confirm Password" />
          <button className="SignupForm--button">Signup</button>
        </form>

      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
  }
}
