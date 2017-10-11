import React from 'react';
import AddPost from './AddPost';
import {firebaseDB,firebaseAuth} from '../Firebase';
import PostFeed from './PostFeed';
import RecommendFeed from './RecommendFeed';
import '../styles/MainFeed.css';

export default class MainFeed extends React.Component {

  render() {
    return (
      <div className = "FeedContainer">
        <AddPost />
        <PostFeed friendsList={this.props.friendsList} postList={this.props.postList} />
        <RecommendFeed />
      </div>
    );
  }
}
