import { ref, computed } from 'vue';
import { useTagStore } from '@/store/tags';
import type { Tag } from '@/models/Tag';

export function useTagModals() {
  const tagStore = useTagStore();

  const selectedTagForEdit = ref<Tag | null>(null);
  const selectedTagForDelete = ref<Tag | null>(null);

  const isEditModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const isSubmitting = ref(false);

  const existingTagNames = computed(() => 
    tagStore.tags.map(t => t.name.toLowerCase())
  );

  const openEditModal = (tag: Tag) => {
    selectedTagForEdit.value = tag;
    isEditModalOpen.value = true;
  };

  const closeEditModal = () => {
    isEditModalOpen.value = false;
    selectedTagForEdit.value = null;
  };

  const openDeleteModal = (tag: Tag) => {
    selectedTagForDelete.value = tag;
    isDeleteModalOpen.value = true;
    // Close edit modal if open
    if (isEditModalOpen.value) {
      closeEditModal();
    }
  };

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    selectedTagForDelete.value = null;
  };

  return {
    selectedTagForEdit,
    selectedTagForDelete,
    isEditModalOpen,
    isDeleteModalOpen,
    isSubmitting,
    existingTagNames,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
  };
}

