//----------------------------------------------------------------------
// Auther: Christopher Bate
// Description: AddPost Component
// Adds a post to the currentUser's post set
//----------------------------------------------------------------------
import React from 'react';
import {firebaseDB, addPost} from '../Firebase';


export default class AddPost extends React.Component {
  constructor(props) {
    super(props);
  }

  submitPost(e) {
    e.preventDefault();
    addPost(this.refs.message.value);
  }

  render() {
    return (
      // Renders a posting form
      <div className="AddPost">
        <h3 className="AddPostTitle">Add Post</h3>
        <form onSubmit={this.submitPost.bind(this)}>
          <textarea cols="25" rows="7" ref="message"></textarea>
          <br/>
          <button>Post</button>
        </form>
      </div>
    );
  }
}
