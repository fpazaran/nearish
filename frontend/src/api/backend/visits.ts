import { authenticatedFetch } from "./apiClient";
import { ActivitySnapshot, CreateActivitySnapshot } from "./activities";

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

export async function saveSchedule(id: number, toAdd: CreateActivitySnapshot[], toDelete: ActivitySnapshot[]): Promise<void> {
  const response = await authenticatedFetch(`/visits/${id}/schedule`, {
    method: "PATCH",
    body: JSON.stringify({ add: toAdd, delete: toDelete }),
  });
  if (!response.ok) {
    throw new Error("Failed to save schedule");
  }
}

export async function getVisitSchedule(id: number): Promise<ActivitySnapshot[]> {
  const response = await authenticatedFetch(`/visits/${id}/schedule`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get visit schedule");
  }
  const schedule: ActivitySnapshot[] = await response.json();
  return schedule;
}