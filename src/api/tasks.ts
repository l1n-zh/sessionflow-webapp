import type { TaskResponse, TaskRequest } from '@/types/api/task';
import { api } from '.';

export const taskApi = {
  // Get all tasks with optional status filter
  async getTasks(status?: 'PENDING' | 'COMPLETE'): Promise<TaskResponse[]> {
    const params = status ? { status } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Create a new task
  async createTask(task: TaskRequest): Promise<TaskResponse> {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  // Update an existing task
  async updateTask(id: number, task: Partial<TaskRequest>): Promise<TaskResponse> {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // Mark task as complete
  async completeTask(id: number): Promise<TaskResponse> {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.data;
  },

  // Reopen a completed task
  async reopenTask(id: number): Promise<TaskResponse> {
    const response = await api.patch(`/tasks/${id}/reopen`);
    return response.data;
  }
}; 