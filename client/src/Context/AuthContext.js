import React, { useState, useEffect, useContext, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = React.createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setIsAuthenticated(false);
      setActiveUser({});
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/private");
      setActiveUser(data.user);
      setIsAuthenticated(true);
      setConfig({
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("authToken");
      setActiveUser({});
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((user, token) => {
    localStorage.setItem("authToken", token);
    setActiveUser(user);
    setIsAuthenticated(true);
    setConfig({
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setActiveUser({});
    setIsAuthenticated(false);
    setConfig({
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
    });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ 
      activeUser, 
      setActiveUser, 
      config, 
      setConfig, 
      isAuthenticated, 
      isLoading, 
      checkAuth, 
      login, 
      logout 
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
