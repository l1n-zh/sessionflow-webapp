<template>
  <BaseModal title="建立新標籤" :show="show" @close="$emit('close')">
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Tag Name -->
      <FormField
        id="tagName"
        label="標籤名稱"
        v-model="tagName"
        placeholder="輸入標籤名稱..."
        required
        :error="errors.name"
      />

      <!-- Tag Color -->
      <FormField
        id="tagColor"
        label="顏色 (選填)"
        v-model="tagColor"
        placeholder="#"
        :error="errors.color"
      >
        <template #prepend>
          <span class="inline-flex items-center px-3 border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm rounded-l-md">
            #
          </span>
        </template>
        <template #append>
          <div 
            class="w-6 h-6 rounded-md border border-neutral-300" 
            :style="{ backgroundColor: isHexColor(tagColor) ? `#${tagColor}` : 'transparent' }"
          ></div>
        </template>
      </FormField>

      <!-- Color Palette -->
      <div>
        <div class="grid grid-cols-5 gap-3">
          <button
            v-for="color in colorPalette"
            :key="color.name"
            type="button"
            class="w-full h-8 rounded-md transition-transform duration-100 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :class="[color.bg, color.border, { 'ring-2 ring-offset-2 ring-primary': tagColor === color.hex }]"
            :style="{ backgroundColor: color.hexCode, borderColor: color.borderHex }"
            @click="selectColor(color.hex)"
          ></button>
        </div>
      </div>
    </form>
    
    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <BaseButton
          type="button"
          variant="secondary"
          @click="$emit('close')"
        >
          取消
        </BaseButton>
        <BaseButton
          type="submit"
          :loading="isSubmitting"
          :disabled="!isFormValid"
          @click="submitForm"
        >
          建立
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import type { TagCreateFormData } from '@/types/ui/forms';

interface Props {
  show: boolean;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', data: TagCreateFormData): void;
}>();

const tagName = ref('');
const tagColor = ref('');
const errors = ref({ name: '', color: '' });

const colorPalette = [
  { name: 'red', hex: 'fecaca', hexCode: '#fecaca', borderHex: '#fca5a5', bg: 'bg-red-200', border: 'border-red-300' },
  { name: 'orange', hex: 'fed7aa', hexCode: '#fed7aa', borderHex: '#fdba74', bg: 'bg-orange-200', border: 'border-orange-300' },
  { name: 'yellow', hex: 'fef08a', hexCode: '#fef08a', borderHex: '#fde047', bg: 'bg-yellow-200', border: 'border-yellow-300' },
  { name: 'lime', hex: 'd9f99d', hexCode: '#d9f99d', borderHex: '#bef264', bg: 'bg-lime-200', border: 'border-lime-300' },
  { name: 'emerald', hex: 'a7f3d0', hexCode: '#a7f3d0', borderHex: '#6ee7b7', bg: 'bg-emerald-200', border: 'border-emerald-300' },
  { name: 'cyan', hex: 'a5f3fc', hexCode: '#a5f3fc', borderHex: '#67e8f9', bg: 'bg-cyan-200', border: 'border-cyan-300' },
  { name: 'blue', hex: 'bfdbfe', hexCode: '#bfdbfe', borderHex: '#93c5fd', bg: 'bg-blue-200', border: 'border-blue-300' },
  { name: 'violet', hex: 'ddd6fe', hexCode: '#ddd6fe', borderHex: '#c4b5fd', bg: 'bg-violet-200', border: 'border-violet-300' },
  { name: 'fuchsia', hex: 'f5d0fe', hexCode: '#f5d0fe', borderHex: '#f0abfc', bg: 'bg-fuchsia-200', border: 'border-fuchsia-300' },
  { name: 'gray', hex: 'e5e7eb', hexCode: '#e5e7eb', borderHex: '#d1d5db', bg: 'bg-gray-200', border: 'border-gray-300' },
];


const isHexColor = (hex: string) => /^([0-9A-F]{3}){1,2}$/i.test(hex);

const validate = () => {
  errors.value = { name: '', color: '' };
  if (!tagName.value.trim()) {
    errors.value.name = '標籤名稱為必填項目';
  }
  if (tagColor.value && !isHexColor(tagColor.value)) {
    errors.value.color = '請輸入有效的十六進位色碼';
  }
  return !errors.value.name && !errors.value.color;
};

const isFormValid = computed(() => {
  return tagName.value.trim() !== '' && (tagColor.value === '' || isHexColor(tagColor.value));
});

const selectColor = (hex: string) => {
  tagColor.value = hex;
};

const submitForm = () => {
  if (!validate()) {
    return;
  }
  
  const newTag: TagCreateFormData = {
    name: tagName.value,
  };

  if (tagColor.value) {
    newTag.color = `#${tagColor.value}`;
  }

  emit('create', newTag);
};
</script>
