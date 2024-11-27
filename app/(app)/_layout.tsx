import { Text } from "react-native"
import { Redirect, Stack } from "expo-router"
import { useSession } from "../../components/AuthProvider"

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Chargement de la page
  if (isLoading) {
    return <Text>Loading...</Text>
  }

  // Si aucune session n'est définie
  if (!session) {
    console.log('[WARN] Aucune session active.');
    return <Redirect href={"/auth" as any} />
  }

  // Redirection par défaut
  return <Stack />
}
