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
        class="w-[6em]"
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
            class="w-full h-8 rounded-md transition-transform duration-100 ease-in-out hover:scale-110 focus:outline-none"
            :class="[color.bg, tagColor === color.hex ? ['border-2', color.border]:'']"
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
  existingTagNames?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
  existingTagNames: () => []
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', data: TagCreateFormData): void;
}>();

const tagName = ref('');
const tagColor = ref('');
const errors = ref({ name: '', color: '' });

const colorPalette = [
  { name: 'red', hex: 'FFE2E2', bg: 'bg-red-100', border: 'border-red-300' },
  { name: 'orange', hex: 'FFEDD4', bg: 'bg-orange-100', border: 'border-orange-300' },
  { name: 'yellow', hex: 'FEF9C2', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  { name: 'lime', hex: 'ECFCCA', bg: 'bg-lime-100', border: 'border-lime-300' },
  { name: 'emerald', hex: 'D0FAE5', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  { name: 'cyan', hex: 'CEFAFE', bg: 'bg-cyan-100', border: 'border-cyan-300' },
  { name: 'blue', hex: 'DBEAFE', bg: 'bg-blue-100', border: 'border-blue-300' },
  { name: 'violet', hex: 'DDD6FE', bg: 'bg-violet-100', border: 'border-violet-300' },
  { name: 'fuchsia', hex: 'FAE8FF', bg: 'bg-fuchsia-100', border: 'border-fuchsia-300' },
  { name: 'gray', hex: 'F3F4F6', bg: 'bg-gray-100', border: 'border-gray-300' },
];


const isHexColor = (hex: string) => /^([0-9A-F]{6})$/i.test(hex);

const validate = () => {
  errors.value = { name: '', color: '' };
  if (!tagName.value.trim()) {
    errors.value.name = '標籤名稱為必填項目';
  } else if (props.existingTagNames?.includes(tagName.value.trim().toLowerCase())) {
    errors.value.name = '此標籤名稱已存在';
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
    name: tagName.value.trim(),
  };

  if (tagColor.value) {
    newTag.color = `#${tagColor.value}`;
  }

  emit('create', newTag);
};
</script>
