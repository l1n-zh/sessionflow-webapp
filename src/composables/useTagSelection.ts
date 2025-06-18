import { computed, type Ref } from 'vue';
import { useTagStore } from '@/store/tags';
import type { TaskFormData } from '@/types/ui/forms';
import type { Tag } from '@/models/Tag';

export function useTagSelection(formData: Ref<TaskFormData>) {
  const tagStore = useTagStore();

  const selectedTags = computed<Tag[]>(() =>
    tagStore.tags.filter(tag => formData.value.tagIds.includes(tag.id))
  );

  const availableTags = computed<Tag[]>(() =>
    tagStore.tags.filter(tag => !formData.value.tagIds.includes(tag.id))
  );

  // Methods
  const addTag = (tag: Tag) => {
    if (tag.id && !formData.value.tagIds.includes(tag.id)) {
      formData.value.tagIds.push(tag.id);
    }
  };

  const removeTag = (tag: Tag) => {
    if (tag.id !== undefined) {
      formData.value.tagIds = formData.value.tagIds.filter(id => id !== tag.id);
    }
  };

  return {
    selectedTags,
    availableTags,
    addTag,
    removeTag
  };
} 