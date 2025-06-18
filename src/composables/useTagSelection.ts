import { computed, type Ref } from 'vue';
import { useTagStore } from '@/store/tags';
import type { TaskFormData } from '@/types/ui/forms';
import type { TagProps } from '@/types/ui/components';

export function useTagSelection(formData: Ref<TaskFormData>) {
  const tagStore = useTagStore();

  const selectedTags = computed<TagProps[]>(() =>
    tagStore.tags.filter(tag => formData.value.tagIds.includes(tag.id))
      .map(tag => ({ ...tag }))
  );

  const availableTags = computed<TagProps[]>(() =>
    tagStore.tags.filter(tag => !formData.value.tagIds.includes(tag.id))
      .map(tag => ({ ...tag }))
  );

  // Methods
  const addTag = (tag: TagProps) => {
    if (tag.id && !formData.value.tagIds.includes(tag.id)) {
      formData.value.tagIds.push(tag.id);
    }
  };

  const removeTag = (tagId?: number) => {
    if (tagId !== undefined) {
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