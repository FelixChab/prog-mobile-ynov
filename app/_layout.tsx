import { Slot } from "expo-router"
import { SessionProvider } from "../components/AuthProvider"

export default function Root() {
  // Layout de l'application : enveloppée dans le Provider
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}