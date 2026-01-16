import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import LandingPage from './pages/connect-flow/LandingPage';

// Protected pages
import HomePage from './pages/connect-flow/HomePage';
import CreateJoinPage from './pages/connect-flow/CreateJoinPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          
          {/* Catch all - redirect to landing or home based on auth */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
