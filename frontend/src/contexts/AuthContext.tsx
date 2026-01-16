import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, User, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

type AuthContext = {
  currentUser: User | null;
  loading: boolean;
  handleSignInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function handleSignInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      // currentUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Sign in error:", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      // currentUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, handleSignInWithGoogle, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
