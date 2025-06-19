import { ref } from 'vue';
import { useTaskStore } from '@/store/tasks';
import type { TaskFormData } from '@/types/ui/forms';

export function useTaskOperations() {
  const taskStore = useTaskStore();
  const isSubmitting = ref(false);

  const handleTaskComplete = async (taskId: number) => {
      try {
          await taskStore.completeTask(taskId);
      } catch (error) {
          console.error('Failed to complete task:', error);
      }
  };

  const handleTaskReopen = async (taskId: number) => {
      try {
          await taskStore.reopenTask(taskId);
      } catch (error) {
          console.error('Failed to reopen task:', error);
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
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleTaskComplete,
    handleTaskReopen
  };
} 