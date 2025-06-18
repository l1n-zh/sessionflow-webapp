import type { TaskResponse, TaskRequest } from '@/types/api/task';
import { api } from '.';

export const taskApi = {
  // Get all tasks with optional status filter
  async getTasks(status?: 'PENDING' | 'COMPLETE'): Promise<TaskResponse[]> {
    const params = status ? { status } : {};
    return api.get('/tasks', { params });
  },

  // Create a new task
  async createTask(task: TaskRequest): Promise<TaskResponse> {
    return api.post('/tasks', task);
  },

  // Update an existing task
  async updateTask(id: number, task: Partial<TaskRequest>): Promise<TaskResponse> {
    return api.put(`/tasks/${id}`, task);
  },

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // Mark task as complete
  async completeTask(id: number): Promise<TaskResponse> {
    return api.patch(`/tasks/${id}/complete`);
  },

  // Reopen a completed task
  async reopenTask(id: number): Promise<TaskResponse> {
    return api.patch(`/tasks/${id}/reopen`);
  }
}; 