import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../components/AuthProvider";
import { useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function AppLayout() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const { session, isLoading } = useAuth();

  // Chargement de la page
  if (isLoading) {
    return <Text>Loading...</Text>
  }

  // Si aucune session n'est définie
  if (user && !session) {;
    return <Redirect href={"/auth" as any} />
  }

  // Redirection par défaut
  return <Stack screenOptions={{ headerShown: false }}/>
}
