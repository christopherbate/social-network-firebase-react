import React from 'react';
import AddFriend from './AddFriend';
import FriendList from './FriendList';

export default class Friends extends React.Component {
  render() {
    return (
      <div>
        <AddFriend />
        <FriendList />
      </div>
    );
  }
}
