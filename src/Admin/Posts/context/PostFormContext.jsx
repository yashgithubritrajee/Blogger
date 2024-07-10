import { createContext, useContext, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import createNewPosts, { deletePosts, updatePosts } from "../../../../lib/firebase/posts/write";
import { getPosts } from "../../../../lib/firebase/posts/read";

const PostsFormContext = createContext();

const PostsFormContextProvider = ({ children }) => {
  const navigation = useNavigate();

  const [data, setData] = useState({
    // title: "",
    // slug: "",
    // content:"",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [image, setImage] = useState(null);

  const handelData = (key, value) => {
    setIsDone(false);
    setData({
      ...data,
      [key]: value,
    });
  };

  const handelCreate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await createNewPosts({ data: data, image: image });
      setIsDone(true);
      navigation("/admin/posts");
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  const handelUpdate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await updatePosts({ data: data, image: image });
      setIsDone(true);
      navigation("/admin/posts");
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  const handelDelete = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await deletePosts(id);
      setIsDone(true);
      navigation("/admin/posts");
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  const fetchData = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      const res = await getPosts(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error(`No Posts found from id ${id}`);
      }
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  return (
    <PostsFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        isDone,
        handelData,
        handelCreate,
        image,
        setImage,
        fetchData,
        handelUpdate,
        handelDelete,
      }}
    >
      {children}
    </PostsFormContext.Provider>
  );
};

export const usePostsForm = () => useContext(PostsFormContext);

export default PostsFormContextProvider;
