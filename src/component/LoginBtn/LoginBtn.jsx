import React from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  const { user, isLoading, error, handelSigninWithGoogle, handelLogout } =
    useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (user) {
    return (
      <div className="flex gap-4 items-center">
        <button onClick={() => {
          handelLogout()
        }} className="flex items-center bg-black text-white font-bold px-4 py-2 rounded-full">
          Logout
        </button>
        <Link to="/admin">
          <div className="flex gap-4 rounded-xl px-3 py-2">
            <img
              className="object-cover h-12 w-12 rounded-full"
              src={user?.photoURL}
              alt=""
            />
            <div>
              <h1 className="text-xl font-bold text-white">{user?.displayName}</h1>
              <h1 className="text-sm text-gray-300" >{user?.email}</h1>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <section>
      <button
        onClick={() => {
          handelSigninWithGoogle();
        }}
        className="flex items-center  bg-white text-black font-bold px-4 py-2 rounded-full"
      >
        <img
          className="h-7"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt=""
        />
        Login With Google
      </button>
    </section>
  );
};

export default LoginBtn;
