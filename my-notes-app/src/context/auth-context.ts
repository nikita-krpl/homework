import { createContext, useContext } from 'react';
//import type { ReactNode } from 'react'; // Явный импорт типа

// Определяем типы прямо в файле
type User = {
  id: string;
  username?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
