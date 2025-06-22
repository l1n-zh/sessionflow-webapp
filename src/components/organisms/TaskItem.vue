<template>
    <div
        :class="[itemClasses, layoutClasses]"
        class="grid items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer"
        @click="handleItemClick"
    >
        <!-- 完成/取消完成按鈕 -->
        <TaskCompleteButton
            :is-completed="task.isComplete"
            :loading="isCompleteLoading"
            size="md"
            @click.stop="handleComplete"
        />

        <!-- 右側操作按鈕 -->
        <ActionButton
            v-if="showActions"
            :icon="ICONS.SESSION_START"
            variant="secondary"
            size="md"
            @click.stop="handleSessionStart"
        />

        <!-- 任務標題 -->
        <div class="min-w-0">
            <h3 class="text-md text-neutral-800 truncate">
                {{ task.title }}
            </h3>
        </div>

        <!-- 標籤 -->
        <div class="flex gap-1 flex-wrap min-w-0">
            <BaseTag
                v-for="tag in task.tags"
                :key="tag.id"
                :name="tag.name"
                :color="tag.color"
                size="sm"
            />
        </div>

        <!-- 截止時間 -->
        <div class="min-w-0">
            <span
                v-if="task.dueAt"
                :class="dueDateClasses"
                class="text-sm"
            >
                {{ formattedDueDate }}
            </span>
            <span v-else class="text-sm text-neutral-400"> 無截止時間 </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Task } from "@/models/Task";
import ActionButton from "@/components/atoms/ActionButton.vue";
import TaskCompleteButton from "@/components/molecules/TaskCompleteButton.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";
import { formatDueDate } from "@/utils/dateFormatter";
import { ICONS } from "@/constants/icons";
import { useSessionModals } from '@/composables/useSessionModals';

interface Props {
    task: Task;
    isActive?: boolean;
    isCompleteLoading?: boolean;
    showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    isCompleteLoading: false,
    showActions: true,
});

const emit = defineEmits<{
    complete: [taskId: number];
    reopen: [taskId: number];
    edit: [task: Task];
}>();

const { openCreateModal } = useSessionModals();

// 計算樣式類別
const layoutClasses = computed(() => {
    return props.showActions
        ? "grid-cols-[24px_32px_2fr_1fr_minmax(90px,max-content)]"
        : "grid-cols-[24px_2fr_1fr_minmax(90px,max-content)]";
});

const itemClasses = computed(() => {
    return props.isActive
        ? "border-primary bg-primary/10"
        : "border-gray-200 hover:border-gray-300 hover:bg-primary/10 active:border-primary";
});

// Session 按鈕
const handleSessionStart = () => {
    openCreateModal(props.task);
};

// 截止日期格式化
const formattedDueDate = computed(() => {
    return props.task.dueAt ? formatDueDate(props.task.dueAt) : "";
});

// 截止日期樣式
const dueDateClasses = computed(() => {
    if (!props.task.dueAt) return "text-neutral-500";

    const date = props.task.dueAt;
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return "text-red-600"; // 逾期
    } else if (diffDays <= 1) {
        return "text-red-400 font-medium"; // 今天或明天到期
    } 

    return "text-neutral-600"; // 正常
});

// 處理任務完成/重開
const handleComplete = () => {
    if (props.task.isComplete) {
        emit("reopen", props.task.id);
    } else {
        emit("complete", props.task.id);
    }
};

// 處理點擊任務項目
const handleItemClick = (event: MouseEvent) => {
    // 避免點擊按鈕時觸發
    if ((event.target as HTMLElement).closest("button")) {
        return;
    }
    emit("edit", props.task);
};
</script>
