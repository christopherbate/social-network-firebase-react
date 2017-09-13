//---------------------------------------------------------------------------
// PostFeed.js
// Author: Christopher Bate
// PostFeed Component
// Displays latest posts by the user and all his/her friends
//----------------------------------------------------------------------=====
import React from 'react';
import {firebaseDB} from '../Firebase';

export default class PostFeed extends React.Component {

  renderPosts() {
  
  }

  render() {
    return (
      <div className="PostFeed">
        {this.renderPosts()}
      </div>
    );
  }
}
