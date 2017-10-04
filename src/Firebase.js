import firebase from 'firebase';
import FBConfig from './FBConfig.js';
import UserInfo from './model/UserInfo';


// Exported Firebase Variables
export const app = firebase.initializeApp(FBConfig);
export const isAuthorized = () => {return !!firebase.auth().currentUser }
export const firebaseAuth = firebase.auth();
export const firebaseDB = firebase.database();

// Signup user.
export const createFBUser = function(email,password,username,errorCB) {
  firebase.auth().createUserWithEmailAndPassword(email,password).then( (user) => {

    // TODO: Cloud function
    if(user){
        // Set the user's username.
        firebaseDB.ref('userinfo/'+user.uid).update({username:username});
    }
  }).catch((error)=>{
    errorCB(error);
  });
}

// Login User
export const loginFBUser = function(email,password,errorCB) {
  firebaseAuth.signInWithEmailAndPassword(email,password).catch( (error) => {
      errorCB(error);
    });
}

export const addPost = function( postMessage ) {
  var newPostRef = firebaseDB.ref('/posts/'+firebaseAuth.currentUser.uid).push();
  // TODO: we need to move time tracking to the server...
  var date = Date.now();
  newPostRef.set({
    "timeStamp":date,
    "content":postMessage
  });
}

export const getPosts = function() {

}

const removeDots = function(item) {
  return item.replace(/\./g,"_DOT_");
}
