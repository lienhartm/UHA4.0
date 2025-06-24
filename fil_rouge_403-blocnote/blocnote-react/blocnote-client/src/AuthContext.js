import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Gérer séparément les tokens admin et utilisateur
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || "",
  );

  // Sauvegarder le token d'admin dans le localStorage
  const loginAdmin = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setAdminToken(newToken);
  };

  // Sauvegarder le token d'utilisateur dans le localStorage
  const loginUser = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setUserToken(newToken);
  };

  // Supprimer les tokens d'admin et d'utilisateur
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
  };

  useEffect(() => {
    // Au chargement initial, récupérer les tokens depuis le localStorage
    setAdminToken(localStorage.getItem("adminToken") || "");
    setUserToken(localStorage.getItem("userToken") || "");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        userToken,
        loginAdmin,
        loginUser,
        logoutAdmin,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
