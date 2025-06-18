<template>
  <BaseModal
    :show="show"
    :title="modalTitle"
    size="lg"
    @close="$emit('close')"
  >
    <TaskForm
      ref="taskFormRef"
      :task="task"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @cancel="$emit('close')"
      hide-actions
    />
    
    <template #footer>
      <div class="flex w-full items-center justify-between">
        <!-- Delete Button -->
        <BaseButton
          v-if="isEdit"
          type="button"
          variant="danger"
          @click="$emit('delete')"
        >
          <BaseIcon :icon="ICONS.DELETE" />
          <span class="ml-2">刪除</span>
        </BaseButton>

        <!-- Spacer to push buttons to the right when delete is not visible -->
        <div v-else></div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <BaseButton
            type="button"
            variant="secondary"
            @click="$emit('close')"
          >
            取消
          </BaseButton>
          <BaseButton
            :loading="isSubmitting"
            @click="submitForm"
          >
            {{ submitButtonText }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
import TaskForm from '@/components/organisms/TaskForm.vue';
import type { Task } from '@/models/Task';
import type { TaskFormData } from '@/types/ui/forms';

interface Props {
  show: boolean;
  task?: Task;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false
});

const emit = defineEmits<{
  close: [];
  submit: [data: TaskFormData];
  delete: [];
}>();

const taskFormRef = ref<InstanceType<typeof TaskForm>>();

const isEdit = computed(() => !!props.task);

const modalTitle = computed(() => 
  isEdit.value ? '編輯任務' : '建立新任務'
);

const submitButtonText = computed(() => 
  isEdit.value ? '更新任務' : '建立任務'
);

const handleSubmit = (data: TaskFormData) => {
  emit('submit', data);
};

const submitForm = () => {
  taskFormRef.value?.submitForm();
};
</script> 