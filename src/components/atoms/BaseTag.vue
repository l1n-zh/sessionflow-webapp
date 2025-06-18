<template>
  <span :class="tagClasses">
    <span class="truncate">{{ name }}</span>
    <button
      v-if="removable"
      type="button"
      class="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-black/10  focus:outline-none focus:bg-black/10"
      :class="removeButtonClasses"
      @click="$emit('remove', id)"
    >
      <BaseIcon :icon="ICONS.CLOSE" size="xs" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TagProps } from '@/types';
import BaseIcon from './BaseIcon.vue';
import { ICONS } from '@/constants/icons';

interface Props extends TagProps {}

const props = withDefaults(defineProps<Props>(), {
  removable: false,
  size: 'md'
});

defineEmits<{
  remove: [id?: number];
}>();

// Map hex colors to Tailwind classes
const colorMap: Record<string, string> = {
  '#fecaca': 'bg-red-200 text-red-800',
  '#fed7aa': 'bg-orange-200 text-orange-800',
  '#fef3c7': 'bg-yellow-200 text-yellow-800',
  '#d9f99d': 'bg-lime-200 text-lime-800',
  '#a7f3d0': 'bg-emerald-200 text-emerald-800',
  '#a5f3fc': 'bg-cyan-200 text-cyan-800',
  '#bfdbfe': 'bg-blue-200 text-blue-800',
  '#c4b5fd': 'bg-violet-200 text-violet-800',
  '#f0abfc': 'bg-fuchsia-200 text-fuchsia-800',
  '#e5e7eb': 'bg-gray-200 text-gray-800'
};

const tagClasses = computed(() => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  
  const colorClasses = colorMap[props.color] || 'bg-gray-200 text-gray-800';
  
  return [baseClasses, sizeClasses[props.size], colorClasses].join(' ');
});

const removeButtonClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  return sizeClasses[props.size];
});
</script> 