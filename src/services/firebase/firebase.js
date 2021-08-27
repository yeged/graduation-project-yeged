import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAV26lsyCQqlTLkwHuQAWlYki60Bkvvsv4",
  authDomain: "ticket-app-cdd29.firebaseapp.com",
  projectId: "ticket-app-cdd29",
  storageBucket: "ticket-app-cdd29.appspot.com",
  messagingSenderId: "742344899343",
  appId: "1:742344899343:web:0f9cd257e5d0a9fa105c7a",
  measurementId: "G-BEC39GMZFZ",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
