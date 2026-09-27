import {createContext, useContext, useState } from "react";
import { loginUser } from "../services/auth-services";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('shopsphere_token')
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopsphere_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem("shopsphere_token", data.token);
    if (data.user) {
      localStorage.setItem("shopsphere_user",
        JSON.stringify(data.user))
    };
    setToken(data.token);
    setUser(data.user || null);
    return data
  };
  
  const logout = () => {
    localStorage.removeItem("shopsphere_token");
    localStorage.removeItem("shopsphere_user");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext)
}
