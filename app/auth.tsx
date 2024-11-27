import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useSession } from "../components/AuthProvider";

export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { signIn } = useSession();

  // Gestion de la connexion
  const handleLogin = (username: string, password: string) => {
    const error = signIn(username, password); // Car signIn() ne retourne rien sauf une erreur s'il y en a une

    // Si on reçois un message d'erreur lors de la connexion...
    if (error === null) {
      Alert.alert("Erreur", "Nom d’utilisateur ou mot de passe incorrect.");
      console.log("[ERR] Aucun utilisateur trouvé !");
      throw new Error("Utilisateur inexistant");
    } else {
      // L'utilisateur existe donc se connecte, redirection
      signIn(username, password);
      router.replace("/game");
    }
  }

  // Ajout d'un utilisateur si inscription
    const addUser = (username: string, password: string) => {
      // TODO: ajout utilisateur
    }

  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Jouer" onPress={() => handleLogin(username, password)} />
    </View>
  );
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    margin: 0,
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    fontStyle: "italic",
  },
})
