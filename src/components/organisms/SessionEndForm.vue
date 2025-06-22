<template>
  <form v-if="session" class="space-y-6" @submit.prevent="handleSubmit">
    <p class="text-lg">
      任務：<span class="font-semibold text-neutral-800">{{ session.taskTitle }}</span>
    </p>
    <p class="text-lg">
      總時長：<span class="font-semibold text-primary tabular-nums">{{ formattedElapsedTime }}</span>
    </p>

    <FormField label="備註">
      <BaseInput v-model="formData.completionNotes" multiline placeholder="工作成果或遇到的問題" />
    </FormField>

    <BaseCheckbox
      v-model="formData.markTaskAsComplete"
      label="將任務標記為完成"
    />

    <div v-if="!hideActions" class="flex justify-end gap-3 pt-4">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">取消</BaseButton>
      <BaseButton type="submit">結束</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineExpose } from 'vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseCheckbox from '@/components/atoms/BaseCheckbox.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import type { Session } from '@/models/Session';
import type { SessionEndFormData } from '@/types/ui/forms';

interface Props {
  session: Session | null;
  hideActions?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'submit', formData: SessionEndFormData): void;
}>();

const initialFormData: SessionEndFormData = {
  completionNotes: '',
  markTaskAsComplete: false
};

const formData = ref<SessionEndFormData>({ ...initialFormData });

// Real-time timer logic
const now = ref(new Date());
let timer: number;

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const formattedElapsedTime = computed(() => {
  if (!props.session) return '00:00:00';

  const elapsedSeconds = Math.floor((now.value.getTime() - props.session.startAt.getTime()) / 1000);
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;
  
  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
});

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