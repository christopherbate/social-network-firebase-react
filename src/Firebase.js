import firebase from 'firebase';
import FBConfig from './FBConfig.js'


// Exported Firebase Variables
export const app = firebase.initializeApp(FBConfig);
export const isAuthorized = () => { return false; }
export const firebaseAuth = firebase.auth();
export const firebaseDB = firebase.database();
