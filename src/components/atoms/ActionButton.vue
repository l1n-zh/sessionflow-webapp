<template>
    <button
        :class="buttonClasses"
        :disabled="props.disabled || props.loading"
        @click="$emit('click', $event)"
    >
        <div v-if="props.loading" class="flex items-center justify-center">
            <BaseIcon 
                :icon="ICONS.LOADING" 
                :size="iconSize" 
                animated 
            />
        </div>
        <div v-else class="flex items-center justify-center">
            <BaseIcon 
                v-if="props.icon" 
                :icon="props.icon" 
                :size="iconSize"
            />
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { ICONS } from "@/constants/icons";

interface Props {
    icon?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
});

defineEmits<{
    click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-2";

    // Size classes - 使用固定尺寸確保一致性
    const sizeClasses = {
        xs: "w-4 h-4",
        sm: "w-6 h-6", 
        md: "w-7 h-7",
        lg: "w-8 h-8",
        xl: "w-10 h-10",
    };

    // Variant classes
    const variantClasses = {
        primary:
            "border-primary bg-primary/100 text-white hover:bg-primary-dark",
        secondary:
            "border-primary bg-primary/20 text-primary hover:bg-primary/30",
        outline:
            "border-primary bg-transparent text-primary hover:bg-primary/10",
    };

    return [
        baseClasses,
        sizeClasses[props.size],
        variantClasses[props.variant],
    ].join(" ");
});

const iconSize = computed(() => {
    const iconSizeMap = {
        xs: 'xs' as const,
        sm: 'sm' as const,
        md: 'md' as const,
        lg: 'lg' as const,
        xl: 'xl' as const,
    };
    return iconSizeMap[props.size];
});
</script>
