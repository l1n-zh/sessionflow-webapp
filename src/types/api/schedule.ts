// API Response Types
export interface ScheduleEntryResponse {
  id: number;
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
  note?: string;
}

// API Request Types
export interface ScheduleEntryRequest {
  title: string;
  taskId?: number;
  startAt: string;
  endAt: string;
  note?: string;
} 