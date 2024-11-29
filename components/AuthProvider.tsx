import React, { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { db } from "@/config/useFirebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Alert } from "react-native";
// import bcrypt from "bcryptjs";

interface User {
  id: string,
  username: string,
  password: string,
  highestScore: number
}

// Contexte d'authentification
const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<boolean>
  signOut: () => void
  register: (username: string, password: string) => Promise<boolean>
  session?: string | null
  isLoading: boolean
}>({
  signIn: async () => false,
  signOut: () => null,
  register: async () => false,
  session: null,
  isLoading: false,
})

// Accès aux infos de la session utilisateur
export function useAuth() {
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
  //const [user, setUser] = useState<User | null>(null);
  const [[isLoading, session], setSession] = useStorageState("");

  // Rendu composants
  return (
    <AuthContext.Provider
      value={{
        // Connexion
        signIn: async (username, password): Promise<boolean> => {
          try {
            const dbUsers = collection(db, "Users");
            const q = query(dbUsers,
              where("username", "==", username.toLowerCase()),
              where("password", "==", password));
            const doc = await getDocs(q);
            // L'utilisateur existe dans Firestore
            if (!doc.empty) {
              const userData = doc.docs[0].data() as User;
              const isValidPwd = password == userData.password;// await bcrypt.compare(password, userData.password);
              if (isValidPwd) return false;
              setSession(userData.id);
              return true;
            }
            return false;
          } catch (error) {
            Alert.alert("Erreur d'authentification: " + error);
            return false;
          }
        },
        // Déconnexion
        signOut: () => {
          if (session) {
            setSession(null);
          } else {
            Alert.alert("Impossible de se déconnecter : aucune session active");
            return;
          }
        },
        // Inscription
        register: async (username, password): Promise<boolean> => {
           try {
             const dbUsers = collection(db, "Users");
             const q = query(dbUsers, where("username", "==", username.toLowerCase()));
             const doc = await getDocs(q);
             // Vérifier si l'utilisateur existe déjà
             if (!doc.empty) {
               Alert.alert("Cet utilisateur existe déjà");
               return false;
             } else {
               // Ajout de l'utilisateur à Firestore
              //  const salt = await bcrypt.genSalt();
              //  const hashedPassword = await bcrypt.hash(password, salt);
              const hashedPassword = password; // not very hashed
               await addDoc(dbUsers, {
                 username: username.toLowerCase(),
                 password: hashedPassword,
                 highestScore: 0
               });
             }
             Alert.alert("Utilisateur enregistré avec succès !");
             return true;
           } catch (error) {
             Alert.alert("Erreur : " + error);
             return false;
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
