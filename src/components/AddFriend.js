import React from 'react';

export default class AddFriend extends React.Component {
  render() {
    return (
      <div>
        <h3>Add a Friend</h3>
        <form className="AddFriendForm" noValidate onSubmit={this.addFriend.bind(this)}>
          <input className="AddFriendForm--input" type="text" ref="friendName" />
          <button className="AddFriendForm--button">Add Friend</button>
        </form>
      </div>
    );
  }

  addFriend(e){
    e.preventDefault();
  }
}
