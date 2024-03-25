// Import des modules
import React, { useState, useEffect } from 'react';
// Modules pour la navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Module pour le stockage persistent
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import des composants
// Connexion
import LoginScreen from './components/LoginScreen';
// Page d'accueil
import HomeScreen from './components/HomeScreen'; 
// Page de création de posts
import CreatePostScreen from './components/CreatePostScreen';

// La navigation est à revoir. Ne satisfait pas mes attentes
// Constantes pour la navigation
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  // Variable d'état isLoggedIn avec valeur initiale flase et setIsLoggedIn pour mettre à jour cet état. Permet de savoir si le user est loggé.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect permet de mettre à jour en fonction de l'activité utilisateur
  useEffect(() => {
    // Fonction pour vérifier si l'utilisateur est connecté
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut de connexion : ', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    // Je n'arrive pas à conditionner le menu
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="CreatePost" component={CreatePostScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
