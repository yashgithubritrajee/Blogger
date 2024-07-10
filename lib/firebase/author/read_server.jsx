import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllAuthor = async (id) => {

  return await getDoc(doc(db, `authors/${id}`)).then((snap) => snap.data())
  
};
