import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import User from "./User";

function Menu({ closeMenu, onSelectComponent }) {
  const { adminToken, logoutUser } = useContext(AuthContext);

  return (
    <>
      {/*<!-- Pop-up pour la gestion de compte -->*/}
      <div id="popup-menu">
        <div className="popup-content">
          <h3>Gestion de compte</h3>
          {/*<!-- Boutons visibles uniquement lorsque l'utilisateur est connecté -->*/}
          {adminToken ? (
            <>
              <button
                id="btn-inscription"
                onClick={() => onSelectComponent("inscription")}
              >
                Créer un dossier
              </button>
              <button
                id="btn-connexion"
                onClick={() => onSelectComponent("connexion")}
              >
                Ouvrir un dossier
              </button>
              <button
                id="btn-resetdb"
                onClick={() => onSelectComponent("reset")}
              >
                Reset espace de stockage
              </button>
              <button
                id="btn-modification"
                onClick={() => onSelectComponent("modification")}
              >
                Modifier un dossier
              </button>
              <button
                id="btn-suppression"
                onClick={() => onSelectComponent("erase")}
              >
                Supprimer mon dossier
              </button>
              <button id="btn-deconnexion" onClick={logoutUser}>
                Déconnexion
              </button>
              <User />
            </>
          ) : (
            "Veuillez vous connectez à votre compte administrateur!"
          )}
          <br />
          <button id="btn-close" onClick={closeMenu}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
