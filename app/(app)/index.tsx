import { Button, Text, View } from "react-native"
import { useSession } from "../../components/AuthProvider"

export default function Index() {

  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Vous êtes connecté.</Text>
      <Button
        title="Déconnexion"
        onPress={() => {
          // TODO: rediriger vers Authentification etc
          signOut();
        }}
      />
    </View>
  )
}
