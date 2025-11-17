Ceci est une api est son interface react pour un la gestion de la location de bateau pour un port (ceci est dans un contexte d'exercice).

---

# Installation

Pour installer l'api et son site qui va avec, il faut un dossier avec un espace libre de 370Mo (API + site + node module), vous pouvez télécharger le ZIP ou [clonner le dépot](https://docs.github.com/fr/repositories/creating-and-managing-repositories/cloning-a-repository) dans un dossier vide.

---

# Lancement
Pour exécuter/lancer le site en locale deux posibilité sont mises en place :
### Sous Windows
Executer le fichier 'start.bat'

A la racine ce trouve un fichier 'start.bat' qui exécutera le commande suivante :
1. `cmd /k "cd backend && npm start"`
2.  `cmd /k "cd frontend && npm start"`

La premiere lancera l'API et la seconde l'application React.

### Sous Linux
Dans un terminale executer la commande suivante : `chmod +x start.sh` puis le fichier avec `./start.sh`

A la racine ce trouve un fichier 'start.bat' qui exécutera le commande suivante :
1. `cd backend`
     -  `npm start &`
2.  `cd ../frontend`
     -  `npm start &`

La premiere lancera l'API et la seconde l'application React.

---

