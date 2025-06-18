<template>
  <span :class="tagClasses" :style="tagStyles">
    <span class="truncate">{{ name }}</span>
    <button
      v-if="removable"
      type="button"
      class="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:bg-black/10"
      :class="removeButtonClasses"
      @click.stop="$emit('remove')"
    >
      <BaseIcon :icon="ICONS.CLOSE" :style="{ color: tagStyles.color }" size="xs" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
import type { Tag } from '@/models/Tag';

interface Props {
  name: Tag['name'];
  color: Tag['color'];
  removable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  removable: false,
  size: 'md',
  color: '#e5e7eb' // Default to gray-200
});

defineEmits<{
  remove: [];
}>();

const getContrastColor = (hex: string): string => {
  if (!hex) return '#374151'; // neutral-700
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#374151' : '#ffffff'; // neutral-700 for light bg, white for dark bg
};

const tagStyles = computed(() => ({
  backgroundColor: props.color,
  color: getContrastColor(props.color)
}));

const tagClasses = computed(() => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
    
  return [baseClasses, sizeClasses[props.size]].join(' ');
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