import { Button, Text, View } from "react-native"
import { useSession } from "../../components/AuthProvider"
import { router } from "expo-router";

export default function Index() {

  const { signOut } = useSession();

  // Rendu composants page
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    </View>
  )
}
