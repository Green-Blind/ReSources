# Prérequis :
- Un compte expo
- Un appareil ou émulateur Android.
- nodejs
- Les conteneurs du projet https://github.com/PierreWTH/ResRel doivent tourner

/!\ Cela ne fonctionne par avec iOS.\n
/!\ Les ipv4 pour se connecter à l'API sont en dures. Il faudra les modifier manuellement.

# Dans le répertoire :
## Etape 1 : installation des modules
Depuis un Bash :
`npm i`
Pour installer les modules

## Etape 2 : se connecter avec son compte Expo
Depuis un Bash :
`eas login`

## Etape 3 : créer un build de dev
Depuis un Bash :
`eas build --profile development --platform android`

Si vous utilisez un émulateur il est possible de directement l'installer sur celui-ci.\n
Vérifier que l'application n'existe pas déjà sur l'émulateur et que celui-ci est bien lancé.

Si toutefois cette étape a été passée et que vous souhaitez l'installer tout de même sur votre émulateur, effectuez la commande suivante :
`eas build:run`

## Etape 4 : lancer expo
Depuis un Bash :
`npx expo start --dev-client`