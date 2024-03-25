// Import des modules
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
// Module pour sélectionner un fichier
import DocumentPicker from 'react-native-document-picker';
// Module d'extraction de données d'un PDF
import pdfParser from 'pdf-parse';

const CreatePostScreen = () => {
  // Variable d'état title avec valeur initiale vide et setTitle pour mettre à jour cet état
  const [title, setTitle] = useState('');
  // Variable d'état text avec valeur initiale vide et setText pour mettre à jour cet état
  const [text, setText] = useState('');
  // Variable d'état pdfText avec valeur initiale vide et setPdfText pour mettre à jour cet état
  const [pdfText, setPdfText] = useState('');

  // Fonction pour choisir un fichier pdf
  const handleChoosePDF = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      // Récupération de l'URI
      const { uri } = res;

      // Extraction du texte du fichier PDF
      const data = await pdfParser(uri);
      const extractedText = data.text;

      // Mise à jour de la variable d'état
      setPdfText(extractedText);

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Sélection du fichier annulée');
      } else {
        console.error('Erreur lors de la sélection du fichier PDF : ', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection du fichier PDF');
      }
    }
  };

  const handleSubmit = () => {
    // Si du texte a été extrait du PDF, ajoute au texte du post
    const postText = pdfText ? `${text}\n\nTexte extrait du PDF :\n${pdfText}` : text;
    console.log('Titre du post : ', title);
    console.log('Texte du post : ', postText);
    // Ajouter ici la logique pour soumettre le post. Voir avec l'API
  };

  // Interface utilisateur du composant
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre du post"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Texte du post"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Choisir un fichier PDF" onPress={handleChoosePDF} />
      {pdfText !== '' && <Text>Texte extrait du PDF : {pdfText}</Text>}
      <Button title="Créer le post" onPress={handleSubmit} />
    </View>
  );
};

// Style css
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

export default CreatePostScreen;
