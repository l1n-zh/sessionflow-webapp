<template>
    <label class="flex items-center cursor-pointer select-none">
        <input
            type="checkbox"
            :checked="modelValue"
            @change="handleChange"
            class="hidden"
        />
        <div
            :class="[
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
                modelValue
                    ? 'bg-primary border-primary'
                    : 'bg-white border-neutral-400 group-hover:border-primary',
            ]"
        >
            <BaseIcon
                v-if="modelValue"
                :icon="ICONS.CHECK"
                size="sm"
                class="text-white"
            />
        </div>
        <span v-if="label" class="ml-2 text-neutral-700">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
import { ICONS } from '@/constants/icons';

interface Props {
    modelValue: boolean;
    label?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
};
</script> 