/**
 * Represents the data structure for a session record object received from the API.
 * This is the response after ending a session.
 */
export interface SessionRecordResponse {
  id: number;
  title: string;
  taskId?: number;
  startAt: string; // ISO 8601 string
  endAt: string; // ISO 8601 string
  plannedNote?: string;
  completionNote?: string;
}

// API Request Types
export interface SessionRecordCreateRequest {
  sessionId: number;
  completionNote?: string;
}

export interface SessionRecordUpdateRequest {
  plannedNote?: string;
  completionNote?: string;
} 