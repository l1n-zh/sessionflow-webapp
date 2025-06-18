import type {
    SessionCreateRequest,
    SessionEndRequest,
    SessionResponse
} from '@/types/api/session';
import type { SessionRecordResponse } from '@/types/api/sessionRecord';
import { api } from './index';

/**
 * Fetches all active sessions from the server.
 * Corresponds to `GET /api/sessions`.
 * @returns A promise that resolves to an array of active sessions.
 */
export const getActiveSessions = (): Promise<SessionResponse[]> => {
    return api.get('/sessions');
};

/**
 * Starts a new session for a given task.
 * Corresponds to `POST /api/sessions`.
 * @param data - The data required to create the session.
 * @returns A promise that resolves to the newly created session.
 */
export const startSession = (data: SessionCreateRequest): Promise<SessionResponse> => {
    return api.post('/sessions', data);
};

/**
 * Ends an active session and creates a session record.
 * Corresponds to `POST /api/sessions/{id}/end`.
 * @param sessionId - The ID of the session to end.
 * @param data - The data for completing the session.
 * @returns A promise that resolves to the created session record.
 */
export const endSession = (
    sessionId: number,
    data: SessionEndRequest
): Promise<SessionRecordResponse> => {
    return api.post(`/sessions/${sessionId}/end`, data);
}; 