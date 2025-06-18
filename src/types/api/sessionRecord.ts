// API Response Types
export interface SessionRecordResponse {
  id: number;
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
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