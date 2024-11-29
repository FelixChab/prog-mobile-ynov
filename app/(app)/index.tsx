import { Button, Text, View } from "react-native"
import { useAuth } from "../../components/AuthProvider"
import { router } from "expo-router";
import { useStorageState } from "../../hooks/useStorageState";
import React from "react";

export default function Index() {
  const [[isLoading, session], setSession] = useStorageState("");
  const { signOut } = useAuth();

  // Rendu composants page
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {session ? (
        <>
          <Text style={{ color: "green", marginBottom: 10 }}>Vous êtes connecté !</Text>
          <Button
            title="Jouer"
            onPress={() => {
              console.log("Lancement du jeu...");
              router.replace("/game");
            }}
            color="red"
          />
          <Button
            title="Déconnexion"
            onPress={() => {
              console.log("Déconnexion...")
              signOut();
              router.replace("/auth");
            }}
          />
        </>
      ) : (
          <>
            <Text style={{ color: "red", marginBottom: 10 }}>Vous n'êtes pas connecté, veuillez vous authentifier :</Text>
            <Button
              title="Authentification"
              onPress={() => {
                router.replace("/auth");
              }}
            />
          </>
      ) }
      
    </View>
  )
}
