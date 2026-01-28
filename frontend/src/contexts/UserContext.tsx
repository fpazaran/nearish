import { Couple, Invite, User } from "../types/user.ts";
import { createContext, useContext, useState, useEffect } from "react";
import { getMe, updateName as updateNameApi } from "../api/backend/auth.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type UserContext = {
  uid: string | undefined;
  name: string;
  couple: Couple | undefined;
  loading: boolean; // Add loading state
  inviteCode?: Invite;
  setMe: (me: User) => void;
  setCouple: (couple: Couple) => void;
  setInviteCode: (inviteCode: Invite) => void;
  updateName: (name: string, onSaveFailed: () => void) => void;
};

const UserContext = createContext<UserContext | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [couple, setCouple] = useState<Couple | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [inviteCode, setInviteCode] = useState<Invite | undefined>(undefined);

  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // 1. Fetch user profile from backend when Firebase user is available
  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const userData = await getMe();
          setMe(userData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      } else if (!authLoading) {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser, authLoading]);

  // 2. Handle redirection based on couple status (only once on initial load)
  useEffect(() => {
    // Only redirect if we are finished loading and have a user and haven't redirected yet
    if (!loading && uid && !hasRedirected) {
      if (couple && couple.partner) {
        navigate("/home");
      } else {
        if (name === "") {
          navigate("/enter-name");
        } else {
          navigate("/create-join");
        }
      }
      setHasRedirected(true);
    }
  }, [loading, uid, name, couple, navigate, hasRedirected]);

  function setMe(me: User) {
    setUid(me.uid);
    setName(me.name);
    setCouple(me.couple);
  }

  async function updateName(name: string, onSaveFailed: () => void) {
    try {
      setLoading(true);
      await updateNameApi(name);
      setName(name);
      // Navigate to create-join page after successfully updating name
      navigate("/create-join");
    } catch (error) {
      onSaveFailed();
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ uid, name, couple, loading, inviteCode, setMe, setCouple, updateName, setInviteCode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
}