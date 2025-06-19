<template>
  <BaseModal
    :show="show"
    :title="modalTitle"
    size="lg"
    @close="$emit('close')"
  >
    <SessionCreateForm
      v-if="mode === 'create'"
      ref="formRef"
      :task="task"
      hide-actions
      @submit="handleSubmit"
    />

    <SessionEndForm
      v-if="mode === 'end'"
      ref="formRef"
      :session="session"
      hide-actions
      @submit="handleSubmit"
    />
    
    <template #footer>
      <div class="flex w-full items-center justify-end gap-3">
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
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import SessionCreateForm from '@/components/organisms/SessionCreateForm.vue';
import SessionEndForm from '@/components/organisms/SessionEndForm.vue';
import type { Task } from '@/models/Task';
import type { Session } from '@/models/Session';
import type { SessionCreateFormData, SessionEndFormData } from '@/types/ui/forms';

type FormInstance = InstanceType<typeof SessionCreateForm> | InstanceType<typeof SessionEndForm>;

interface Props {
  show: boolean;
  mode: 'create' | 'end';
  task?: Task | null;
  session?: Session | null;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
  task: null,
  session: null
});

const emit = defineEmits<{
  close: [];
  submit: [data: SessionCreateFormData | SessionEndFormData];
}>();

const formRef = ref<FormInstance | null>(null);

const modalTitle = computed(() => 
  props.mode === 'create' ? '開始新工作階段' : '結束工作階段'
);

const submitButtonText = computed(() => 
  props.mode === 'create' ? '開始' : '結束'
);

const handleSubmit = (data: SessionCreateFormData | SessionEndFormData) => {
  emit('submit', data);
};

const submitForm = () => {
  formRef.value?.submitForm();
};
</script> 