import type { TagResponse, TagRequest } from '@/types/api/tag';
import { api } from '.';

export const tagApi = {
  // Get all tags
  async getTags(): Promise<TagResponse[]> {
    return api.get('/tags');
  },

  // Create a new tag
  async createTag(tag: TagRequest): Promise<TagResponse> {
    return api.post('/tags', tag);
  },

  // Update an existing tag
  async updateTag(id: number, tag: TagRequest): Promise<TagResponse> {
    return api.put(`/tags/${id}`, tag);
  },

  // Delete a tag
  async deleteTag(id: number): Promise<void> {
    await api.delete(`/tags/${id}`);
  }
}; 