<template>
    <div class="flex flex-col relative no-scrollbar">
        <!-- 標題列 -->
        <div
            :class="[
                'grid items-center gap-4 px-3 pb-2 text-sm text-neutral-500 border-b border-gray-200',
                gridLayoutClass,
            ]"
        >
            <!-- 左側操作欄位（空白，用於對齊） -->
            <div></div>
            <!-- 對齊 ActionButton 空間 -->
            <div v-if="!showCompleted"></div>

            <!-- 任務標題 -->
            <div class="min-w-0">
                <span>任務</span>
            </div>

            <!-- 標籤欄位 -->
            <div class="min-w-0">
                <span>標籤</span>
            </div>

            <!-- 截止時間欄位（可點擊排序） -->
            <div class="min-w-0">
                <button
                    class="hover:text-gray-900 transition-colors flex items-center gap-1"
                    @click="toggleSort"
                >
                    <span>截止時間</span>
                    <BaseIcon
                        :icon="ICONS.CHEVRON_UP"
                        size="2xs"
                        :class="
                            sortByDueDate ? 'text-primary' : 'text-neutral-400'
                        "
                    />
                </button>
            </div>
        </div>

        <!-- 任務列表 -->
        <TransitionGroup
            tag="div"
            name="task-list"
            class="overflow-y-auto pt-2 no-scrollbar"
            :class="displayTasks.length > 0 ? 'flex-1' : 'h-0'"
        >
            <TaskItem
                v-for="task in displayTasks"
                :key="task.id"
                :task="task"
                :is-active="activeTaskId === task.id"
                :is-session-loading="sessionLoadingTaskId === task.id"
                :is-complete-loading="completeLoadingTaskId === task.id"
                :has-active-session="activeSessionTaskId === task.id"
                :show-actions="!showCompleted"
                @start-session="handleStartSession"
                @end-session="handleEndSession"
                @complete="handleComplete"
                @edit="handleEdit"
            />
            <div key="bottom-spacer" class="h-16"></div>
        </TransitionGroup>

        <!-- 空狀態 -->
        <div
            v-show="displayTasks.length === 0"
            class="text-center py-12 text-gray-500"
        >
            <div class="text-lg font-medium mb-2">
                {{ showCompleted ? "沒有已完成的任務" : "沒有待完成的任務" }}
            </div>
            <div class="text-sm">
                {{
                    showCompleted
                        ? "完成一些任務後就會顯示在這裡"
                        : "建立新任務開始使用吧！"
                }}
            </div>
        </div>

        <div class="absolute bottom-0 left-0 h-16 flex flex-col gap-2 w-full z-10 bg-linear-to-t from-stone-50 to-stone-50/0 from-60%">
            <!-- 底部切換按鈕 -->
            <BaseButton
                variant="dimmed"
                class="w-fit mt-auto"
                size="sm"
                @click="toggleShowCompleted"
            >
                {{ showCompletedButtonText }}
            </BaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { TaskResponse } from "@/types";
import TaskItem from "./TaskItem.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import { ICONS } from "@/constants/icons";

interface Props {
    tasks: TaskResponse[];
    activeTaskId?: number;
    activeSessionTaskId?: number;
    sessionLoadingTaskId?: number;
    completeLoadingTaskId?: number;
}

const props = withDefaults(defineProps<Props>(), {
    tasks: () => [],
});

const emit = defineEmits<{
    startSession: [taskId: number];
    endSession: [taskId: number];
    complete: [taskId: number];
    edit: [task: TaskResponse];
}>();

// 本地狀態
const showCompleted = ref(false);
const sortByDueDate = ref(false);

const gridLayoutClass = computed(() => {
    return showCompleted.value
        ? "grid-cols-[24px_2fr_1fr_minmax(120px,max-content)]"
        : "grid-cols-[24px_32px_2fr_1fr_minmax(120px,max-content)]";
});

// 計算顯示的任務列表
const displayTasks = computed(() => {
    // 根據完成狀態篩選
    const filteredTasks = props.tasks.filter((task) => {
        if (showCompleted.value) {
            return task.status === "COMPLETE";
        } else {
            return task.status === "PENDING";
        }
    });

    // 排序
    if (sortByDueDate.value && !showCompleted.value) {
        return [...filteredTasks].sort((a, b) => {
            // 沒有截止時間的排在最後
            if (!a.dueTime && !b.dueTime) return 0;
            if (!a.dueTime) return 1;
            if (!b.dueTime) return -1;

            // 按截止時間由近到遠排序
            return (
                new Date(a.dueTime).getTime() - new Date(b.dueTime).getTime()
            );
        });
    }

    return filteredTasks;
});

// 切換按鈕文字
const showCompletedButtonText = computed(() => {
    return showCompleted.value ? "顯示待完成任務" : "已完成的任務";
});

// 切換顯示已完成任務
const toggleShowCompleted = () => {
    showCompleted.value = !showCompleted.value;
    // 切換到已完成任務時，重置排序
    if (showCompleted.value) {
        sortByDueDate.value = false;
    }
};

// 切換排序
const toggleSort = () => {
    // 只有在顯示待完成任務時才能排序
    if (!showCompleted.value) {
        sortByDueDate.value = !sortByDueDate.value;
    }
};

// 事件處理
const handleStartSession = (taskId: number) => {
    emit("startSession", taskId);
};

const handleEndSession = (taskId: number) => {
    emit("endSession", taskId);
};

const handleComplete = (taskId: number) => {
    emit("complete", taskId);
};

const handleEdit = (task: TaskResponse) => {
    emit("edit", task);
};
</script>

<style>
.task-list-move,
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.task-list-enter-from,
.task-list-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.task-list-leave-active {
    position: absolute;
    width: 100%;
}
</style>
