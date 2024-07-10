import { createContext, useContext, useState } from "react";
import createNewCategory, { deleteCategory, updateCategory } from "../../../../lib/firebase/category/write";
import { getCategory } from "../../../../lib/firebase/category/read";
import { Router, useNavigate } from "react-router-dom";

const CategoryFormContext = createContext();



const CategoriesFormContextProvider = ({ children }) => {

const navigation = useNavigate()

  const [data, setData] = useState({
    name: "",
    slug: "",
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
      await createNewCategory({ data: data, image: image });
      setIsDone(true);
      navigation('/admin/categories')
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
      await updateCategory({ data: data, image: image });
      setIsDone(true);
      navigation('/admin/categories')
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
      await deleteCategory(id);
      setIsDone(true);
      navigation('/admin/categories')
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
      const res = await getCategory(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error(`No Category found from id ${id}`);
      }
    } catch (error) {
      setError(error?.mesaage);
    }
    setIsLoading(false);
  };

  return (
    <CategoryFormContext.Provider
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
    </CategoryFormContext.Provider>
  );
};

export const useCategoryForm = () => useContext(CategoryFormContext);

export default CategoriesFormContextProvider;
