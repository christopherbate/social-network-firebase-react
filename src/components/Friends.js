//------------------------------------------------------------------------
// Friends.js
// Author: Christopher Bate
// Description: Renders the Friends View
// Friends View consists of an "Add Friend" component and a list of friends.
// Right now, this component is directly listening to the current user's
// friends list and provindg updates to the components.
// Updates its error state by providing a callback
// TODO: Change these callbacks to promises.
//------------------------------------------------------------------------
import React from 'react';
import AddFriend from './AddFriend';
import FriendList from './FriendList';
import {firebaseDB, firebaseAuth} from '../Firebase';

export default class Friends extends React.Component {
  renderFriendsList() {
    if(this.props.friendsList) {
      return(<FriendList friends={this.props.friendsList} />);

    } else {
      return(<FriendList friends={null} />);
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.user.username} Friends</h2>
        <AddFriend />
        {this.renderFriendsList()}
      </div>
    );
  }
}
