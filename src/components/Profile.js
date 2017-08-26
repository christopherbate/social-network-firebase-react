import React from 'react';
import UserInfo from '../model/UserInfo';
import {getUserInfo} from '../Firebase';

export default class Profile extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      user: null
    };

    this.userInfoCallback = this.userInfoCallback.bind(this);
  }

  userInfoCallback(snapshot) {
    this.setState({
      user: new UserInfo(snapshot.child("username").val(),snapshot.child("email").val())
    });
  }

  componentDidMount() {
    getUserInfo(this.userInfoCallback)
  }

  render() {
    if(this.state.user === null) {
      return (null);
    } else {
      return (
        <div className="ProfileContainer">
          <h2> Hello, {this.state.user.username} </h2>
          <p>Email: {this.state.user.email} </p>
        </div>
      );
    }
  }
}
