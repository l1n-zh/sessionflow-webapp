<template>
  <div class="bg-stone-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <BaseIcon :icon="ICONS.RECORDS" size="2xl" class="mx-auto text-neutral-400" />
        <h3 class="mt-2 text-lg font-medium text-neutral-900">階段紀錄</h3>
        <p class="mt-1 text-sm text-neutral-500">此功能正在開發中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
// TODO: Implement session records functionality
</script> 