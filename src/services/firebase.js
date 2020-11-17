import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import firebaseConfig from "../commons/auth/firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const credentialFirebase = (token) => {
  const result = firebase.auth.GoogleAuthProvider.credential(token);
  firebase.auth().signInWithCredential(result).then(res => {
    console.log(res)
  })
  return result
}
export const firebaseAppAuth = firebaseApp.auth();
export const rootRef = firebaseApp.database();
export const signInWithGoogle = () => {
  return firebaseAppAuth.signInWithPopup(provider)
};
