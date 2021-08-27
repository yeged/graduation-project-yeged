import firebase, { firestore } from "./firebase/firebase";

// Upload File (jgp, png, pdf) to Firebase Storage
export const uploadFileToStorage = async (id, file) => {
  const fileRef = firebase.storage().ref(`${id}/${file.name}`);
  await fileRef.put(file);
  // Set file url to firestore
  await fileRef.getDownloadURL().then((url) => {
    firestore.collection("tickets").doc(id).update({
      file: url,
    });
  });
};
