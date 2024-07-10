import { createContext, useContext, useState } from "react";
import createNewAuthors, {
  deleteAuthors,
  updateAuthors,
} from "../../../../lib/firebase/author/write";
import { Router, useNavigate } from "react-router-dom";
import { getAuthors } from "../../../../lib/firebase/author/read";

const AuthorFormContext = createContext();

const AuthorFormContextProvider = ({ children }) => {
  const navigation = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
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
      await createNewAuthors({ data: data, image: image });
      setIsDone(true);
      navigation("/admin/authors");
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
      await updateAuthors({ data: data, image: image });
      setIsDone(true);
      navigation("/admin/authors");
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
      await deleteAuthors(id);
      setIsDone(true);
      navigation("/admin/authors");
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
      const res = await getAuthors(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error(`No Author found from id ${id}`);
      }
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  return (
    <AuthorFormContext.Provider
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
    </AuthorFormContext.Provider>
  );
};

export const useAuthorForm = () => useContext(AuthorFormContext);

export default AuthorFormContextProvider;
