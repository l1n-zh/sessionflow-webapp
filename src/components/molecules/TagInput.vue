<template>
    <div class="relative" ref="rootEl">
        <div
            @click="toggleDropdown"
            class="w-full min-h-[42px] p-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white border-stone-300 text-neutral-700 placeholder-neutral-400 flex flex-wrap gap-2 items-center"
            :class="{ 'ring-2 ring-primary border-transparent': isOpen }"
            tabindex="0"
        >
            <BaseTag
                v-for="tag in selectedTags"
                :key="tag.id"
                :name="tag.name"
                :color="tag.color"
                removable
                @remove="onRemoveTag(tag)"
                @click="onEditTag(tag)"
                class="hover:opacity-80 transition-opacity"
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
            <div
                v-if="isOpen"
                class="absolute z-10 w-full mt-1 bg-white border border-stone-300 rounded-lg shadow-lg no-scrollbar"
            >
                <ul class="max-h-60 overflow-y-auto py-1 no-scrollbar">
                    <li
                        v-if="availableTags.length === 0"
                        class="px-3 py-2 text-neutral-500 text-sm"
                    >
                        沒有可用的標籤
                    </li>
                    <li
                        v-for="tag in availableTags"
                        :key="tag.id"
                        class="px-3 py-2 hover:bg-primary/10 flex items-center justify-between text-sm relative"
                        @click="onAddTag(tag)"
                    >
                        <div class="flex items-center gap-2">
                            <span
                                class="w-3 h-3 rounded-full"
                                :style="{ backgroundColor: tag.color }"
                            ></span>
                            <span>{{ tag.name }}</span>
                        </div>
                        <div class="h-8 w-8 flex items-center justify-center absolute right-2 top-[1/2] text-stone-400 hover:text-primary"
                                @click.stop="onEditTag(tag)"
                        >
                            <BaseIcon
                                :icon="ICONS.EDIT"
                                class="w-4 h-4"
                            />
                        </div>
                    </li>
                    <li
                        class="border-t border-stone-200 px-3 py-2 mt-1 hover:bg-primary/10 cursor-pointer text-sm text-primary"
                        @click="onCreateNew"
                    >
                        + 建立新標籤
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import BaseTag from "@/components/atoms/BaseTag.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import { ICONS } from "@/constants/icons";
import type { Tag } from "@/models/Tag";

defineProps<{
    selectedTags: Tag[];
    availableTags: Tag[];
}>();

const emit = defineEmits<{
    (e: "add-tag", tag: Tag): void;
    (e: "remove-tag", tag: Tag): void;
    (e: "create-new"): void;
    (e: "edit-tag", tag: Tag): void;
}>();

const rootEl = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
    isOpen.value = false;
};

const onAddTag = (tag: Tag) => {
    emit("add-tag", tag);
};

const onRemoveTag = (tag: Tag) => {
    emit("remove-tag", tag);
};

const onEditTag = (tag: Tag) => {
    emit("edit-tag", tag);
    closeDropdown();
};

const onCreateNew = () => {
    emit("create-new");
    closeDropdown();
};

onClickOutside(rootEl, closeDropdown);
</script>
