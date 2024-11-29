import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, View, Pressable } from "react-native";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../components/AuthProvider";

// Ecran et logique d'authentification à l'aide du AuthProvider
export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstTime, setFirstTime] = useState(false);

  const { signIn, register } = useAuth();

  // Gestion de la connexion
  const handleLogin = async (username: string, password: string) => {
    // Retour de la méthode signIn() utilisé comme erreur
    const error = signIn(username, password);
    // Si on reçois un message d'erreur lors de la connexion...
    if ((await error) === false) {
      setFirstTime(true);
      Alert.alert("Erreur", "Nom d’utilisateur ou mot de passe incorrect.");
    } else {
      // L'utilisateur existe donc se connecte, redirection
      setFirstTime(false);
      signIn(username, password);
      router.replace("/");
    }
  }

  // Gestion de l'inscription
  const handleRegister = (username: string, password: string) => {
    register(username, password);
    // On redirige l'utilisateur une fois inscrit (donc connecté)
    router.replace("/");
  }

  // Rendu composants
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace("/")} style={styles.return}>
        <Text style={styles.returnText}>Retour</Text>
      </Pressable>
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
        <Button title="Connexion" onPress={() => handleLogin(username, password)} />
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
            disabled={
              !(
                password &&
                confirmPassword &&
                username &&
                password === confirmPassword
              )
            }
            onPress={() => handleRegister(username, password)}
          />
          <Text style={{ color: "red", marginTop: 20 }}>
            Aucun utilisateur trouvé, veuillez vous inscrire.
          </Text>
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
    height: "100%",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    fontStyle: "italic",
    borderColor: "#4fbeda",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  return: {
    position: "absolute",
    top: 0,
    left: 0,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    elevation: 3,
    backgroundColor: "black",
    borderRadius: 1,
  },
  returnText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "white",
  },
})
