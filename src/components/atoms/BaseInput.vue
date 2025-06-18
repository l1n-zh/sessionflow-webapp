<template>
  <div class="w-full">
    <textarea
      v-if="multiline"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="inputClasses"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <input
      v-else
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id?: string;
  modelValue?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'datetime-local';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  multiline: false,
  rows: 3
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const errorClasses = props.error 
    ? 'border-red-500 text-red-900 placeholder-red-400 focus:ring-red-500' 
    : 'border-stone-300 text-neutral-700 placeholder-neutral-400';
    
  const backgroundClasses = props.multiline 
    ? 'bg-stone-100 px-3 py-2' 
    : 'bg-white px-3 py-2';
  
  return [baseClasses, errorClasses, backgroundClasses].join(' ');
});
</script> 