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
    if(user){
        createUserHelper(user.uid,email,username);
    }
  }).catch((error)=>{
    errorCB(error);
  });
}

// Get user Info funciton
export const getUserInfo = function( userInfoCallback ) {
  firebaseDB.ref('userinfo/'+firebaseAuth.currentUser.uid).once("value", (snapshot)=>{
    userInfoCallback(snapshot);
  });
}

const createUserHelper = function(uid,email,username) {
  firebase.database().ref('userinfo/'+uid).set({
    username:username,
    email:email,
    friends:null,
    posts:null
  },(error) => {
    if(error) {
      console.log(error.message);
    }
  });

  firebase.database().ref("emailToUser/"+removeDots(email)).set({
    userid:uid
  },(error) => {
    if(error) {
      console.log(error.message);
    }
  });

  firebase.database().ref("usernameToUser/"+removeDots(username)).set({
    userid:uid
  },(error) => {
    if(error) {
      console.log(error.message);
    }
  });
}

const removeDots = function(item) {
  return item.replace(/\./g,"_DOT_");
}
