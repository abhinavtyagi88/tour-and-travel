import { createContext, useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken, userInstance) => {
    // Convert userInstance to a string and store it
    // Store token as a string 
    localStorage.setItem("token", serverToken);
    
    localStorage.setItem("user", JSON.stringify(userInstance));
  };


  return (
    <AuthContext.Provider value={{ storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};