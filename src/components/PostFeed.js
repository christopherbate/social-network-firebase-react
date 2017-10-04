//---------------------------------------------------------------------------
// PostFeed.js
// Author: Christopher Bate
// PostFeed Component
// Displays latest posts by the user and all his/her friends
// Props required: friendsList, postList
//----------------------------------------------------------------------=====
import React from 'react';
import {firebaseDB} from '../Firebase';
import PostContainer from './PostContainer';

export default class PostFeed extends React.Component {

  renderPosts() {
    if( this.props.postList ) {
      return this.props.postList.map( post => (<PostContainer post={post}/>));
    } else {
      return (
        <p>No new posts.</p>
      );
    }
  }

  render() {
    return (
      <div className="PostFeedContainer">
        {this.renderPosts()}
      </div>
    );
  }
}
