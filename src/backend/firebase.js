import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCANuh3R0zq4ImZSCrgpIPNV8LuXEPpH3A",
  authDomain: "domain-verification-c7a75.firebaseapp.com",
  projectId: "domain-verification-c7a75",
  storageBucket: "domain-verification-c7a75.appspot.com",
  messagingSenderId: "540686031174",
  appId: "1:540686031174:web:1c8a400b4ca67c200cad47",
  measurementId: "G-JXGDDSGGLJ"
}
firebase.initializeApp(config);
const db = firebase.firestore();
var storage = firebase.storage();
const auth = firebase.auth();

export { firebase, db, auth };
