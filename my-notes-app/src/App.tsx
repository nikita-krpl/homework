import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import LoginPage from './pages/LoginPage';
// import NotesPage from './pages/NotesPage';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/" replace />;
// };

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
