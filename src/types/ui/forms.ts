// Form Types
export interface TaskFormData {
  title: string;
  tagIds: number[];
  dueTime?: string;
  note?: string;
}

export interface TagFormData {
  name: string;
  color: string;
}

export interface TagCreateFormData {
  name: string;
  color?: string;
}

export interface TagUpdateFormData {
  id: number;
  name: string;
  color: string;
}

// Filter Types
export interface TaskFilter {
  status?: 'PENDING' | 'COMPLETE' | 'ALL';
  tagIds?: number[];
  search?: string;
}

export interface SessionRecordFilter {
  startDate?: string;
  endDate?: string;
  taskId?: number;
} 