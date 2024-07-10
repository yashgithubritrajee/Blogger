import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  const handelSigninWithGoogle = async  () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  const handelLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          isLoading,
          error,
          handelSigninWithGoogle,
          handelLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
