
# Roue des Choix

La Roue des Choix est une application web interactive qui permet aux utilisateurs de saisir une liste de choix et de paramètres pour que la roue sélectionne aléatoirement une option parmi celles entrées. Ce projet est construit avec JavaScript pour le front-end, utilisant HTML et CSS pour le design, tandis que la technologie du back-end reste à NodeJs.

## Fonctionnalités

- **Entrée Utilisateur :** Permet aux utilisateurs d'entrer plusieurs choix et de configurer des paramètres spécifiques pour la roue.
- **Sélection Aléatoire :** Sur la base des entrées et des paramètres, la roue sélectionne aléatoirement un choix.
- **Interface Responsive :** Conçue pour fonctionner sur des appareils de toutes tailles, des smartphones aux ordinateurs de bureau.

## Technologies Utilisées

- **Front-end :** JavaScript, HTML, CSS
- **Back-end :** Node.Js
- **Base de donnée :** NodeJs

## Prérequis

Avant de commencer, assurez-vous d'avoir installé Node.js sur votre système, car il est nécessaire pour le développement du front-end en JavaScript.
Le back-end sera lui aussi en Node.js.

## Installation

1. **Cloner le dépôt :**

```bash
git clone https://github.com/Akvir03/RoueDesChoix
cd roue-des-choix
```

2. **Installer les dépendances :**

Pour le front-end :

JavaScript / CSS natif

Pour le back-end :

```bash
cd backend
npm install
```

Pour la BDD : 

- Télécharger mongosh sur : https://downloads.mongodb.com/compass/mongosh-2.2.1-win32-x64.zip
- Ajouter mongosh.exe dans ses variables d'environnement et modifier le uri par le sien.


## Lancement de l'Application

Pour démarrer le serveur front-end :

JavaScript / CSS natif

Pour la base de donnée:
```bash
mongosh
```
Copier son uri dans le backend.js

Pour le back-end:
```bash
cd backend
npm run start
```

## L'équipe:

- Product Owner & Analyste Dev : DEVIENNE Nathan
- Scrum Master & Dev : HURDEBOURCQ Paul
- Lead Dev front-end : MASSIAS Théo
- Lead Dev back-end : AMZIL Marwane
