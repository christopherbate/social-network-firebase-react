//---------------------------------------------------------------------------
// PostContainer.js
// Author: Christopher Bate
// PostContainer Component
// Displays all post information
// Props required: friendsList, postList
//----------------------------------------------------------------------=====
import React from 'react';
//import {firebaseDB} from '../Firebase';

export default class PostContainer extends React.Component {

  render() {
    return (
      <div className="PostContainer">
        <div className="PostContainer--Title">
          <p>Post by: {this.props.post.author}</p>
        </div>
        <div className="PostContainer--Body">
          <p>Content: {this.props.post.content}</p>
          <p>Date: </p>
        </div>
      </div>
    );
  }
}
