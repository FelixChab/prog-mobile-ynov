import React, { useContext, useState } from 'react';
import { Users } from '@/constants/Users';

interface User {
  name: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<User>(Users[1]);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [loadingRetrieve, setOnloadingRetrieve] = useState(false);

  // Connexion
  const signIn = async (name: string, password: string) => {
    console.log("Connexion de " + { name } + " en cours...");
    return;
  }

  // Inscription
  const register = async (name: string, password: string) => {
    setName(name);
    setPassword(password);
    console.log("Inscription de " + { name } + " en cours...");
    return;
  }

  const signout = () => {
    setUser(null);
    console.log("Déconnexion de " + { name } + " en cours...");
    return;
  }

  const value = {
    user,
    signIn,
    signout,
    register,
    loadingRetrieve,
  }

  return (
    <AuthContext.Provider value={Users[1]}>{children}</AuthContext.Provider>
  )
}
