import CategoriesFormContextProvider from "./CategoriesFormContext";

const LayoutCategory = ({ children }) => {
  return (
    <CategoriesFormContextProvider>{children}</CategoriesFormContextProvider>
  );
};

export default LayoutCategory;
