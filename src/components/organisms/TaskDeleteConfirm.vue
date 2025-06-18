<template>
  <BaseModal
    :show="show"
    title="刪除任務"
    size="sm"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <BaseIcon :icon="ICONS.WARNING" size="lg" class="text-red-500 flex-shrink-0 mt-0.5" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-medium text-neutral-900 mb-2">
            確定要刪除這個任務嗎？
          </h3>
          <p class="text-sm text-neutral-600 mb-4">
            任務「<strong>{{ task?.title }}</strong>」將被永久刪除，此操作無法復原。
          </p>
          <div v-if="hasRelatedData" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div class="flex items-start gap-2">
              <BaseIcon :icon="ICONS.WARNING" size="lg" class="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-yellow-800">
                <p class="font-medium">注意：</p>
                <p>刪除此任務也會同時刪除相關的工作階段、階段紀錄和排程項目。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton
        variant="secondary"
        @click="$emit('close')"
      >
        取消
      </BaseButton>
      <BaseButton
        variant="danger"
        :loading="isDeleting"
        @click="$emit('confirm')"
      >
        刪除任務
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/molecules/BaseModal.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
import type { Task } from '@/models/Task';

interface Props {
  show: boolean;
  task?: Task;
  isDeleting?: boolean;
  hasRelatedData?: boolean;
}

withDefaults(defineProps<Props>(), {
  isDeleting: false,
  hasRelatedData: false
});

defineEmits<{
  close: [];
  confirm: [];
}>();
</script> 