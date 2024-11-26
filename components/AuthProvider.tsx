import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { Users } from "../constants/Users";

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("");

  return (
    <AuthContext.Provider
      value={{
        signIn: (username, password) => {
          const user = Users.find((user) => user.name === username && user.password === password);
          if (!user) {
            // TODO: gestion erreur si l'utilsateur n'existe pas
            return null;
          } else {
            setSession(user.id);
          } 
        },
        signOut: () => {
          if (session) {
            setSession(null);
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
