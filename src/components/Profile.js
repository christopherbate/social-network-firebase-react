import React from 'react';
import UserInfo from '../model/UserInfo';
import {getUserInfo} from '../Firebase';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="ProfileContainer">
        <h2> Hello, {this.props.user.username} </h2>
        <p>Email: {this.props.user.email} </p>
      </div>
    );
  }
}
