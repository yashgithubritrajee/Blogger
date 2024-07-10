import AuthContextProvider from "../../../lib/context/AuthContext";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <section className="flex">
      <AuthContextProvider>
        <SideBar/>
        {children}
      </AuthContextProvider>
    </section>
  );
};

export default Layout;
