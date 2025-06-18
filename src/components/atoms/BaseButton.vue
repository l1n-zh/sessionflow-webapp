<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <div v-if="loading" class="flex items-center justify-center">
      <BaseIcon :icon="ICONS.LOADING" size="2xs" class="mr-1" animated />
      載入中...
    </div>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from '@/types/ui/components';
import BaseIcon from './BaseIcon.vue';
import { ICONS } from '@/constants/icons';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary/100 text-white hover:bg-primary-dark',
    secondary: 'bg-transparent text-primary border border-primary hover:bg-primary/5',
    danger: 'bg-transparent border border-red-500 text-red-500 hover:bg-red-50',
    dimmed: 'bg-stone-100 text-neutral-500 border border-stone-300 hover:bg-stone-200'
  };
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ');
});
</script> 