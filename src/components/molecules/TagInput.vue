<template>
  <div class="relative" ref="rootEl">
    <div
      @click="toggleDropdown"
      class="block w-full min-h-[42px] p-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white border-stone-300 text-neutral-700 placeholder-neutral-400 flex flex-wrap gap-2 items-center cursor-text"
      :class="{ 'ring-2 ring-primary border-transparent': isOpen }"
      tabindex="0"
    >
      <BaseTag
        v-for="tag in selectedTags"
        :key="tag.id"
        :name="tag.name"
        :color="tag.color"
        removable
        @remove.stop="onRemoveTag(tag)"
      />
      <span v-if="selectedTags.length === 0" class="text-neutral-400">
        選擇標籤...
      </span>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="absolute z-10 w-full mt-1 bg-white border border-stone-300 rounded-lg shadow-lg">
        <ul class="max-h-60 overflow-y-auto py-1">
          <li v-if="availableTags.length === 0" class="px-3 py-2 text-neutral-500 text-sm">
            沒有可用的標籤
          </li>
          <li
            v-for="tag in availableTags"
            :key="tag.id"
            class="px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-2 text-sm"
            @click="onAddTag(tag)"
          >
             <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: tag.color }"></span>
             {{ tag.name }}
          </li>
          <li class="border-t border-stone-200 px-3 py-2 mt-1 hover:bg-primary/10 cursor-pointer text-sm text-primary" @click="onCreateNew">
            + 建立新標籤
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BaseTag from '@/components/atoms/BaseTag.vue';
import type { TagProps } from '@/types/ui/components';

defineProps<{
  selectedTags: TagProps[];
  availableTags: TagProps[];
}>();

const emit = defineEmits<{
  (e: 'add-tag', tag: TagProps): void;
  (e: 'remove-tag', tag: TagProps): void;
  (e: 'create-new'): void;
}>();

const rootEl = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const onAddTag = (tag: TagProps) => {
  emit('add-tag', tag);
};

const onRemoveTag = (tag: TagProps) => {
  emit('remove-tag', tag);
};

const onCreateNew = () => {
  emit('create-new');
  closeDropdown();
}

const handleClickOutside = (event: MouseEvent) => {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script> 