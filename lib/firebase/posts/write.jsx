/// create new posts

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Timestamp, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const createNewPosts = async ({ data, image }) => {
  if (!data?.title) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  if (!image) {
    throw new Error("Image is not selected");
  }

  const imageRef = ref(storage, `posts/${data?.slug}.png`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreref = doc(db, `posts/${data?.slug}`);
  await setDoc(firestoreref, {
    ...data,
    id: data?.slug,
    imageURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const updatePosts = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  var imageURL = data?.imageURL;
  if (image) {
    const imageRef = ref(storage, `posts/${data?.slug}.png`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  const firestoreref = doc(db, `posts/${data?.id}`);
  await updateDoc(firestoreref, {
    ...data,

    imageURL: imageURL,
    timestamp: Timestamp.now(),
  });
};

export const deletePosts = async (id) => {
  if (!id) {
    throw new Error("Id id required");
  }

  await deleteDoc(doc(db, `posts/${id}`))
};

export default createNewPosts;
