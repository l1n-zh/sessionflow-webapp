import { ref } from 'vue';
import { useTaskStore } from '@/store/tasks';
import type { TaskResponse, TaskFormData } from '@/types';

export function useTaskOperations() {
  const taskStore = useTaskStore();
  const isSubmitting = ref(false);

  const handleTaskToggleComplete = async (task: TaskResponse) => {
    try {
      if (task.status === 'PENDING') {
        await taskStore.completeTask(task.id);
      } else {
        await taskStore.reopenTask(task.id);
      }
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    }
  };

  const handleCreateTask = async (data: TaskFormData, onSuccess?: () => void) => {
    try {
      isSubmitting.value = true;
      await taskStore.createTask(data);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleUpdateTask = async (taskId: number, data: TaskFormData, onSuccess?: () => void) => {
    try {
      isSubmitting.value = true;
      await taskStore.updateTask(taskId, data);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleDeleteTask = async (taskId: number, onSuccess?: () => void) => {
    try {
      isSubmitting.value = true;
      await taskStore.deleteTask(taskId);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    isSubmitting,
    handleTaskToggleComplete,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask
  };
} 