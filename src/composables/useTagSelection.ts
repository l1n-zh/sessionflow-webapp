import { computed, type Ref } from 'vue';
import { useTagStore } from '@/store/tags';
import type { TagResponse, TaskFormData } from '@/types';

export function useTagSelection(formData: Ref<TaskFormData>) {
  const tagStore = useTagStore();

  const selectedTags = computed(() => 
    tagStore.tags.filter(tag => formData.value.tagIds.includes(tag.id))
  );

  const availableTags = computed(() => 
    tagStore.tags.filter(tag => !formData.value.tagIds.includes(tag.id))
  );

  // Methods
  const addTag = (tag: TagResponse) => {
    if (!formData.value.tagIds.includes(tag.id)) {
      formData.value.tagIds.push(tag.id);
    }
  };

  const removeTag = (tagId?: number) => {
    if (tagId) {
      formData.value.tagIds = formData.value.tagIds.filter(id => id !== tagId);
    }
  };

  return {
    selectedTags,
    availableTags,
    addTag,
    removeTag
  };
} 