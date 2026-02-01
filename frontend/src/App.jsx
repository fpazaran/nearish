import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './contexts/UserContext';

// Public pages
import LandingPage from './pages/connect-flow/LandingPage';

// Protected pages
import HomePage from './pages/connect-flow/HomePage';
import CreateJoinPage from './pages/connect-flow/CreateJoinPage';
import EnterNamePage from './pages/connect-flow/EnterNamePage';
import CreateCodePage from './pages/connect-flow/CreateCodePage';
import EnterCodePage from './pages/connect-flow/EnterCodePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-join" 
              element={
                <ProtectedRoute>
                  <CreateJoinPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/enter-name" 
              element={
                <ProtectedRoute>
                  <EnterNamePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-code" 
              element={
                <ProtectedRoute>
                  <CreateCodePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/enter-code" 
              element={
                <ProtectedRoute>
                  <EnterCodePage />
                </ProtectedRoute>
              } 
            />
            {/* Catch all - redirect to landing or home based on auth */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
