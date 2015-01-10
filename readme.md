# Planning offline
Ceci est une démonstration  de ce qui peut être fait rapidement en mode pur web : 

 * un design adaptatif 
 * une compatibilité large : IE10+, opera, chrome, safari, firefox
 * un fonctionnement complètement hors ligne : tout est stocké en local, qu'il s'agisse des fichiers de l'application ou des données
 


## Installation
  
 1. installez nodejs
 2. `npm install -g bower grunt grunt-cli`
 3.  Clonez ou téléchargez ce dossier
 4. `npm install && bower install && grunt serve:dist`

 Vous pouvez maintenant accéder url de votre machine + port 9000 depuis un pc ou un smartphone
 
 
## Installation sur le smartphone
Ouvrez la page et ajoutez le favoris à l'écran d'accueil. 

La prochaine fois que vous lancerez l'applicaiton en cliquant sur ce raccourcis plutôt qu'en accédant à l'url,elle se lancera en mode application, quasiment indifferenciable d'une application native.

## Ce qui est faisable en restant en web
* stocker de gros volumes de données ( de l'ordre de plusieurs centaines de Mo)
* utiliser un stockage structuré : websql ou indexedb, notamment

## ce qui n'est pas faisable pour l'instant en mode pur web
* une alerte alors que l'application est fermé (type réveil)
* une synchronisation sans que l'application ne soit ouverte

Les serviceworker devraient permettrent de résoudre ces problématiques, mais ne seront vraisemblablement pas répondus avant 6 à 12 mois.
