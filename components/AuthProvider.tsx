import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { Users } from "../constants/Users";
import * as Crypto from "expo-crypto";

// Contexte d'authentification
const AuthContext = createContext<{
  signIn: (username: string, password: string) => void
  signOut: () => void
  register: (username: string, password: string) => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  register: () => null,
  session: null,
  isLoading: false
});

// Accès aux infos de la session utilisateur
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

// Provider des informations de la session
export function SessionProvider({ children }: PropsWithChildren) {

  const [[isLoading, session], setSession] = useStorageState("");

  // Rendu composants
  return (
    <AuthContext.Provider
      value={{
        // Connexion
        signIn: (username, password) => {
          const user = Users.find((user) => user.name === username && user.password === password);
          if (!user) {
            console.log("[ERR] signIn() - Utilisateur introuvable")
            return null;
          } else {
            setSession(user.id);
          } 
        },
        // Déconnexion
        signOut: () => {
          if (session) {
            setSession(null);
          } else {
            // TODO: gestion Erreur
            console.log("[ERR] signOut() - aucune session");
            throw new Error("Can't sign out : no existing session");
          }
        },
        // Inscription
        register: (username, password) => {
          const user = Users.find((user) => user.name === username && user.password === password);
          if (!user) {
            const newId = (Users.length + 1).toString(); // Nouvel ID (à vérif)
            //const crypto = Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, newId);
            const newUser = {
              id: newId,
              name: username,
              password: password,
              highestScore: 0 // Aucun highest score car pas encore joué
            }
            Users.push(newUser);
          } else {
            // TODO: gestion erreur
            console.log("[ERR] register() - l'utilisateur existe déjà");
            throw new Error("Can't register new user, user already exists");
          }
        },
        session,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
