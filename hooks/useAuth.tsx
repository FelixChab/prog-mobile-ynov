import React, { useContext, useState } from 'react';
import { Users } from '@/constants/Users';

const AuthContext = React.createContext('dark');

export const useAuth = () => {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  name: string;
  password: string;
}

interface AuthContextType {
  user: User;
  signIn: (name: string, password: string) => Promise<void>;
  signout: () => void;
  register: (name: string, password: string) => Promise<void>;
  loadingRetrieve: boolean;
  isAuthenticated: boolean;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [loadingRetrieve, setOnloadingRetrieve] = useState(false);
  const isAuthenticated = useState(false);

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
    isAuthenticated
  }

  return <AuthContext.Provider value={"dark"}>{children}</AuthContext.Provider>
}
