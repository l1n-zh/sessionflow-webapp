<template>
    <div class="flex flex-col relative no-scrollbar h-full">
        <!-- Header -->
        <div
            class="grid grid-cols-[1fr_1fr_160px_50px] items-center gap-4 px-5 pb-2 text-sm text-neutral-500 border-b border-gray-200"
        >
            <div class="min-w-0"><span>工作階段</span></div>
            <div class="min-w-0"><span>任務</span></div>
            <div class="min-w-0">
                <button
                    class="hover:text-primary transition-colors flex items-center gap-1"
                    @click="toggleSort('startAt')"
                >
                    <span>開始時間</span>
                    <BaseIcon :icon="ICONS.CHEVRON_UP" size="sm" :class="getSortIconClass('startAt')" />
                </button>
            </div>
            <div class="min-w-0">
                <button
                    class="hover:text-primary transition-colors flex items-center gap-1"
                    @click="toggleSort('duration')"
                >
                    <span>長度</span>
                     <BaseIcon :icon="ICONS.CHEVRON_UP" size="sm" :class="getSortIconClass('duration')" />
                </button>
            </div>
        </div>

        <!-- List -->
        <TransitionGroup
            tag="div"
            name="session-record-list"
            class="relative overflow-y-auto pt-2 no-scrollbar flex-1 space-y-2"
        >
            <SessionRecordItem
                v-for="record in sortedRecords"
                :key="record.id"
                :record="record"
            />
            <div key="bottom-spacer" class="h-16"></div>
        </TransitionGroup>

        <!-- Empty State -->
        <Transition name="empty-state-fade">
            <div
                v-if="records.length === 0"
                class="text-center text-gray-500 absolute top-20 left-1/2 -translate-x-1/2"
            >
                <div class="text-lg font-medium mb-2">沒有任何階段紀錄</div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { SessionRecord } from "@/models/SessionRecord";
import SessionRecordItem from "./SessionRecordItem.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import { ICONS } from "@/constants/icons";

type SortKey = 'startAt' | 'duration';
type SortDirection = 'asc' | 'desc';

interface Props {
    records: SessionRecord[];
}

const props = withDefaults(defineProps<Props>(), {
    records: () => [],
});

const sortKey = ref<SortKey | null>(null);
const sortDirection = ref<SortDirection | null>(null);

const getSortIconClass = (key: SortKey) => {
    if (sortKey.value !== key) return 'text-neutral-300';
    if (sortDirection.value === 'asc') return 'text-primary';
    if (sortDirection.value === 'desc') return 'text-primary rotate-180';
    return 'text-neutral-300';
};

const sortedRecords = computed(() => {
    if (!sortKey.value || !sortDirection.value) {
        return props.records;
    }

    return [...props.records].sort((a, b) => {
        const key = sortKey.value as SortKey;
        let comparison = 0;
        if (key === 'startAt') {
            comparison = a.startAt.getTime() - b.startAt.getTime();
        } else if (key === 'duration') {
            comparison = a.duration - b.duration;
        }

        return sortDirection.value === 'asc' ? comparison : -comparison;
    });
});

const toggleSort = (key: SortKey) => {
    if (sortKey.value !== key) {
        sortKey.value = key;
        sortDirection.value = 'asc';
    } else if (sortDirection.value === 'asc') {
        sortDirection.value = 'desc';
    } else {
        sortKey.value = null;
        sortDirection.value = null;
    }
};
</script>

<style>
.session-record-list-move,
.session-record-list-enter-active,
.session-record-list-leave-active {
    transition: all 0.4s ease-in-out;
}

.session-record-list-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.session-record-list-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.session-record-list-leave-active {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
}

.session-record-list-move {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.empty-state-fade-enter-active,
.empty-state-fade-leave-active {
    transition: opacity 0.4s ease;
}

.empty-state-fade-enter-from,
.empty-state-fade-leave-to {
    opacity: 0;
}
</style> 