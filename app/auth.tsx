import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useSession } from "../components/AuthProvider";

// Ecran et logique d'authentification à l'aide du AuthProvider
export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstTime, setFirstTime] = useState(false);
  
  const { signIn, register } = useSession();

  // Gestion de la connexion
  const handleLogin = (username: string, password: string) => {
    // Car signIn() ne retourne rien sauf une erreur s'il y en a une...
    const error = signIn(username, password)

    // Si on reçois un message d'erreur lors de la connexion...
    if (error === null) {
      setFirstTime(true);
      Alert.alert("Erreur", "Nom d’utilisateur ou mot de passe incorrect.");
      console.log("[ERR] Aucun utilisateur trouvé !");
    } else {
      // L'utilisateur existe donc se connecte, redirection
      signIn(username, password);
      router.replace("/game");
    }
  }

  // Gestion de l'inscription
  const handleRegister = (username: string, password: string) => {
    register(username, password);
    router.replace("/game");
  }

  const checkPassword = (password: string, pwd: string) => {
    if (password === pwd) {
      setPassword(pwd);
    }
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
      {!firstTime ? (
        <Button title="Jouer" onPress={() => handleLogin(username, password)} />
      ) : (
        <>
          <TextInput
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            title="Inscription"
            disabled={!(password && confirmPassword && username && password === confirmPassword)}
            onPress={() => handleRegister(username, password)}
          />
          <Text style={{color: "red", marginTop: 20}}>Aucun utilisateur trouvé, veuillez vous inscrire.</Text>
        </>
      )}
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    marginBottom: 20,
    fontStyle: "italic",
    borderColor: "#4fbeda",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
})
