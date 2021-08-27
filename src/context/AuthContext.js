import React, { useContext, useState, createContext } from "react";
import {
  AuthState,
  signInWithFirebase,
  signOutWithFirebase,
} from "../services/useFireAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (userId, userPassword) => {
    setIsLoading(true);
    await signInWithFirebase(userId, userPassword);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await signOutWithFirebase();
    setIsLoading(false);
  };

  const [currentUser] = AuthState();

  const isLoggedIn = React.useMemo(() => !!currentUser, [currentUser]);

  const value = {
    isLoading,
    setIsLoading,
    login,
    logout,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
