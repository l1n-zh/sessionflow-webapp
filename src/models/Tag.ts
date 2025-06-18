import type { TagResponse } from '@/types/api/tag';

export class Tag {
  id: number;
  name: string;
  color: string;

  constructor(dto: TagResponse) {
    this.id = dto.id;
    this.name = dto.name;
    this.color = dto.color;
  }
} 