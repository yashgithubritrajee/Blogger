import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllPosts = async () => {

  return await getDocs(collection(db, "posts")).then((snaps) =>
    snaps.docs.map((d) => d.data())
  );
};


export const getPosts = async (id) => {
    return await getDoc(doc(db, `posts/${id}`)).then((snap) => snap.data())
  };