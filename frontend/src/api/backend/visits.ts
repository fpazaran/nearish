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
  activity_id: number | null;
  date: string
  name: string
  category: string
  order_index: number
}

export enum VisitState {
  PLANNED = "planned",
  COMPLETED = "completed",
  ACTIVE = "active",
}

export async function getVisits(): Promise<Visit[]> {
  const response = await authenticatedFetch("/visits", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get visits");
  }
  const visits: Visit[] = await response.json();
  return visits;
}

export async function createVisit(visit: CreateVisit, schedule: CreateActivitySnapshot[]): Promise<Visit> {
  const response = await authenticatedFetch("/visits", {
    method: "POST",
    body: JSON.stringify({ visit: visit, schedule: schedule }),
  });
  if (!response.ok) {
    throw new Error("Failed to create visit");
  }
  const createdVisit: Visit = await response.json();
  return createdVisit;
}

export async function deleteVisit(id: number): Promise<void> {
  const response = await authenticatedFetch(`/visits/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete visit");
  }
}