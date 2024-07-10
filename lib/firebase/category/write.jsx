/// create new category

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Timestamp, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const createNewCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  if (!image) {
    throw new Error("Image is not selected");
  }

  const imageRef = ref(storage, `categories/${data?.slug}.png`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreref = doc(db, `categories/${data?.slug}`);
  await setDoc(firestoreref, {
    ...data,
    id: data?.slug,
    iconURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const updateCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  var imageURL = data?.iconURL;
  if (image) {
    const imageRef = ref(storage, `categories/${data?.slug}.png`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  const firestoreref = doc(db, `categories/${data?.id}`);
  await updateDoc(firestoreref, {
    ...data,

    iconURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("Id id required");
  }

  await deleteDoc(doc(db, `categories/${id}`))
};

export default createNewCategory;
