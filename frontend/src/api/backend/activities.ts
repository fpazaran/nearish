import { authenticatedFetch } from "./apiClient";

export interface CreateActivitySnapshot {
  activity_id: number | null;
  date: string
  name: string
  category: string
  order_index: number
}

export interface ActivitySnapshot {
  id: number;
  visit_id: number;
  activity_id: number | null;
  date: string;
  name: string;
  category: string;
  order_index: number;
}

export async function getActivitySnapshots(visit_id: number): Promise<ActivitySnapshot[]> {
  const response = await authenticatedFetch(`/activities/snapshots/${visit_id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get activity snapshots");
  }
  const snapshots: ActivitySnapshot[] = await response.json();
  return snapshots;
}