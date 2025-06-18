import type { SessionResponse, SessionRequest } from '@/types/api/session';
import type { SessionRecordCreateRequest, SessionRecordResponse } from '@/types/api/sessionRecord';
import { api } from '.';

export const sessionApi = {
  // Get all active sessions
  async getSessions(): Promise<SessionResponse[]> {
    const response = await api.get('/sessions');
    return response.data;
  },

  // Create a new session
  async createSession(session: SessionRequest): Promise<SessionResponse> {
    const response = await api.post('/sessions', session);
    return response.data;
  },

  // End a session and create session record
  async endSession(id: number, data: SessionRecordCreateRequest): Promise<SessionRecordResponse> {
    const response = await api.post(`/sessions/${id}/end`, data);
    return response.data;
  }
}; 