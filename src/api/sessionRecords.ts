import { api } from './index';
import type { SessionRecordResponse, SessionRecordUpdateRequest } from '@/types';

export const sessionRecordApi = {
  // Get session records with optional filters
  async getSessionRecords(params?: {
    startDate?: string;
    endDate?: string;
    taskId?: number;
  }): Promise<SessionRecordResponse[]> {
    const response = await api.get('/session-records', { params });
    return response.data;
  },

  // Update a session record
  async updateSessionRecord(id: number, data: SessionRecordUpdateRequest): Promise<SessionRecordResponse> {
    const response = await api.put(`/session-records/${id}`, data);
    return response.data;
  },

  // Delete a session record
  async deleteSessionRecord(id: number): Promise<void> {
    await api.delete(`/session-records/${id}`);
  }
}; 