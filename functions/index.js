const functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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

exports.createUsernameTableEntry = functions.database.ref('/userinfo/{userID}/username').onWrite( event => {

  var db = admin.database();
  var username = event.data.val();
  return db.ref('/usernameToUser/'+username).set({
    uid:event.params.userID
  }).then(()=>{
    console.log("usernameToUser table update succeeded.");
  });

});

exports.checkNewFriend = functions.database.ref('/userinfo/{userID}/friends/{friendID}/username').onWrite(
  event => {
    const newFriendUsername = event.data.val();
    console.log(newFriendUsername);

    // Check if he exists.
    var db = admin.database();
    db.ref('/usernameToUser/' + newFriendUsername).once('value').then( snapshot => {
      if(!snapshot.val()) {
        // delete this friend because he doesn't really exist.
        event.data.ref.parent.remove();
      } else {
        // this is a legit friend.
      }
    });

    return;
  }
)
