/**
 * Represents the data structure for a session object received from the API.
 * Corresponds to `SessionResponse` in the API documentation.
 */
export interface SessionResponse {
  id: number;
  title: string;
  taskId?: number;
  note?: string;
  endReminder?: string; // ISO 8601 string
  /**
   * @assumption The `startTime` field is assumed to exist for calculating elapsed time,
   * though it's not explicitly in the `SessionResponse` of the spec.md.
   * It corresponds to `startAt` in `SessionRecordResponse`.
   */
  startTime: string; // ISO 8601 string
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
 * Represents the payload for creating a new session.
 * Corresponds to `SessionCreateRequest` in the API documentation.
 */
export interface SessionCreateRequest {
  title: string;
  taskId?: number;
  note?: string;
  endReminder?: string; // ISO 8601 string
}

/**
 * Represents the payload for ending a session.
 * This is derived from the body of the `POST /api/sessions/{id}/end` endpoint.
 * The API doc specifies `SessionRecordCreateRequest`, but for clarity in the frontend,
 * we'll use `SessionEndRequest`.
 * The `mark_task_as_complete` logic will be handled separately in the store.
 */
export interface SessionEndRequest {
    sessionId: number; // it is a little bit weird, but it is the way the API is designed
    completionNote?: string;
} 