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
