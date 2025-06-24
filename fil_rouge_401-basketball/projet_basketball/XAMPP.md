# Installation de XAMPP
Une connexion internet est nécessaire pour effectuer l'installation de LAMP sur un système LINUX UBUNTU.

Tout XAMPP tient en un seul répertoire : /opt/lampp.
Son installation est donc d'une extrême simplicité (de même que sa désinstallation = supprimer le répertoire /opt/lampp).
Sur la page https://www.apachefriends.org/fr/index.html, choisissez la version 32 ou 64 bits selon votre système d'exploitation Linux.
Modifiez les autorisations du programme d'installation et lancez-le en mode super-utilisateur :

```ruby
    cd répertoire/de/téléchargement/
    sudo chmod +x xampp-linux-*-installer.run
    sudo ./xampp-linux-*-installer.run
```
Acceptez toutes les étapes en cliquant sur Next ; pour la dernière fenêtre, cliquez sur Finish → le panneau de contrôle de XAMPP démarre.

Ouvrez l'onglet Manage Servers et cliquez sur Start All pour démarrer les serveurs.

>Pour que Xampp se lance au démarrage, lancez dans un terminal :
>
>sudo ln -s /opt/lampp/lampp /etc/init.d/lampp
>sudo update-rc.d lampp defaults



**Voici les commandes :**

- Démarrer le serveur :
```ruby
    sudo /opt/lampp/lampp start
```
- Redémarrer le serveur :
```ruby
    sudo /opt/lampp/lampp restart
```
- Sécuriser le serveur :
```ruby
    sudo /opt/lampp/lampp security
```
- Arrêter le serveur :
```ruby
    sudo /opt/lampp/lampp stop
```
- Liste des options possibles :
```ruby
    sudo /opt/lampp/lampp
```
- Lancer le panneau de contrôle :
```ruby
    sudo /opt/lampp/manager-linux-x64.run
```
Bien sûr, vous pourrez toujours utiliser ces commandes avec /opt/lampp/lampp.

**Mettre en place votre site :**

Déposer le répertoire du site dans le répertoire à cette adresse/opt/lampp/htdocs.

**Essai**

Rendez-vous sur le navigateur et connectez vous avec :

```ruby
    http://127.0.0.1/
    http://localhost
```