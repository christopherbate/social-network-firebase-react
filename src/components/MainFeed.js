import React from 'react';
import AddPost from './AddPost';
import {firebaseDB,firebaseAuth} from '../Firebase';
import PostFeed from './PostFeed';

export default class MainFeed extends React.Component {

  render() {
    return (
      <div>
        <AddPost />
        <PostFeed friendsList={this.props.friendsList} postList={this.props.postList} />
      </div>
    );
  }
}
