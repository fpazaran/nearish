import { authenticatedFetch } from "./apiClient";

export interface Visit {
  id: number;
  start: string;
  end: string;
  description: string;
}

export interface CreateVisit {
  description: string;
  start: string;
  end: string;
}

export interface CreateActivitySnapshot {
	date: string
  name: string
  category: string
  order_index: number
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

export async function createVisit(visit: CreateVisit, schedule: CreateActivitySnapshot[]): Promise<Visit> {
  const response = await authenticatedFetch("/api/visits", {
    method: "POST",
    body: JSON.stringify({ visit: visit, schedule: schedule }),
  });
  if (!response.ok) {
    throw new Error("Failed to create visit");
  }
  const createdVisit: Visit = await response.json();
  return createdVisit;
}
