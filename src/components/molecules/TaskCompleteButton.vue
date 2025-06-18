<template>
  <button
    ref="buttonRef"
    :class="buttonClasses"
    :disabled="loading"
    @click="handleClick"
  >
      <!-- 實心擴散效果背景 -->
      <div
        v-if="isAnimating && !isCompleted"
        class="absolute inset-0 rounded-full bg-primary animate-expand"
      />
      
      <!-- Icon -->
      <BaseIcon
        :icon="isCompleted ? ICONS.TASK_REOPEN : ICONS.TASK_COMPLETE"
        :size="iconSize"
        :class="iconClasses"
      />
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';

interface Props {
  /** 是否為已完成狀態 */
  isCompleted?: boolean;
  /** 載入狀態 */
  loading?: boolean;
  /** 按鈕大小 */
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  isCompleted: false,
  loading: false,
  size: 'sm',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonRef = ref<HTMLButtonElement>();
const isAnimating = ref(false);

// 按鈕樣式
const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-2 relative overflow-hidden';
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7', 
    lg: 'w-8 h-8',
  };
  
  const stateClasses = props.isCompleted
    ? 'border-primary bg-transparent text-primary hover:bg-primary/10'
    : 'border-primary bg-transparent text-primary hover:bg-primary/10';
  
  return [baseClasses, sizeClasses[props.size], stateClasses].join(' ');
});

// Icon 大小
const iconSize = computed(() => {
  const sizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  };
  return sizeMap[props.size];
});

// Icon 樣式 - 只有將已完成任務標記為未完成時才旋轉
const iconClasses = computed(() => {
  const shouldRotate = isAnimating.value && props.isCompleted;
  return shouldRotate ? 'transition-transform duration-300 -rotate-180 z-10 relative' : 'z-10 relative transition-transform duration-300';
});

// 處理點擊
const handleClick = async (event: MouseEvent) => {
  if (props.loading) return;
  
  // 觸發動畫
  isAnimating.value = true;
  
  // 發送事件
  emit('click', event);
  
  // 600ms 後停止動畫
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};
</script>

<style scoped>
@keyframes expand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}


.animate-expand {
  animation: expand 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

</style> 