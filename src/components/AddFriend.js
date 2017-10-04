import React from 'react';
import {firebaseDB,firebaseAuth} from '../Firebase';

export default class AddFriend extends React.Component {
  render() {
    return (
      <div>
        <h3>Add a Friend</h3>
        <form className="AddFriendForm" noValidate onSubmit={this.addFriend.bind(this)}>
          <input className="AddFriendForm--input" type="text" ref="username" placeholder="friend's username" />
          <button className="AddFriendForm--button">Add Friend</button>
        </form>
      </div>
    );
  }

  addFriend(e){
    const removeDots = function(item) {
      return item.replace(/\./g,"_DOT_");
    }
    e.preventDefault();
    var newFriendsRef = firebaseDB.ref('userinfo/'+firebaseAuth.currentUser.uid+'/newFriends/').push();
    newFriendsRef.set({
      username: this.refs.username.value.trim()
    });
    this.refs.username.value = "";
  }
}
