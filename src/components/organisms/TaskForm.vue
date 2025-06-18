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
    <div class="space-y-2">
      <label class="block text-md text-neutral-700">
        標籤
      </label>
      <div class="space-y-3">
        <!-- Selected tags -->
        <div v-if="selectedTags.length > 0" class="flex flex-wrap gap-2">
          <BaseTag
            v-for="tag in selectedTags"
            :key="tag.id"
            :id="tag.id"
            :name="tag.name"
            :color="tag.color"
            removable
            @remove="removeTag"
          />
        </div>
        
        <!-- Tag selector -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag.id"
            type="button"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm border border-neutral-300 hover:border-primary hover:bg-primary/5 transition-colors"
            @click="addTag(tag)"
          >
            <span 
              class="w-3 h-3 rounded-full mr-2"
              :style="{ backgroundColor: tag.color }"
            ></span>
            {{ tag.name }}
          </button>
          <!-- 新增標籤按鈕 -->
          <!-- TODO: add tags Modal 彈窗 -->
          <ActionButton
            variant="outline"
            size="sm"
            :icon="ICONS.ADD"
            @click="void(0)"
            title="新增標籤"
          >
          </ActionButton>
        </div>
      </div>
    </div>

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
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseTag from '@/components/atoms/BaseTag.vue';
import ActionButton from '@/components/atoms/ActionButton.vue';
import { useTagStore } from '@/store/tags';
import { useTaskForm } from '@/composables/useTaskForm';
import { useTagSelection } from '@/composables/useTagSelection';
import type { TaskResponse, TaskFormData } from '@/types';
import { ICONS } from '@/constants/icons';

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