import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Task } from '@/models/Task';
import type { TaskRequest } from '@/types/api/task';
import type { TaskFilter } from '@/types/ui/forms';
import type { TaskStatus } from '@/types/utility';
import { taskApi } from '@/api/tasks';

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([]);
  const isLoading = ref(false);
  const error = ref<string>('');
  const filter = ref<TaskFilter>({
    status: 'ALL',
    tagIds: [],
    search: ''
  });

  // Getters
  const filteredTasks = computed(() => {
    let filtered = tasks.value;

    // Filter by status
    if (filter.value.status && filter.value.status !== 'ALL') {
      filtered = filtered.filter(task => task.status === filter.value.status);
    }

    // Filter by tags
    if (filter.value.tagIds && filter.value.tagIds.length > 0) {
      filtered = filtered.filter(task => 
        task.tags.some(tag => filter.value.tagIds!.includes(tag.id))
      );
    }

    // Filter by search
    if (filter.value.search) {
      const searchLower = filter.value.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        (task.note && task.note.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  });

  const getTaskById = computed(() => {
    return (id: number) => tasks.value.find(task => task.id === id);
  });

  const pendingTasks = computed(() => 
    tasks.value.filter(task => !task.isComplete)
  );

  const completedTasks = computed(() => 
    tasks.value.filter(task => task.isComplete)
  );

  // Actions
  const fetchTasks = async (status?: TaskStatus) => {
    try {
      isLoading.value = true;
      error.value = '';
      const data = await taskApi.getTasks(status);
      tasks.value = data.map(dto => new Task(dto));
    } catch (err) {
      error.value = err instanceof Error ? err.message : '載入任務失敗';
      console.error('Failed to fetch tasks:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const ensureTasks = async (): Promise<Task[]> => {
    if (tasks.value.length === 0) {
      await fetchTasks();
    }
    return tasks.value;
  };

  const createTask = async (taskData: TaskRequest) => {
    try {
      isLoading.value = true;
      error.value = '';
      const newTaskResponse = await taskApi.createTask(taskData);
      const newTask = new Task(newTaskResponse);
      tasks.value.push(newTask);
      return newTask;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '建立任務失敗';
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateTask = async (id: number, taskData: Partial<TaskRequest>) => {
    try {
      isLoading.value = true;
      error.value = '';
      const updatedTaskResponse = await taskApi.updateTask(id, taskData);
      const updatedTask = new Task(updatedTaskResponse);
      const index = tasks.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新任務失敗';
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      isLoading.value = true;
      error.value = '';
      await taskApi.deleteTask(id);
      tasks.value = tasks.value.filter(t => t.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '刪除任務失敗';
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const completeTask = async (id: number) => {
    try {
      const updatedTaskResponse = await taskApi.completeTask(id);
      const updatedTask = new Task(updatedTaskResponse);
      const index = tasks.value.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '標記任務完成失敗';
      console.error('Failed to complete task:', err);
      throw err;
    }
  };

  const reopenTask = async (id: number) => {
    try {
      const updatedTaskResponse = await taskApi.reopenTask(id);
      const updatedTask = new Task(updatedTaskResponse);
      const index = tasks.value.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '重新開啟任務失敗';
      console.error('Failed to reopen task:', err);
      throw err;
    }
  };

  const setFilter = (newFilter: Partial<TaskFilter>) => {
    filter.value = { ...filter.value, ...newFilter };
  };

  const clearError = () => {
    error.value = '';
  };

  // WebSocket sync methods (to be implemented)
  const initSync = () => {
    // TODO: Implement WebSocket subscription
    console.log('Task WebSocket sync initialized');
  };

  const teardownSync = () => {
    // TODO: Implement WebSocket cleanup
    console.log('Task WebSocket sync torn down');
  };

  const handleTaskNotification = (notification: any) => {
    // TODO: Handle WebSocket notifications
    console.log('Task notification received:', notification);
  };

  return {
    // State
    tasks,
    isLoading,
    error,
    filter,
    
    // Getters
    filteredTasks,
    pendingTasks,
    completedTasks,
    getTaskById,
    
    // Actions
    fetchTasks,
    ensureTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    reopenTask,
    setFilter,
    clearError,
    initSync,
    teardownSync,
    handleTaskNotification
  };
}); 