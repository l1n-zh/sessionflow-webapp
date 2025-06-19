<template>
  <label 
    :class="labelClasses"
    :data-completed="isCompleted"
    class="task-complete-button inline-flex items-center justify-center font-medium rounded-full cursor-pointer border-2 relative overflow-hidden transition-all duration-300 focus-within:outline-none"
    @click.stop
  >
    <!-- 隱藏的原生checkbox -->
    <input
      type="checkbox"
      :checked="isCompleted"
      :disabled="loading"
      @change="handleChange"
      class="sr-only"
    />
    
    <!-- 擴散動畫背景 - 只在未完成狀態點擊時出現 -->
    <div class="expand-bg absolute inset-0 rounded-full bg-primary opacity-0" />
    
    <!-- Icon容器 - 確保完全居中 -->
    <div class="icon-container absolute inset-0 flex items-center justify-center transition-transform duration-300">
      <BaseIcon
        :icon="isCompleted ? ICONS.TASK_REOPEN : ICONS.TASK_COMPLETE"
        :size="iconSize"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
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

// 動畫狀態
const isAnimating = ref(false);

// Label樣式
const labelClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7', 
    lg: 'w-8 h-8',
  };
  
  const baseClasses = 'border-primary bg-transparent text-primary hover:bg-primary/10';
  const disabledClasses = props.loading ? 'opacity-50 cursor-not-allowed' : '';
  const animatingClasses = isAnimating.value ? 'animating' : '';
  
  return [sizeClasses[props.size], baseClasses, disabledClasses, animatingClasses].filter(Boolean).join(' ');
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

// 處理checkbox變化
const handleChange = async (event: Event) => {
  if (props.loading) return;
  
  // 阻止事件冒泡
  event.stopPropagation();
  
  // 觸發動畫
  isAnimating.value = true;
  
  // 轉換為MouseEvent格式以保持API一致性
  const mouseEvent = new MouseEvent('click', {
    bubbles: false, // 不冒泡
    cancelable: true,
  });
  
  emit('click', mouseEvent);
  
  // 等待動畫完成後重置狀態
  await nextTick();
  setTimeout(() => {
    isAnimating.value = false;
  }, 400);
};
</script>

<style scoped>
/* 完成任務時的擴散動畫 */
@keyframes expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  40%, 100% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 重開任務時的旋轉動畫 */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
  }
}

/* 未完成狀態點擊時的擴散效果 */
.task-complete-button[data-completed="false"].animating .expand-bg {
  animation: expand 0.3s linear forwards;
}
.task-complete-button[data-completed="false"].animating {
  transition: color 0.3s linear;
  color:white !important;
}

/* 已完成狀態點擊時的旋轉效果 */
.task-complete-button[data-completed="true"].animating .icon-container {
  animation: rotate 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 禁用狀態時不觸發動畫 */
.task-complete-button.opacity-50.animating .expand-bg,
.task-complete-button.opacity-50.animating .icon-container {
  animation: none;
}

/* 額外的視覺反饋 - 懸停時輕微放大 */
.task-complete-button:hover:not(.opacity-50) {
  transform: scale(1.05);
}

/* 按下時的反饋 */
.task-complete-button:active:not(.opacity-50) {
  transform: scale(0.95);
}
</style> 