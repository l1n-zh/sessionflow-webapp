import type { Task } from '@/models/Task';
import { ref } from 'vue';

export function useTaskModals() {
  const showCreateModal = ref(false);
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);
  const selectedTask = ref<Task>();

  const openCreateModal = () => {
    showCreateModal.value = true;
  };

  const closeCreateModal = () => {
    showCreateModal.value = false;
  };

  const openEditModal = (task: Task) => {
    selectedTask.value = task;
    showEditModal.value = true;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    selectedTask.value = undefined;
  };

  const openDeleteModal = (task: Task) => {
    selectedTask.value = task;
    showDeleteModal.value = true;
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedTask.value = undefined;
  };

  return {
    // State
    showCreateModal,
    showEditModal,
    showDeleteModal,
    selectedTask,
    
    // Methods
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal
  };
} 