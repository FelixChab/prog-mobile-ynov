import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../components/AuthProvider";
import { useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function AppLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const { session, isLoading } = useAuth();

  // Changement du statut d'authentification
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Chargement de la page
  if (isLoading) {
    return <Text>Loading...</Text>
  }

  // Si aucune session n'est définie
  if (user && !session) {
    console.log('[WARN] Aucune session active.');
    return <Redirect href={"/auth" as any} />
  }

  // Redirection par défaut
  return <Stack />
}
