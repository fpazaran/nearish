import { authenticatedFetch } from "./apiClient";

export interface Visit {
  id: number;
  start: string;
  end: string;
  description: string;
}

export enum VisitState {
  PLANNED = "planned",
  UNPLANNED = "unplanned",
  ACTIVE = "active",
}

export async function getVisits(): Promise<Visit[]> {
  const response = await authenticatedFetch("/api/visits", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get visits");
  }
  const visits: Visit[] = await response.json();
  return visits;
}
