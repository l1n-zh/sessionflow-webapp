import { Tag } from '@/models/Tag';
import type { TaskResponse } from '@/types/api/task';

export class Task {
  id: number;
  title: string;
  tags: Tag[];
  dueTime?: Date;
  completedAt?: Date;
  note?: string;
  status: 'PENDING' | 'COMPLETE';

  constructor(dto: TaskResponse) {
    this.id = dto.id;
    this.title = dto.title;
    this.tags = dto.tags.map(tagDto => new Tag(tagDto));
    this.dueTime = dto.dueTime ? new Date(dto.dueTime) : undefined;
    this.completedAt = dto.completedAt ? new Date(dto.completedAt) : undefined;
    this.note = dto.note;
    this.status = dto.status;
  }

  get isComplete(): boolean {
    return this.status === 'COMPLETE';
  }
} 