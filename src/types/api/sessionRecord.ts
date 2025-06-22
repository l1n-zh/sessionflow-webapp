/**
 * Represents the data structure for a session record object received from the API.
 * This is the response after ending a session.
 */
export interface SessionRecordResponse {
  id: number;
  title: string;
  taskId?: number | null;
  startAt: string; // ISO 8601 string
  endAt: string; // ISO 8601 string
  plannedNote?: string | null;
  completionNote?: string | null;
}

export interface SessionRecordUpdateRequest {
  plannedNote?: string;
  completionNote?: string;
} 