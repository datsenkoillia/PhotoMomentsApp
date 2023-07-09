import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

export const writeDataToFirestore = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const writeCommentToFirestore = async (comment, postId) => {
  try {

    const postRef = doc(collection(db, `posts`), postId);
    const docRef = await addDoc(collection(postRef, "comments"), comment);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    let dataArray = [];
    const snapshot = await getDocs(collection(db, "posts"));
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
    // return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUserPostsFromFirestore = async () => {
  try {
    let dataArray = [];
    const snapshot = await getDocs(collection(db, "posts"));
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
    // return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCommentsFromFirestore = async (postId) => {
  try {
    let dataArray = [];
    const postRef = doc(collection(db, `posts`), postId);
    const snapshot = await getDocs(collection(postRef, "comments"));
    snapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, data: doc.data() });
    });

    return dataArray;
    // return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (
  collectionName,
  docId,
  updateDataObject
) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, updateDataObject);
    // console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};
