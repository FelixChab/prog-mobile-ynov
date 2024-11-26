import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Users } from "../constants/Users";
import { Alert } from "react-native";

export default function LoginScreen({ onLogin }: { onLogin: (username: string, password: string) => void }, authenticated: boolean) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Gestion de la connexion
  const handleLogin = (username: string, password: string) => {
    const user = Users.find(
      (user) => user.name === username && user.password === password
    )
    // L'utilisateur existe donc se connecte
    if (user) {
      setIsAuthenticated(true)
      Alert.alert("Connexion réussie", `Bienvenue, ${user.name}!`)
      console.log(user.name + " Connecté !")
    } else {
      // TODO première connexion
      Alert.alert("Erreur", "Nom d’utilisateur ou mot de passe incorrect.")
      console.log("Aucun utilisateur trouvé !")
    }
    return isAuthenticated
  }

  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
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
      <Button
        title={authenticated ? "Connexion" : "Inscription"}
        onPress={() => onLogin(username, password)}
      />
    </View>
  )
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
