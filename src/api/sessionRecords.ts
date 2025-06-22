import type { SessionRecordResponse, SessionRecordUpdateRequest } from '@/types/api/sessionRecord';
import { api } from '.';

export const sessionRecordApi = {
  // Get session records with optional filters
  async getSessionRecords(params?: {
    startDate?: string;
    endDate?: string;
    taskId?: number;
  }): Promise<SessionRecordResponse[]> {
    return api.get('/session-records', { params }) as Promise<SessionRecordResponse[]>;
  },

  // Update a session record
  async updateSessionRecord(id: number, data: SessionRecordUpdateRequest): Promise<SessionRecordResponse> {
    return api.put(`/session-records/${id}`, data) as Promise<SessionRecordResponse>;
  },

  // Delete a session record
  async deleteSessionRecord(id: number): Promise<void> {
    await api.delete(`/session-records/${id}`);
  }
}; 