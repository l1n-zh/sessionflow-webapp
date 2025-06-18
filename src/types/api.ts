// API Response Types
export interface TaskResponse {
  id: number;
  title: string;
  tags: TagResponse[];
  dueTime?: string;
  completedAt?: string;
  note?: string;
  status: 'PENDING' | 'COMPLETE';
}

export interface TagResponse {
  id: number;
  name: string;
  color: string;
}

export interface SessionResponse {
  id: number;
  title: string;
  taskId?: number;
  endReminder?: string;
  note?: string;
}

export interface SessionRecordResponse {
  id: number;
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
  plannedNote?: string;
  completionNote?: string;
}

export interface ScheduleEntryResponse {
  id: number;
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
  note?: string;
}

// API Request Types
export interface TaskRequest {
  title: string;
  tagIds?: number[];
  dueTime?: string;
  note?: string;
}

export interface TagRequest {
  name: string;
  color: string;
}

export interface SessionRequest {
  title: string;
  taskId?: number;
  endReminder?: string;
  note?: string;
}

export interface SessionRecordCreateRequest {
  sessionId: number;
  completionNote?: string;
}

export interface SessionRecordUpdateRequest {
  plannedNote?: string;
  completionNote?: string;
}

export interface ScheduleEntryRequest {
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
  note?: string;
}

// Error Response Type
export interface ErrorResponse {
  code: string;
  message: string;
  details: string;
  timestamp: string;
} 