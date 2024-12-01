import { Button, Pressable, Text, View } from "react-native"
import { useAuth } from "../../components/AuthProvider"
import { router } from "expo-router";
import { useStorageState } from "../../hooks/useStorageState";
import React from "react";
import { StyleSheet } from "react-native";

export default function Index() {
  const [session, setSession] = useStorageState("");
  const { signOut, user } = useAuth();

  // Gestion de la déconnexion
  const handleSignOut = () => {
    signOut();
    router.replace("/auth");
    setSession(null);
  }

  // Rendu composants page
  return (
    <View style={style.background}>
      <Text style={style.title}>I HAVE A MOUTH SO I MUST SCREAM</Text>
      <Text style={style.welcomeText}>Welcome {user}</Text>
      {session ? (
        <View style={style.buttonContainer}>
          <Pressable
            onPress={() => {
              router.replace("/game");
            }}
            style={style.button}
          >
            <Text style={style.buttonText}>Play</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.replace("/leaderboard");
            }}
            style={style.button}
          >
            <Text style={style.buttonText}>Leaderboard</Text>
          </Pressable>
          <Pressable style={style.logoutButton} onPress={() => { handleSignOut()}}>
            <Text style={style.logoutButtonText}>Log out</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={{ color: "red", marginBottom: 10 }}>
            Vous n'êtes pas connecté, veuillez vous authentifier :
          </Text>
          <Button
            title="Authentification"
            onPress={() => {
              router.replace("/auth")
            }}
          />
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black"
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
    margin: "5%",
    marginBottom: 10,
    color: "white"
  },
  button: {
    padding: 10,
    margin: 5,
    borderColor: "white",
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: 800,
    fontSize: 20
  },
  logoutButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderWidth: 2,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "black",
    fontWeight: 800,
    fontSize: 20
  },
  welcomeText: {
    fontSize: 20,
    color: "white"
  },
  buttonContainer: {
    margin: "5%",
    flex: 1,
    width: "40%"
  }
});
