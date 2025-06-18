import type { TagResponse } from '@/types/api/tag';

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

// API Request Types
export interface TaskRequest {
  title: string;
  tagIds?: number[];
  dueTime?: string;
  note?: string;
} 