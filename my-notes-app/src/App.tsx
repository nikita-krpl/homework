import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { NotesProvider } from './context/Notes/NotesProvider';
import LoginPage from './pages/LoginPage';
import { NotesPage } from './pages/NotesPage';

import type { ReactNode } from 'react'; // Добавляем импорт для типа children
import { useAuth } from '../src/hooks/useAuth'; // Правильный путь к хуку

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          { <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          /> }
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
