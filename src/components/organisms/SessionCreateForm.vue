<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <p v-if="task" class="text-lg">
      任務：<span class="font-semibold text-primary">{{ task.title }}</span>
    </p>

    <FormField label="工作階段名稱">
      <BaseInput v-model="formData.name" placeholder="例如：完成第一版設計" />
    </FormField>
    
    <FormField label="結束提醒 (分鐘)">
      <BaseInput v-model="formData.endReminderMinutes" type="number" placeholder="預設為 25 分鐘" :max="180" />
    </FormField>

    <FormField label="備註">
      <BaseInput v-model="formData.planningNotes" multiline placeholder="工作計畫或注意事項" />
    </FormField>

    <div v-if="!hideActions" class="flex justify-end gap-3 pt-4">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">取消</BaseButton>
      <BaseButton type="submit">開始</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import type { Task } from '@/models/Task';
import type { SessionCreateFormData } from '@/types/ui/forms';

interface Props {
  task: Task | null;
  hideActions?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'submit', formData: SessionCreateFormData): void;
}>();

const initialFormData: SessionCreateFormData = {
  name: '',
  planningNotes: '',
  endReminderMinutes: undefined
};

const formData = ref<SessionCreateFormData>({ ...initialFormData });

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = { 
      ...initialFormData,
      name: `處理任務：${newTask.title}`
    };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', formData.value);
};

const submitForm = () => {
  handleSubmit();
};

defineExpose({
  submitForm
});
</script> 