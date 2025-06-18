import { api } from './index';
import type { TagResponse, TagRequest } from '@/types';

export const tagApi = {
  // Get all tags
  async getTags(): Promise<TagResponse[]> {
    const response = await api.get('/tags');
    return response.data;
  },

  // Create a new tag
  async createTag(tag: TagRequest): Promise<TagResponse> {
    const response = await api.post('/tags', tag);
    return response.data;
  },

  // Update an existing tag
  async updateTag(id: number, tag: TagRequest): Promise<TagResponse> {
    const response = await api.put(`/tags/${id}`, tag);
    return response.data;
  },

  // Delete a tag
  async deleteTag(id: number): Promise<void> {
    await api.delete(`/tags/${id}`);
  }
}; 