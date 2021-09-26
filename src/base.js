import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGHS0nTTLAXTCIgc28PDwKQtMdqF6aHaM",
  authDomain: "catch-of-the-day-macbook-6f967.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-macbook-6f967-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };
// this is a default export
export default base;