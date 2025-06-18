// API Response Types
export interface SessionResponse {
  id: number;
  title: string;
  taskId?: number;
  endReminder?: string;
  note?: string;
}

// API Request Types
export interface SessionRequest {
  title: string;
  taskId?: number;
  endReminder?: string;
  note?: string;
} 