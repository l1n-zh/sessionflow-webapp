import { Tag } from '@/models/Tag';
import type { TaskResponse } from '@/types/api/task';

export class Task {
  id: number;
  title: string;
  tags: Tag[];
  dueAt?: Date;
  completedAt?: Date;
  note?: string;
  status: 'PENDING' | 'COMPLETE';

  constructor(dto: TaskResponse) {
    this.id = dto.id;
    this.title = dto.title;
    this.tags = dto.tags.map(tagDto => new Tag(tagDto));
    this.dueAt = dto.dueAt ? new Date(dto.dueAt) : undefined;
    this.completedAt = dto.completedAt ? new Date(dto.completedAt) : undefined;
    this.note = dto.note || undefined;
    this.status = dto.status;
  }

  get isComplete(): boolean {
    return this.status === 'COMPLETE';
  }
} 