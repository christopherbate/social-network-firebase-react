import React from 'react';
import AddPost from './AddPost';
import {firebaseDB,firebaseAuth} from '../Firebase';

export default class MainFeed extends React.Component {

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
        <AddPost />
      </div>
    );
  }
}
