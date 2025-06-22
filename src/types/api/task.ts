import type { TagResponse } from '@/types/api/tag';

// API Response Types
export interface TaskResponse {
  id: number;
  title: string;
  tags: TagResponse[];
  dueAt?: string | null;
  completedAt?: string | null;
  note?: string | null;
  status: 'PENDING' | 'COMPLETE';
}

// API Request Types
export interface TaskRequest {
  title: string;
  tagIds?: number[];
  dueAt?: string;
  note?: string;
} 