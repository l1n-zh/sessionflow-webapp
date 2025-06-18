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
      <BaseButton
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
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import TaskForm from '@/components/organisms/TaskForm.vue';
import type { TaskResponse } from '@/types/api/task';
import type { TaskFormData } from '@/types/ui/forms';

interface Props {
  show: boolean;
  task?: TaskResponse;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false
});

const emit = defineEmits<{
  close: [];
  submit: [data: TaskFormData];
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