<template>
  <div class="mb-12 p-6 bg-white rounded-lg border border-neutral-300">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-neutral-900 mb-2">{{ title }}</h3>
      <p class="text-sm text-neutral-600">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script> 