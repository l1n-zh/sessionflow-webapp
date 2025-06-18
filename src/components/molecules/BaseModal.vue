<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/20 transition-opacity" @click="handleBackdropClick" />
        
        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="show"
              :class="modalClasses"
              @click.stop
            >
              <!-- Header -->
              <div v-if="title || $slots.header" class="flex items-center justify-between p-6">
                <div class="flex items-center">
                  <slot name="header">
                    <h3 class="text-xl font-semibold text-neutral-800">
                      {{ title }}
                    </h3>
                  </slot>
                </div>
                <button
                  type="button"
                  class="text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600 transition-colors"
                  @click="$emit('close')"
                >
                  <BaseIcon :icon="ICONS.CLOSE" size="xl" />
                </button>
              </div>
              
              <!-- Body -->
              <div class="px-6">
                <slot />
              </div>
              
              <!-- Footer -->
              <div v-if="$slots.footer" class="flex items-center justify-end gap-3 p-6">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import type { ModalProps } from '@/types';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';

interface Props extends ModalProps {}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  size: 'md'
});

const emit = defineEmits<{
  close: [];
}>();

const modalClasses = computed(() => {
  const baseClasses = 'relative bg-stone-50 rounded-lg shadow-xl border border-neutral-300 w-full';
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return [baseClasses, sizeClasses[props.size]].join(' ');
});

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
});
</script> 