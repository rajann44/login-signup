import React, { createContext, useState } from "react";

const AuthProvider = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // login function to set the user in state
  const login = (userData) => {
    setUser(userData);
  };

  // logout function to clear the user from state
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const AuthContext = createContext();
