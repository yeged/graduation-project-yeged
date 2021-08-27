import firebase, { firestore } from "./firebase/firebase";
import Ticket from "../models/Ticket";
import _ from "lodash";

// Set form inputs value to firestore
export const addTicketToDatabase = async (
  firstName,
  lastName,
  age,
  tcNo,
  address,
  application,
  applicationNo,
  isOpen,
  file
) => {
  await firestore.collection("tickets").add({
    firstName: firstName,
    lastName: lastName,
    age: age,
    tcNo: tcNo,
    address: address,
    application: application,
    applicationNo: applicationNo,
    isClosed: isOpen,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    response: "",
    file: file,
  });
};

// Get user form data from firestore that equals given application No
export const checkFormInDatabase = async (applicationNo) => {
  const formRef = firestore.collection("tickets");
  const post = [];
  const querySnapshot = await formRef
    .where("applicationNo", "==", `${_.toUpper(applicationNo)}`)
    .get();
  querySnapshot.docs.map((doc) => {
    const data = doc.data();
    post.push(
      new Ticket(
        doc.id,
        data.firstName,
        data.lastName,
        data.age,
        data.tcNo,
        data.address,
        data.application,
        data.applicationNo,
        data.isClosed,
        data.response,
        data.createdAt,
        data.respondAt,
        data.file
      )
    );
  });
  return post;
};

// Get forms from firestore those are not closed and waiting for response.
export const getOpenFormDataFromDatabase = async () => {
  const formRef = firestore.collection("tickets");
  const posts = [];
  const querySnapshot = await formRef
    .where("isClosed", "==", false)
    .orderBy("createdAt")
    .get();
  querySnapshot.docs.map((doc) => {
    const data = doc.data();
    posts.push(
      new Ticket(
        doc.id,
        data.firstName,
        data.lastName,
        data.age,
        data.tcNo,
        data.address,
        data.application,
        data.applicationNo,
        data.isClosed,
        data.response,
        data.createdAt,
        data.respondAt,
        data.file
      )
    );
  });
  return posts;
};

// Get forms from firestore those are closed and responded
export const getClosedFormDataFromDatabase = async () => {
  const formRef = firestore.collection("tickets");
  const posts = [];
  const querySnapshot = await formRef
    .where("isClosed", "==", true)
    .orderBy("respondAt", "desc")
    .get();
  querySnapshot.docs.map((doc) => {
    const data = doc.data();
    posts.push(
      new Ticket(
        doc.id,
        data.firstName,
        data.lastName,
        data.age,
        data.tcNo,
        data.address,
        data.application,
        data.applicationNo,
        data.isClosed,
        data.response,
        data.createdAt,
        data.respondAt,
        data.file
      )
    );
  });
  console.log("posts", posts);
  return posts;
};

// Respond user form as admin, close form and set firestore response.
export const responseToDatabase = async (id, response) => {
  await firestore.collection("tickets").doc(id).update({
    isClosed: true,
    respondAt: firebase.firestore.FieldValue.serverTimestamp(),
    response: response,
  });
};

// Get users form id
export const getId = async (applicationNo) => {
  const formRef = firestore.collection("tickets");

  const querySnapshot = await formRef
    .where("applicationNo", "==", `${_.toUpper(applicationNo)}`)
    .get();
  return querySnapshot.docs[0].id;
};
