import { createContext, useContext, useState, useEffect } from "react";
import { Home } from "../api/backend/home";
import { getHome } from "../api/backend/home";
import { useUser } from "./UserContext";

type HomeContextType = {
  home: Home | undefined
  loading: boolean
  refreshHome: () => Promise<void>
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export default function HomeProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState<Home | undefined>(undefined)
  const { couple } = useUser()

  const refreshHome = async () => {
    setLoading(true)
    try {
      const data = await getHome()
      setHome(data)
    } catch (error) {
      console.error("Error fetching home:", error)
    } finally {
      setLoading(false)
    }
  }

  // Only fetch when user has a couple and home hasn't been loaded yet
  useEffect(() => {
    if (couple && !home) {
      refreshHome()
    }
  }, [couple])

  return (
    <HomeContext.Provider value={{ home, loading, refreshHome }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHome must be used within an HomeProvider");
  }
  return context;
}