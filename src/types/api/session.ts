/**
 * Represents the data structure for a session object received from the API.
 * Corresponds to `SessionResponse` in the API documentation.
 */
export interface SessionResponse {
  id: number;
  title: string;
  taskId?: number | null;
  startAt: string; // ISO 8601 string
  endReminder?: string | null; // ISO 8601 string
  note?: string | null;
}

/**
 * Represents the payload for creating a new session.
 * Corresponds to `SessionRequest` in the API documentation.
 */
export interface SessionRequest {
  title: string;
  taskId?: number;
  endReminder?: string;
  note?: string;
}

/**
 * Represents the payload for ending a session.
 * Corresponds to `SessionRecordCreateRequest` in the API documentation.
 */
export interface SessionRecordCreateRequest {
  sessionId: number;
  completionNote?: string;
} 