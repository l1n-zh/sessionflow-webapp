<template>
  <BaseModal
    :show="show"
    title="刪除標籤"
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
            確定要刪除這個標籤嗎？
          </h3>
          <p class="text-sm text-neutral-600 mb-4">
            標籤「<strong>{{ tag?.name }}</strong>」將被永久刪除，此操作無法復原。
          </p>
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
        刪除標籤
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/molecules/BaseModal.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
import type { Tag } from '@/models/Tag';

interface Props {
  show: boolean;
  tag: Tag | null;
  isDeleting?: boolean;
}

withDefaults(defineProps<Props>(), {
  isDeleting: false
});

defineEmits<{
  close: [];
  confirm: [];
}>();
</script> 