import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Header({ showComponent, visibleComponent }) {
  const { adminToken, logoutAdmin } = useContext(AuthContext);

  return (
    <header>
      <h2>BlocNote</h2>
      <br />
      {/* Boutons pour afficher différents composants */}
      {adminToken && (
        <>
          <button onClick={() => showComponent("menu")}>Afficher Dossier</button>
          <button onClick={() => showComponent("fichier")}>
            Afficher Note
          </button>
        </>
      )}
      <button
        onClick={() =>
          showComponent(visibleComponent === "connexion" ? "" : "connexion")
        }
      >
        Admin
      </button>
      <button onClick={logoutAdmin} className="adminDeconnexion">
        ❖
      </button>
    </header>
  );
}

export default Header;
