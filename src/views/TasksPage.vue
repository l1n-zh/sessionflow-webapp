<template>
    <div
        class="bg-stone-50 border border-neutral-300 rounded-xl pb-0 flex flex-col h-full"
    >
        <!-- Task list -->
        <TaskList
            class="flex-1 overflow-y-auto m-4 mt-3"
            :tasks="taskStore.filteredTasks"
            @edit="handleTaskEdit"
            @complete="handleTaskComplete"
        />

        <!-- Modals -->
        <TaskModal
            :show="showCreateModal"
            :is-submitting="isSubmitting"
            @close="closeCreateModal"
            @submit="handleCreateTaskSubmit"
        />

        <TaskModal
            :show="showEditModal"
            :task="selectedTask"
            :is-submitting="isSubmitting"
            @close="closeEditModal"
            @submit="handleUpdateTaskSubmit"
        />

        <TaskDeleteConfirm
            :show="showDeleteModal"
            :task="selectedTask"
            :is-deleting="isSubmitting"
            @close="closeDeleteModal"
            @confirm="handleDeleteTaskSubmit"
        />
    </div>

    <!-- Floating Create Button -->
    <Teleport to="body">
        <button
            @click="openCreateModal"
            class="fixed bottom-0 right-0 w-20 h-20 bg-primary/100 text-white origin-bottom-right hover:scale-120 transition-all z-50 flex p-9 rounded-tl-full shadow-lg"
            aria-label="建立任務"
        >
            <BaseIcon :icon="ICONS.ADD" size="2xl" />
        </button>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "@/store/tasks";
import { useTagStore } from "@/store/tags";
import { useTaskOperations } from "@/composables/useTaskOperations";
import { useTaskModals } from "@/composables/useTaskModals";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import TaskList from "@/components/organisms/TaskList.vue";
import TaskModal from "@/components/organisms/TaskModal.vue";
import TaskDeleteConfirm from "@/components/organisms/TaskDeleteConfirm.vue";
import { ICONS } from "@/constants/icons";
import type { Task } from "@/models/Task";
import type { TaskFormData } from "@/types/ui/forms";

const taskStore = useTaskStore();
const tagStore = useTagStore();

// Use composables
const {
    isSubmitting,
    handleTaskToggleComplete,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
} = useTaskOperations();

const {
    showCreateModal,
    showEditModal,
    showDeleteModal,
    selectedTask,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
} = useTaskModals();

// Methods
const handleTaskClick = (task: Task) => {
    console.log("Task clicked:", task);
};

const handleCreateTaskSubmit = (data: TaskFormData) => {
    handleCreateTask(data, closeCreateModal);
};

const handleUpdateTaskSubmit = (data: TaskFormData) => {
    if (selectedTask.value) {
        handleUpdateTask(selectedTask.value.id, data, closeEditModal);
    }
};

const handleDeleteTaskSubmit = () => {
    if (selectedTask.value) {
        handleDeleteTask(selectedTask.value.id, closeDeleteModal);
    }
};

const handleTaskEdit = (task: Task) => {
    openEditModal(task);
};

const handleTaskComplete = (taskId: number) => {
    const task = taskStore.tasks.find((t) => t.id === taskId);
    if (task) {
        handleTaskToggleComplete(task);
    }
};

// Lifecycle
onMounted(async () => {
    await Promise.all([taskStore.fetchTasks(), tagStore.fetchTags()]);
});
</script>
