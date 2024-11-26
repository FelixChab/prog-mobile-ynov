import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({onLogin}: {onLogin: (username: string, password: string) => void}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Rendu composants
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Se connecter"
        onPress={() => onLogin(username, password)}
      />
    </View>
  )
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontWeight: "bold",
    color: "black"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  }
});