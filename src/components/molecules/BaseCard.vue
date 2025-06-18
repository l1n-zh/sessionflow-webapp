<template>
  <div :class="cardClasses">
    <!-- Header -->
    <div v-if="title || $slots.header" class="px-6 py-4">
      <slot name="header">
        <h3 class="text-xl font-semibold text-neutral-800">
          {{ title }}
        </h3>
      </slot>
    </div>
    
    <!-- Body -->
    <div class="px-6 py-4">
      <slot />
    </div>
    
    <!-- Footer/Actions -->
    <div v-if="$slots.actions" class="px-6 py-4 bg-stone-100/50">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md'
});

const cardClasses = computed(() => {
  const baseClasses = 'bg-stone-50 rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'border border-neutral-300',
    elevated: 'shadow-lg border border-neutral-200',
    outlined: 'border-2 border-neutral-300'
  };
  
  const paddingClasses = {
    none: '[&>div]:p-0',
    sm: '[&>div]:px-4 [&>div]:py-2',
    md: '[&>div]:px-6 [&>div]:py-4',
    lg: '[&>div]:px-8 [&>div]:py-6'
  };
  
  return [
    baseClasses,
    variantClasses[props.variant],
    paddingClasses[props.padding]
  ].join(' ');
});
</script> 