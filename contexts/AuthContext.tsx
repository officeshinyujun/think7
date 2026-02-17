'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { https, User } from '@/services/https';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/services/firebase';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  googleLogin: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('think7_token');
    const savedUser = localStorage.getItem('think7_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const saveAuth = (res: { user: User; token: string }) => {
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('think7_token', res.token);
    localStorage.setItem('think7_user', JSON.stringify(res.user));
  };

  const login = async (email: string, password: string) => {
    const res = await https.auth.login(email, password);
    saveAuth(res);
  };

  const signup = async (email: string, password: string) => {
    const res = await https.auth.signup(email, password);
    saveAuth(res);
  };

  const googleLogin = async () => {
    // Firebase Google popup → get ID token → send to backend
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseToken = await result.user.getIdToken();
    const res = await https.auth.googleLogin(firebaseToken);
    saveAuth(res);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('think7_token');
    localStorage.removeItem('think7_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
