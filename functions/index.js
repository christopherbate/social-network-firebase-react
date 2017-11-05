//------------------------------------------------------------------------
// Index.js -- Cloud Funcitons
// Author - christopher Bate
//
// Description -- implements all the cloud functions for the back-end processing
//------------------------------------------------------------------------
const functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//------------------------------------------------------------------------
// createUserInfo
// Runs every time a new user is created, updating their basic information
// Triggers: createUserEmailEntry, createUsernameTableEntry
//------------------------------------------------------------------------
exports.createUserInfo = functions.auth.user().onCreate( event => {
  const user = event.data;
  const email = user.email;

  var db = admin.database();

  return db.ref("userinfo/"+user.uid).update({
    email:email,
    friends:null,
    posts:null
  },(error) => {
    if(error) {
      console.log(error.message);
    }
  }).then(()=>{
    console.log("createUserInfo write succeeded: " + user.email);
  });
});

//------------------------------------------------------------------------
// createUserEmailEntry
// Runs every time a user is created.
// TODO: Should run when user updates his email.
// Creates an entry in the emailToUser node that links back to the user's
// UID for reverse-lookup
// Triggers: none
//------------------------------------------------------------------------
exports.createUserEmailEntry = functions.auth.user().onCreate( event => {
  const user = event.data;
  var email = user.email;

  var db = admin.database();

  email = email.replace(/\./g,"_DOT_");

  return db.ref("emailToUser/"+email).set({
    userid:user.uid
  },(error) => {
    if(error) {
      console.log(error.message);
    }
  }).then(()=>{
    console.log("emaiToUser table update succeeded.");
  })
});

//------------------------------------------------------------------------
// createUsernameTableEntry
// Runs everytime a user changes his username or a new username is created.
// Creates an entry in the usernameToUser Table that links back to the UID
// for reverse lookup.
// Triggers: none
//------------------------------------------------------------------------
exports.createUsernameTableEntry = functions.database.ref('/userinfo/{userID}/username').onWrite( event => {

  var db = admin.database();
  var username = event.data.val();
  // TODO: first check and see if that username already exists.
  return db.ref('/usernameToUser/'+username).set({
    uid:event.params.userID
  }).then(()=>{
    console.log("usernameToUser table update succeeded.");
  });
});

//------------------------------------------------------------------------
// processPost
// Runs everytime a new post is created.
// Processes that post,creating relevant hash-tag lables and adding that post
// to relevant users' feed list
// Triggers:
//------------------------------------------------------------------------
exports.processPost = functions.database.ref('/posts/{userID}/{postID}').onCreate(
  event => {
    const postInfo = event.data.val();
    var userID = event.params.userID;
    var postID = event.params.postID;
    var author = "Friend";
    var db = admin.database();
    console.log("User" + userID +" posted: " + postInfo.content + " at " + postInfo.timeStamp);



    // Grab refs to the friends list and the user's own feed.
    var friendsRef = db.ref('/userinfo/' + userID + '/friends');
    var feedRef = db.ref('/userinfo/' + userID + '/feedList');

    // Add the post to the user's own feed.
    var userFeedListRef = feedRef.push();
    userFeedListRef.set({
      userID: userID,
      postID: postID,
      author: author,
      content: postInfo.content,
      timeStamp: postInfo.timeStamp
    });

    // Get the author username.
    db.ref('/userinfo/'+userID+'/username').once('value').then( (snapshot) => {
      author = snapshot.val();
      userFeedListRef.update({
        author:author
      });
    });

    // Perform processing on the post.

    // Add the post to the users' friends postLists
    friendsRef.once('value').then((snapshot)=> {
      snapshot.forEach( (childSnapshot) => {
        var friendID = childSnapshot.val().friendID;
        console.log("Adding post to friend: " + friendID );
        var friendFeedRef = db.ref('/userinfo/' + friendID + '/feedList');
        var newPost = friendFeedRef.push();
        newPost.set({
          userID: userID,
          postID: postID,
          author: author,
          content: postInfo.content,
          timeStamp: postInfo.timeStamp
        });
      });
    });
  }
);

//------------------------------------------------------------------------
// checkNewFriend
// Runs everytime a user adds a new friend.
// Checks to see whether that friend is a real user. If not, it deletes the friend.
//------------------------------------------------------------------------
exports.checkNewFriend = functions.database.ref('/userinfo/{userID}/newFriends/{friendID}/username').onCreate(
  event => {
    const newFriendUsername = event.data.val();
    //console.log(newFriendUsername);
    console.log("User " + event.params.userID + "adding friend: " + newFriendUsername);

    const removeDots = function(item) {
      return item.replace(/\./g,"_DOT_");
    }
    var usernameKey = removeDots(newFriendUsername)
    // Check if he exists.
    var db = admin.database();
    return db.ref('/usernameToUser/' + usernameKey).once('value').then( snapshot => {
      if(!snapshot.val()) {
        // delete this friend because he doesn't really exist.
        event.data.ref.parent.remove();
      } else {
        // this is a legit friend.
        var friendsListRef = db.ref('/userinfo/'+event.params.userID+'/friends').push();
        friendsListRef.set( {
          friendID: snapshot.val().uid,
          friendUsername: newFriendUsername
        });

        // remove the request.
        event.data.ref.parent.remove();
      }
    });
  }
);
