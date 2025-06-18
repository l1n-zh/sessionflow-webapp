<template>
  <BaseModal 
    :show="show" 
    :title="title" 
    @close="$emit('close')"
  >
    <template #header-icon>
      <BaseIcon :icon="ICONS.EDIT" class="text-neutral-500" />
    </template>
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
        label="顏色"
        v-model="tagColor"
        placeholder="例如 FFFfff"
        class="w-[8em]"
        :error="errors.color"
      >
        <template #prepend>
          <span class="inline-flex items-center px-3 border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm rounded-l-md">
            #
          </span>
        </template>
        <template #append>
          <div 
            class="w-6 h-6 rounded-md border border-neutral-300 ml-2" 
            :style="{ backgroundColor: formattedColor }"
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
            :class="[color.bg, tagColor.toLowerCase() === color.hex.toLowerCase() ? ['border-2', color.border]:'']"
            @click="selectColor(color.hex)"
          ></button>
        </div>
      </div>
    </form>
    
    <template #footer>
      <div class="flex items-center justify-between w-full">
        <BaseButton
          type="button"
          variant="danger"
          @click="tag && $emit('delete', tag)"
        >
          <BaseIcon :icon="ICONS.DELETE" />
          <span class="ml-2">刪除</span>
        </BaseButton>
        <div class="flex items-center gap-3">
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
            儲存變更
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';
import type { Tag } from '@/models/Tag';
import type { TagUpdateFormData } from '@/types/ui/forms';

interface Props {
  show: boolean;
  tag: Tag | null;
  existingTagNames: string[];
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', data: TagUpdateFormData): void;
  (e: 'delete', tag: Tag): void;
}>();

const tagName = ref('');
const tagColor = ref('');
const errors = ref({ name: '', color: '' });

const title = computed(() => `編輯標籤：${props.tag?.name || ''}`);

const colorPalette = [
  { name: 'red', hex: 'fecaca', bg: 'bg-red-200', border: 'border-red-400' },
  { name: 'orange', hex: 'fed7aa', bg: 'bg-orange-200', border: 'border-orange-400' },
  { name: 'yellow', hex: 'fef3c7', bg: 'bg-yellow-200', border: 'border-yellow-400' },
  { name: 'lime', hex: 'd9f99d', bg: 'bg-lime-200', border: 'border-lime-400' },
  { name: 'emerald', hex: 'a7f3d0', bg: 'bg-emerald-200', border: 'border-emerald-400' },
  { name: 'cyan', hex: 'a5f3fc', bg: 'bg-cyan-200', border: 'border-cyan-400' },
  { name: 'blue', hex: 'bfdbfe', bg: 'bg-blue-200', border: 'border-blue-400' },
  { name: 'violet', hex: 'c4b5fd', bg: 'bg-violet-200', border: 'border-violet-400' },
  { name: 'fuchsia', hex: 'f0abfc', bg: 'bg-fuchsia-200', border: 'border-fuchsia-400' },
  { name: 'gray', hex: 'e5e7eb', bg: 'bg-gray-200', border: 'border-gray-400' },
];

const isHexColor = (hex: string) => /^([0-9A-F]{6})$/i.test(hex);

const formattedColor = computed(() => {
  return isHexColor(tagColor.value) ? `#${tagColor.value}` : 'transparent';
});

const validate = () => {
  errors.value = { name: '', color: '' };
  if (!tagName.value.trim()) {
    errors.value.name = '標籤名稱為必填項目';
  } else if (props.existingTagNames.includes(tagName.value.trim().toLowerCase()) && tagName.value.trim().toLowerCase() !== props.tag?.name.toLowerCase()) {
    errors.value.name = '此標籤名稱已存在';
  }
  
  if (tagColor.value && !isHexColor(tagColor.value)) {
    errors.value.color = '請輸入有效的 6 位十六進位色碼';
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
  if (!validate() || !props.tag) {
    return;
  }
  
  const updatedData: TagUpdateFormData = {
    id: props.tag.id,
    name: tagName.value.trim(),
    color: `#${tagColor.value}`
  };

  emit('update', updatedData);
};

watch(() => props.tag, (newTag) => {
  if (newTag) {
    tagName.value = newTag.name;
    tagColor.value = newTag.color.startsWith('#') ? newTag.color.substring(1) : newTag.color;
    errors.value = { name: '', color: '' };
  }
}, { immediate: true });
</script> 