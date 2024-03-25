// Import des modules
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// Import du module AsyncStorage pour stocker des données localement
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import pour la navigation
import { useNavigation } from '@react-navigation/native';

// Composant HomeScreen
const HomeScreen = () => {
    const navigation = useNavigation();

    // Variable d'état post avec valeur initiale tableau vide et setPosts pour mettre à jour cet état
    const [posts, setPosts] = useState([]);

    // useEffect permet de mettre à jour en fonction de l'activité utilisateur
    useEffect(() => {
      // Fonction pour récupérer les 5 derniers posts
      const fetchPosts = async () => {
        try {
          // Requête HTTP Get asynchrone
          // Pour l'instant l'ipv4 est en dure mais devra être dynamique
          const response = await fetch('http://192.168.0.138:8000/posts');
          // Récupération des données du json
          const data = await response.json();
          // Garder uniquement les 5 derniers éléments
          const latestPosts = data.slice(-5).reverse(); // Inverser l'ordre des éléments
          setPosts(latestPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
    // Appel de la fonction car asynchrone
    fetchPosts();
    },[]);

    // Affichage des posts
    const renderPostItem = ({ item }) => (
      <View style={styles.postContainer}>
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <Text>{item.content}</Text>
        <Text>
          Par : {item.user[0].firstname} {item.user[0].lastname}
        </Text>
      </View>
    );

    // Button de déconnexion. A mettre dans un autre composant. Etait en test içi
    // const handleLogout = async () => {
    //   // Supprimer le token d'authentification de AsyncStorage
    //   await AsyncStorage.removeItem('token');

    //   // Rediriger vers l'écran de connexion
    //   // Ne marche pas
    //   // navigation.navigate("Login");
    // };

    // Interface utilisateur du composant
    return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Button de deconnexion en test içi */}
      {/* <Button title="Déconnexion" onPress={handleLogout} /> */}
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    );
};

// Styles css
const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
