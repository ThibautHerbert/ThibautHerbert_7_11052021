# ThibautHerbert_7_11052021
Créer un réseau social d'entreprise :
Réalisation du Front-End et du Back-End du projet
Scénario :
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Ce projet utilise pour le Backend : Node.js avec Express et MySql2 pour la base de données, et pour le Frontend : Vue.js et Bootstrap. Pour lancer le projet : Pré-requis : Vous devez récupérer les données de la base de données MySQL ou en créer une nouvelle.

Pour lancer le projet :
    - cloner ce repository qui contient le Front-end et le Back-end : https://github.com/ThibautHerbert/ThibautHerbert_7_11052021.git

Ensuite, pour lancer le Front-end : 

    - dans le dossier cloné aller à Frontend/groupomania_cli
    - lancer la commande npm run serve

Enfin, pour lancer le Back-end : 

    - dans le dossier cloné aller à Backend/
    - lancer la commande nodemon start

Attention pour les connexions à la base de données et au serveur, vous devrez remplacer les variables d'environnement du fichier db.js et controllers/user.js, ou appliquer les données fournies dans un fichier .env pour :
    
    HOST =
    USER =
    PASSWORD =
    DATABASE =

    TOKEN = 
    TOKEN_EXPIRY = 
    CONNECTION_LIMIT
    
Droits administrateurs :
Si vous vous connectez à la base de données fournie:
Afin de tester un utilisateur avec des droits Administrateur connectez-vous avec :
email : com@groupomania.com
mot de passe : test1234

Un utilisateur avec droit d'administrateur peut modérer toutes les publications et tous les commentaires (c'est à dire cacher les éléments des autres utilisateurs). Seul cet utilisateur peut voir les publications et commentaires modérés, et il peut également choisir de retirer cette modération.

Si vous ne vous connectez pas à la base de données fournie, il faudra manipuler la base de données vous même pour permettre à un utilisateur d'être modérateur :
Table Users : isAdmin = 1
