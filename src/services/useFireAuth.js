import { useEffect, useState } from "react";
import firebase from "./firebase/firebase";

// Sign in Auth
export const signInWithFirebase = async (userId, userPassword) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(`${userId}@admin.com`, userPassword);
};

// Sign Out
export const signOutWithFirebase = async () => {
  await firebase.auth().signOut();
};

// If sign in currentUser has value. Sign out currentUser = null.
export const AuthState = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) setCurrentUser(user.uid);
    });

    return unsubscribe;
  }, []);

  return [currentUser];
};
