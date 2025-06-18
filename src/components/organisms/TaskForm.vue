<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Title -->
    <FormField
      id="title"
      label="任務標題"
      v-model="formData.title"
      placeholder="輸入任務標題..."
      required
      :error="errors.title"
    />

    <!-- Tags -->
    <FormField
      id="tags"
      label="標籤"
    >
      <TagInput
        :selected-tags="selectedTags"
        :available-tags="availableTags"
        @add-tag="addTag"
        @remove-tag="removeTag"
        @create-new="isCreateTagModalOpen = true"
        @edit-tag="tagModals.openEditModal"
      />
    </FormField>

    <!-- Due Date -->
    <FormField
      id="dueTime"
      label="截止日期"
      type="datetime-local"
      v-model="formData.dueTime"
      :error="errors.dueTime"
      help="選擇任務的截止日期和時間"
    />

    <!-- Note -->
    <FormField
      id="note"
      label="備註"
      v-model="formData.note"
      placeholder="輸入任務備註..."
      multiline
      :rows="4"
      :error="errors.note"
      help="最多 2000 字元"
    />

    <!-- Actions -->
    <div 
      v-if="!hideActions"
      class="flex items-center justify-end gap-3 pt-4 border-t border-neutral-300"
    >
      <BaseButton
        type="button"
        variant="secondary"
        @click="$emit('cancel')"
      >
        取消
      </BaseButton>
      <BaseButton
        type="submit"
        :loading="isSubmitting"
        :disabled="!isFormValid"
      >
        {{ isEdit ? '更新任務' : '建立任務' }}
      </BaseButton>
    </div>
  </form>

  <!-- Tag Modals -->
  <TagCreateModal
    :show="isCreateTagModalOpen"
    :is-submitting="tagStore.isCreating"
    :existing-tag-names="tagModals.existingTagNames.value"
    @close="isCreateTagModalOpen = false"
    @create="handleCreateTag"
  />
  <TagEditModal
    :show="tagModals.isEditModalOpen.value"
    :tag="tagModals.selectedTagForEdit.value"
    :is-submitting="tagModals.isSubmitting.value"
    :existing-tag-names="tagModals.existingTagNames.value"
    @close="tagModals.closeEditModal"
    @update="handleUpdateTag"
    @delete="tagModals.openDeleteModal"
  />
  <TagDeleteConfirm
    :show="tagModals.isDeleteModalOpen.value"
    :tag="tagModals.selectedTagForDelete.value"
    :is-deleting="tagModals.isSubmitting.value"
    @close="tagModals.closeDeleteModal"
    @confirm="handleDeleteTag"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import TagInput from '@/components/molecules/TagInput.vue';
import TagCreateModal from '@/components/organisms/TagCreateModal.vue';
import TagEditModal from '@/components/organisms/TagEditModal.vue';
import TagDeleteConfirm from '@/components/organisms/TagDeleteConfirm.vue';
import { useTagStore } from '@/store/tags';
import { useTaskForm } from '@/composables/useTaskForm';
import { useTagSelection } from '@/composables/useTagSelection';
import { useTagModals } from '@/composables/useTagModals';
import type { Task } from '@/models/Task';
import type { TaskFormData, TagCreateFormData, TagUpdateFormData } from '@/types/ui/forms';

interface Props {
  task?: Task;
  isSubmitting?: boolean;
  hideActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
  hideActions: false
});

const emit = defineEmits<{
  submit: [data: TaskFormData];
  cancel: [];
}>();

const tagStore = useTagStore();

// Use composables
const {
  formData,
  errors,
  isEdit,
  isFormValid,
  handleSubmit
} = useTaskForm(props.task);

const {
  selectedTags,
  availableTags,
  addTag,
  removeTag
} = useTagSelection(formData);

const tagModals = useTagModals();

const isCreateTagModalOpen = ref(false);

const handleCreateTag = async (data: TagCreateFormData) => {
  try {
    const newTag = await tagStore.createTag({
      name: data.name,
      color: data.color || '#e5e7eb'
    });
    if (newTag) {
      isCreateTagModalOpen.value = false;
      addTag(newTag); // Auto-select the new tag
    }
  } catch (error) {
    // Error is handled in the store, but you could add UI feedback here
    console.error("Failed to create and select tag:", error)
  }
};

const handleUpdateTag = async (data: TagUpdateFormData) => {
  tagModals.isSubmitting.value = true;
  try {
    await tagStore.updateTag(data.id, { name: data.name, color: data.color });
    tagModals.closeEditModal();
  } finally {
    tagModals.isSubmitting.value = false;
  }
};

const handleDeleteTag = async () => {
  if (!tagModals.selectedTagForDelete.value) return;
  
  tagModals.isSubmitting.value = true;
  try {
    // Deselect tag from the current task form before deleting
    removeTag(tagModals.selectedTagForDelete.value); 
    await tagStore.deleteTag(tagModals.selectedTagForDelete.value.id);
    tagModals.closeDeleteModal();
  } finally {
    tagModals.isSubmitting.value = false;
  }
};

// Methods
const submitForm = () => {
  handleSubmit((data: TaskFormData) => {
    emit('submit', data);
  });
};

// Expose submitForm method for external use
defineExpose({
  submitForm
});

// Load tags on mount
onMounted(() => {
  if (tagStore.tags.length === 0) {
    tagStore.fetchTags();
  }
});
</script> 