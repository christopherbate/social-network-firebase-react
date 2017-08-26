import React from 'react';
import AddFriend from './AddFriend';
import FriendList from './FriendList';

export default class Friends extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.user.username} Friends</h2>
        <AddFriend />
        <FriendList />
      </div>
    );
  }
}
