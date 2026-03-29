import { createContext, useContext, useState, useEffect } from "react";
import { Visit, getVisits } from "../api/backend/visits";
import { useUser } from "./UserContext";

type VisitsContextType = {
  visits: Visit[]
  setVisits: (visits: Visit[]) => void
  addVisit: (visit: Visit) => void
};

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export default function VisitsProvider({ children }: { children: React.ReactNode }) {
  const [visits, setVisits] = useState<Visit[]>([]);

  const addVisit = (visit: Visit) => {
    setVisits(prev => [...prev, visit]);
  };

  return (
    <VisitsContext.Provider value={{ visits, setVisits, addVisit }}>
      {children}
    </VisitsContext.Provider>
  );
}

export function useVisits() {
  const context = useContext(VisitsContext);
  if (context === undefined) {
    throw new Error("useVisits must be used within a VisitsProvider");
  }
  return context;
}
