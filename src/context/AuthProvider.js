import React, { createContext, useState } from "react";

const AuthProvider = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    loginStatus: false,
  });

  // logout function to clear the user from state
  const logout = () => {
    setUser(null);
  };

  // Set user data if user creds are correct, otherwise we set it as null
  //This method get called in Login Component
  const login = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const AuthContext = createContext();
