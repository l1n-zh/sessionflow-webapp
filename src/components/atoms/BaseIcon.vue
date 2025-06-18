<template>
  <v-icon
    :icon="icon"
    :size="sizeValue"
    :class="props.class"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconName } from '@/constants/icons';

interface Props {
  /** Icon 名稱，建議使用 ICONS 常數或 FontAwesome 格式 */
  icon: IconName | string;
  /** Icon 大小 */
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

// 統一的大小映射
const sizeValue = computed(() => {
  const sizeMap = {
    '2xs': 6,
    xs: 8,
    sm: 10,
    md: 14,
    lg: 16,
    xl: 24,
    '2xl': 30,
  };
  return sizeMap[props.size];
});
</script> 