import type { ScheduleEntryResponse, ScheduleEntryRequest } from '@/types/api/schedule';
import { api } from '.';

export const scheduleApi = {
  // Get schedule entries within date range
  async getScheduleEntries(startDate: string, endDate: string): Promise<ScheduleEntryResponse[]> {
    const response = await api.get('/schedule-entries', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Create a new schedule entry
  createScheduleEntry: (data: ScheduleEntryRequest): Promise<ScheduleEntryResponse> => api.post('/schedule-entries', data),

  // Update an existing schedule entry
  updateScheduleEntry: (id: number, data: ScheduleEntryRequest): Promise<ScheduleEntryResponse> => api.put(`/schedule-entries/${id}`, data),

  // Delete a schedule entry
  deleteScheduleEntry: async (id: number): Promise<void> => {
    await api.delete(`/schedule-entries/${id}`);
  },

  getSchedules: (): Promise<ScheduleEntryResponse[]> => api.get('/schedules')
}; 