//------------------------------------------------------------------------
// Friends.js
// Author: Christopher Bate
// Description: Renders the Friends View
// Friends View consists of an "Add Friend" component and a list of friends.
// Right now, this component is directly listening to the current user's
// friends list and provindg updates to the components.
// TODO: Information for the application state possibly could be transferred
//        to a central store a'la REDUX.  More to follow.
// Updates its error state by providing a callback
// TODO: Change these callbacks to promises.
//------------------------------------------------------------------------
import React from 'react';
import AddFriend from './AddFriend';
import FriendList from './FriendList';
import {firebaseDB, firebaseAuth} from '../Firebase';

export default class Friends extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      friendsList:[]
    };
  }

  renderFriendsList() {
    if(this.state.friendsList) {
      return(<FriendList friends={this.state.friendsList} />);

    } else {
      return(<FriendList friends={null} />);
    }
  }

  componentDidMount() {
    this.friendsListener = firebaseDB.ref('userinfo/' + firebaseAuth.currentUser.uid+'/friends/').orderByChild("username")
    .on("value", snapshot=> {
      let friendsList = [];
      snapshot.forEach( child => {
        friendsList.push({username:child.val().username});
      });
      this.setState({friendsList:friendsList});
    });
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
