   # Installation de LAMP

Une connexion internet est nécessaire pour effectuer l'installation de LAMP sur un système LINUX UBUNTU.

Installer les packages avec la commande suivante :
> sudo apt install apache2 php libapache2-mod-php mysql-server php-mysql

Description des paquets :

- Le paquet apache2 installe le serveur HTTP Apache2.
- Le paquet php méta-paquet permet d'installer un interpréteur PHP.
- Le paquet libapache2-mod-php est module d'Apache.
- Le paquet mysql-server installe le serveur de base de données MySQL.
- Le paquet php-mysql installe les module permettant d'utiliser MySQL avec PHP.

Une fois les paquet installés, ouvrez un des liens suivants dans votre navigateur, si le message "It's works!" s'affiche, votre serveur LAMP est correctement installé et prêt à être configuré :

```ruby
    http://127.0.0.1/
    http://localhost
```

Exemple de configuration pour une application nommé 'www.essai.fr' :


- Dans le fichier /etc/hosts/ rajouter à la suite des première ligne cette suivante :

```ruby
    127.0.0.1    www.essai.fr
```

Dans le dossier /etc/apache2/sites-available/ créé un fichier www.essai.fr.conf et inscrivez-y :
```ruby
    <VirtualHost *:80>
    ServerName    www.essai.fr
    ServerAdmin    webmaster@localhost
    DocumentRoot    /srv/www/www.essai.fr/public_html
    </VirtualHost>
```
Puis dans le dossier /srv/www/ créé un dossier www.essai.fr dans lequel vous rajouterez le dossier 'public_html' qui contiendra les dossier et fichier de votre application.
Ouvrez le fichier 'apache2.conf' avec la commande :
```ruby
    sudo nano /etc/apache2/apache2.conf
```

Retirer les commentaires ou apparaît :

```ruby
    <Directory /srv/www/>
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
    </Directory>
```

Activer votre *.conf avec la commande a2enconf et l'adresse complète du fichier (ci-dessus).
Activer votre site avec la commande a2ensite et le nom de domaine.
Gérer votre serveur Apache avec les commandes :

```ruby
    service apache2 status/start/restart/stop
```

Dans votre navigateur renseigner le nom de domaine www.essai.fr et votre application s'affichera dans le navigateur.

## Remarque
Ceci est une installation très simplifié permettant d'utiliser son application en local.
Toutes les démarches de sécuritée et de registration ont été omis.
