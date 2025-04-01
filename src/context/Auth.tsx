import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { User } from "firebase/auth";

type Props = { children: React.ReactNode };

type AuthContextData = {
  user: User | null;
  signUpHandler: typeof signUpHandler;
  loginHandler: typeof loginHandler;
};

function signUpHandler(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function loginHandler(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

const AuthContext = React.createContext<AuthContextData>({
  user: null,
  signUpHandler,
  loginHandler
});


const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextData = {
    user,
    signUpHandler,
    loginHandler
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}