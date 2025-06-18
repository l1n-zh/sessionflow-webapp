<template>
  <div class="flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <BaseIcon :icon="ICONS.NOT_FOUND" size="2xl" class="mx-auto text-neutral-400" />
      </div>
      <h1 class="text-6xl font-bold text-neutral-900 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-neutral-700 mb-4">頁面不存在</h2>
      <p class="text-neutral-600 mb-8 max-w-md mx-auto">
        抱歉，您要尋找的頁面不存在。可能是網址輸入錯誤，或是頁面已被移除。
      </p>
      <BaseButton @click="$router.push('/')">
        回到首頁
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
</script> 