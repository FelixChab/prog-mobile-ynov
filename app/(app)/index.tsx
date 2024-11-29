import { Button, Text, View } from "react-native"
import { useAuth } from "../../components/AuthProvider"
import { router } from "expo-router";
import { useStorageState } from "../../hooks/useStorageState";
import React from "react";

export default function Index() {
  const [session, setSession] = useStorageState("");
  const { signOut } = useAuth();

  // Rendu composants page
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{
        fontSize: 100,
        textAlign: "center",
        justifyContent: "center",
        margin: 0,
        marginBottom: 10
      }}>I HAVE A MOUTH SO I MUST SCREAM</Text>
      {session ? (
        <>
          <Text style={{ color: "green", marginBottom: 10, marginTop: 0 }}>
            Vous êtes connecté !
          </Text>
          <br></br>
          <Button
            title="Jouer"
            onPress={() => {
              router.replace("/game")
            }}
            color="red"
          />
          <br></br>
          <Button
            title="Leaderboard"
            onPress={() => {
              router.replace("/leaderboard")
            }}
            color="green"
          />
          <br></br>
          <Button
            title="Déconnexion"
            onPress={() => {
              signOut()
              router.replace("/auth")
            }}
          />
        </>
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
  )
}
