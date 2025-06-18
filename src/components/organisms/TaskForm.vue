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
        @remove-tag="tag => removeTag(tag.id)"
        @create-new="isCreateTagModalOpen = true"
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
  <TagCreateModal
    :show="isCreateTagModalOpen"
    :is-submitting="tagStore.isCreating"
    @close="isCreateTagModalOpen = false"
    @create="handleCreateTag"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import TagInput from '@/components/molecules/TagInput.vue';
import TagCreateModal from '@/components/organisms/TagCreateModal.vue';
import { useTagStore } from '@/store/tags';
import { useTaskForm } from '@/composables/useTaskForm';
import { useTagSelection } from '@/composables/useTagSelection';
import type { TaskResponse } from '@/types/api/task';
import type { TaskFormData, TagCreateFormData } from '@/types/ui/forms';

interface Props {
  task?: TaskResponse;
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

const isCreateTagModalOpen = ref(false);

const handleCreateTag = async (data: TagCreateFormData) => {
  const newTag = await tagStore.createTag({
    name: data.name,
    color: data.color || '#e5e7eb' // Default to gray-200 if not provided
  });
  if (newTag) {
    isCreateTagModalOpen.value = false;
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