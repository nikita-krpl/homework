import { useState, useEffect  } from 'react';
import { AuthContext } from './auth-context';
import type { ReactNode } from 'react';

// Определяем тип User прямо в файле (или импортируем из другого файла)
type User = {
  id: string;
  username: string;
  email?: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      const user: User = {
        id: '1',
        username: 'admin'
      };
      
      setAuthState({
        isAuthenticated: true,
        user
      });
      
      localStorage.setItem('isUserAuth', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    localStorage.removeItem('isUserAuth');
    localStorage.removeItem('user');
  };

  // Восстановление состояния при загрузке
  useEffect(() => {
    const authStatus = localStorage.getItem('isUserAuth') === 'true';
    const userData = localStorage.getItem('user');
    
    setAuthState({
      isAuthenticated: authStatus,
      user: authStatus && userData ? JSON.parse(userData) as User : null
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};