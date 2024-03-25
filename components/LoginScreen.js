// Import des modules
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
// Import du module Axios pour effectuer des requêtes HTTP
import axios from 'axios';
// Import du module AsyncStorage pour stocker des données localement
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import pour la navigation
import { useNavigation } from '@react-navigation/native';

// Composant LoginScreen
const LoginScreen = () => {
    const navigation = useNavigation();

    // Variable d'état email avec valeur initiale vide et setEmail pour mettre à jour cet état
    const [email, setEmail] = useState('');
    // Variable d'état password avec valeur initiale vide et setPassword pour mettre à jour cet état
    const [password, setPassword] = useState('');

    // Fonction handleLogin, asyn pour définir une fonction asynchrone
    const handleLogin = async () => {
        try {
            // Effectue une requête POST vers l'URL avec les données email et password
            // Pour l'instant l'ipv4 est en dure mais devra être dynamique
            const response = await axios.post('http://192.168.0.138:8000/login_check', {
                email: email,
                password: password
            });

            // Stocke le token dans AsyncStorage
            await AsyncStorage.setItem('token', response.data.token);

            // Afficher un message de succès
            Alert.alert('Félicitations', 'Connexion réussie');

            // Redirection vers la page d'acceuil
            // Ne marche pas, navigation à revoir
            // navigation.navigate('Home');

        } catch (error) {
            // Afficher un message d'erreur et afficher l'erreur dans la console
            Alert.alert('Error', 'Email ou mot de passe invalide');
            console.error('Login failed:', error);
        }       
    };

    // Interface utilisateur du composant
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

// Styles css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

// Export du composant LoginScreen pour être utilisé ailleurs
export default LoginScreen;