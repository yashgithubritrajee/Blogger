import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllCategory = async (id) => {

  return await getDoc(doc(db, `categories/${id}`)).then((snap) => snap.data())
  
};
