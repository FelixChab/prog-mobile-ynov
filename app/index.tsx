import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Users } from '@/constants/Users';
import GameScreen from '@/components/GameScreen';
import LoginScreen from '@/components/LoginScreen';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Stack = createNativeStackNavigator();

  // Gestion de la connexion
  const handleLogin = (username: string, password: string) => {
    const user = Users.find((user) => user.name === username && user.password === password);
    // L'utilisateur existe donc se connecte
    if (user) {
      setIsAuthenticated(true);
      Alert.alert("Connexion réussie", `Bienvenue, ${user.name}!`);
      console.log(user.name + " Connecté !");
    } else {
      // TODO première connexion
      Alert.alert("Erreur", "Nom d’utilisateur ou mot de passe incorrect.");
      console.log("Aucun utilisateur trouvé !");
    }
  }

  // Rendu composants
  return (
    <>
      <View style={styles.container}>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <LoginScreen onLogin={handleLogin} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="Game"
              options={{ headerShown: false }}
              component={GameScreen}
            />
          )}
        </Stack.Navigator>
      </View>
    </>
  );
}

// Style CSS
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontWeight: "bold",
    color: "white"
  }
});