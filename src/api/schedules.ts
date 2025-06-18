import { api } from './index';
import type { ScheduleEntryResponse, ScheduleEntryRequest } from '@/types';

export const scheduleApi = {
  // Get schedule entries within date range
  async getScheduleEntries(startDate: string, endDate: string): Promise<ScheduleEntryResponse[]> {
    const response = await api.get('/schedule-entries', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Create a new schedule entry
  async createScheduleEntry(entry: ScheduleEntryRequest): Promise<ScheduleEntryResponse> {
    const response = await api.post('/schedule-entries', entry);
    return response.data;
  },

  // Update an existing schedule entry
  async updateScheduleEntry(id: number, entry: ScheduleEntryRequest): Promise<ScheduleEntryResponse> {
    const response = await api.put(`/schedule-entries/${id}`, entry);
    return response.data;
  },

  // Delete a schedule entry
  async deleteScheduleEntry(id: number): Promise<void> {
    await api.delete(`/schedule-entries/${id}`);
  }
}; 