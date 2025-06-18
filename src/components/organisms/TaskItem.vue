<template>
    <div
        :class="[itemClasses, layoutClasses]"
        class="grid items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer"
        @click="handleItemClick"
    >
        <!-- 完成/取消完成按鈕 -->
        <TaskCompleteButton
            :is-completed="task.status === 'COMPLETE'"
            :loading="isCompleteLoading"
            size="md"
            @click.stop="handleComplete"
        />

        <!-- 左側操作按鈕 -->
        <ActionButton
            v-if="showActions"
            :icon="sessionButtonIcon"
            :variant="hasActiveSession ? 'primary' : 'secondary'"
            size="md"
            :loading="isSessionLoading"
            @click.stop="handleSessionToggle"
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
                v-if="task.dueTime"
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
import type { TaskResponse } from "@/types";
import ActionButton from "@/components/atoms/ActionButton.vue";
import TaskCompleteButton from "@/components/molecules/TaskCompleteButton.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";
import { formatDueDate } from "@/utils/dateFormatter";
import { ICONS } from "@/constants/icons";

interface Props {
    task: TaskResponse;
    isActive?: boolean;
    isSessionLoading?: boolean;
    isCompleteLoading?: boolean;
    hasActiveSession?: boolean;
    showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    isSessionLoading: false,
    isCompleteLoading: false,
    hasActiveSession: false,
    showActions: true,
});

const emit = defineEmits<{
    startSession: [taskId: number];
    endSession: [taskId: number];
    complete: [taskId: number];
    edit: [task: TaskResponse];
}>();

// 計算樣式類別
const layoutClasses = computed(() => {
    return props.showActions
        ? "grid-cols-[24px_32px_2fr_1fr_minmax(120px,max-content)]"
        : "grid-cols-[24px_2fr_1fr_minmax(120px,max-content)]";
});

const itemClasses = computed(() => {
    return props.isActive
        ? "border-primary bg-primary/10"
        : "border-gray-200 hover:border-gray-300 hover:bg-primary/10 active:border-primary";
});

// Session 按鈕圖示
const sessionButtonIcon = computed(() => {
    return props.hasActiveSession ? ICONS.SESSION_END : ICONS.SESSION_START;
});

// 截止日期格式化
const formattedDueDate = computed(() => {
    return props.task.dueTime ? formatDueDate(props.task.dueTime) : "";
});

// 截止日期樣式
const dueDateClasses = computed(() => {
    if (!props.task.dueTime) return "text-neutral-500";

    const date = new Date(props.task.dueTime);
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

// 處理 Session 開始/結束
const handleSessionToggle = () => {
    if (props.hasActiveSession) {
        emit("endSession", props.task.id);
    } else {
        emit("startSession", props.task.id);
    }
};

// 處理任務完成
const handleComplete = () => {
    emit("complete", props.task.id);
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
