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
                    class="hover:text-neutral-800 transition-colors flex items-center gap-1"
                    @click="toggleSort"
                >
                    <span>截止時間</span>
                    <BaseIcon :icon="ICONS.CHEVRON_UP" size="sm" :class="sortByDueDate ? 'text-primary' : ''" />
                </button>
            </div>
        </div>

        <!-- 任務列表 -->
        <TransitionGroup
            tag="div"
            name="task-list"
            class="relative overflow-y-auto pt-2 no-scrollbar"
            :class="displayTasks.length > 0 ? 'flex-1' : 'h-0'"
        >
            <TaskItem
                v-for="task in displayTasks"
                :key="task.id"
                :task="getTaskForDisplay(task)"
                :is-active="activeTaskId === task.id"
                :is-session-loading="sessionLoadingTaskId === task.id"
                :is-complete-loading="completeLoadingTaskId === task.id"
                :has-active-session="activeSessionTaskId === task.id"
                :show-actions="!showCompleted"
                @start-session="handleStartSession"
                @end-session="handleEndSession"
                @complete="handleComplete"
                @reopen="handleReopen"
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

        <div
            class="absolute bottom-0 left-0 h-16 flex flex-col gap-2 w-full z-10 bg-linear-to-t from-stone-50 to-stone-50/0 from-60%"
        >
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
import { computed, ref, nextTick } from "vue";
import type { Task } from "@/models/Task";
import TaskItem from "./TaskItem.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import { ICONS } from "@/constants/icons";

interface Props {
    tasks: Task[];
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
    reopen: [taskId: number];
    edit: [task: Task];
}>();

// 本地狀態
const showCompleted = ref(false);
const sortByDueDate = ref(false);
// 追蹤正在進行動畫的任務ID和動畫類型
const animatingTaskIds = ref<Map<number, "completing" | "reopening">>(
    new Map()
);

const gridLayoutClass = computed(() => {
    return showCompleted.value
        ? "grid-cols-[24px_2fr_1fr_minmax(120px,max-content)]"
        : "grid-cols-[24px_32px_2fr_1fr_minmax(120px,max-content)]";
});

// 計算顯示的任務列表
const displayTasks = computed(() => {
    // 根據完成狀態篩選
    let filteredTasks = props.tasks.filter((task) => {
        // 如果任務正在進行動畫，根據動畫類型決定顯示位置
        if (animatingTaskIds.value.has(task.id)) {
            const animationType = animatingTaskIds.value.get(task.id);
            if (animationType === "completing") {
                // completing動畫：保持在待完成列表直到動畫結束
                return !showCompleted.value;
            } else if (animationType === "reopening") {
                // reopening動畫：保持在已完成列表直到動畫結束
                return showCompleted.value;
            }
        }

        if (showCompleted.value) {
            return task.isComplete;
        } else {
            return !task.isComplete;
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
            return a.dueTime.getTime() - b.dueTime.getTime();
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

const handleComplete = async (taskId: number) => {
    // 標記任務為completing動畫中
    animatingTaskIds.value.set(taskId, "completing");

    // 立即觸發完成操作
    emit("complete", taskId);

    // 等待下一個tick確保DOM更新
    await nextTick();

    // 延遲移除動畫標記，讓動畫有時間完成
    setTimeout(() => {
        animatingTaskIds.value.delete(taskId);
    }, 200);
};

const handleReopen = async (taskId: number) => {
    animatingTaskIds.value.set(taskId, "reopening");
    emit("reopen", taskId);
    await nextTick();
    setTimeout(() => {
        animatingTaskIds.value.delete(taskId);
    }, 200);
};

const handleEdit = (task: Task) => {
    emit("edit", task);
};

const getTaskForDisplay = (task: Task): Task => {
    // 如果任務正在進行動畫，返回帶有原始狀態的任務副本
    if (animatingTaskIds.value.has(task.id)) {
        const animationType = animatingTaskIds.value.get(task.id);
        // 創建任務副本，保持動畫前的狀態
        const taskCopy = Object.create(Object.getPrototypeOf(task));
        Object.assign(taskCopy, task);

        if (animationType === "completing") {
            // completing動畫：保持PENDING狀態，讓按鈕顯示完成圖標並播放擴散動畫
            taskCopy.status = "PENDING";
        } else if (animationType === "reopening") {
            // reopening動畫：保持COMPLETE狀態，讓按鈕顯示重開圖標並播放旋轉動畫
            taskCopy.status = "COMPLETE";
        }

        return taskCopy;
    }
    return task;
};
</script>

<style>
.task-list-move,
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.4s ease-in-out;
}

.task-list-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.task-list-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.task-list-leave-active {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
}

.task-list-move {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
