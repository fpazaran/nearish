import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Show a loading spinner while checking auth state
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[var(--bg_pink)]">
        <div className="text-2xl text-[var(--darker_pink)] font-medium">
          Loading...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to landing page if not authenticated
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
