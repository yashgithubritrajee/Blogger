import { AlignJustify, House, MessageCircleMore } from "lucide-react";
import React from "react";
import LoginBtn from "../LoginBtn/LoginBtn";
import AuthContextProvider from "../../../lib/context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-7 py-3 border-b">
        <Link to='/'>
        <img
          className="h-10 bg-white rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Blogger_logo.svg/2560px-Blogger_logo.svg.png"
          alt=""
        />
        </Link>
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="flex items-center gap-2 text-white">
              Home <House />
            </li>
          </Link>
        </ul>
        <AuthContextProvider>
          <LoginBtn />
        </AuthContextProvider>
      </nav>
    </>
  );
};

export default Header;
