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
exports.processPost = functions.database.ref('/posts/{userID}/{postID}').onWrite(
  event => {
    const postInfo = event.data.val();
    console.log("User" + userID +" posted: " + postInfo);

    // Grab that user's friendsList
    var friendsRef = db.ref('/userInfo/{userID}/friends');
    
  }
);

//------------------------------------------------------------------------
// checkNewFriend
// Runs everytime a user adds a new friend.
// Checks to see whether that friend is a real user. If not, it deletes the friend.
//------------------------------------------------------------------------
exports.checkNewFriend = functions.database.ref('/userinfo/{userID}/friends/{friendID}/username').onWrite(
  event => {
    const newFriendUsername = event.data.val();
    console.log(newFriendUsername);

    // Check if he exists.
    var db = admin.database();
    return db.ref('/usernameToUser/' + newFriendUsername).once('value').then( snapshot => {
      if(!snapshot.val()) {
        // delete this friend because he doesn't really exist.
        event.data.ref.parent.remove();
      } else {
        // this is a legit friend.
      }
    });
  }
);
