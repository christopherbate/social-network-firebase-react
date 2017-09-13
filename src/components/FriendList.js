import React from 'react';

export default class FriendList extends React.Component {

  renderFriends() {
    if(this.props.friends) {
      return this.props.friends.map( friend => (<p key={friend.username}>{friend.username}</p>));
    }
  }

  render() {
    return (
      <div>
        <h3>Friend List</h3>
        {this.renderFriends()}
      </div>
    );
  }
}
