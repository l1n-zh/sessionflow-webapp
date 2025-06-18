<template>
  <div class="space-y-2">
    <!-- Label -->
    <label 
      v-if="label"
      :for="id"
      class="block text-md text-neutral-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <!-- Input field or slot -->
    <slot>
      <BaseInput
        :id="id"
        :model-value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="!!error"
        :multiline="multiline"
        :rows="rows"
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </slot>
    
    <!-- Error & Help Text -->
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
    <p v-else-if="help" class="text-sm text-neutral-500">
      {{ help }}
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/atoms/BaseInput.vue';

interface Props {
  id?: string;
  label?: string;
  modelValue?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'datetime-local';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  help?: string;
  multiline?: boolean;
  rows?: number;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  multiline: false,
  rows: 3
});

defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();
</script> 