/// create new author

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Timestamp, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const createNewAuthors = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }

  if (!image) {
    throw new Error("Image is not selected");
  }

  const id =  doc(collection(db, 'ids')).id ;   

  const imageRef = ref(storage, `authors/${id}.png`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreref = doc(db, `authors/${id}`);
  await setDoc(firestoreref, {
    ...data,
    id: id,
    photoURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const updateAuthors = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
 
  var imageURL = data?.photoURL;
  if (image) {
    const imageRef = ref(storage, `authors/${data?.id}.png`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  const firestoreref = doc(db, `authors/${data?.id}`);
  await updateDoc(firestoreref, {
    ...data,

    photoURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const deleteAuthors = async (id) => {
  if (!id) {
    throw new Error("Id id required");
  }

  await deleteDoc(doc(db, `authors/${id}`))
};

export default createNewAuthors;
