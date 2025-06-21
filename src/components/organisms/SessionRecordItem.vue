<template>
    <div
        class="grid grid-cols-[1fr_1fr_160px_50px] items-center gap-4 px-5 py-3 rounded-lg bg-slate-100"
    >
        <!-- 工作階段 -->
        <div class="min-w-0">
            <h3 class="text-md text-neutral-800 truncate">
                {{ record.title }}
            </h3>
        </div>

        <!-- 任務 -->
        <div class="min-w-0">
            <span v-if="record.taskTitle" class="text-sm text-neutral-600 truncate">{{ record.taskTitle }}</span>
            <span v-else class="text-sm text-neutral-400">無關聯任務</span>
        </div>

        <!-- 開始時間 -->
        <div class="min-w-0">
            <span class="text-sm text-neutral-600 whitespace-pre-line ">
                {{ formattedStartTime }}
            </span>
        </div>

        <!-- 長度 -->
        <div class="min-w-0">
            <span class="text-sm text-neutral-600">
                {{ record.formattedDuration }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SessionRecord } from "@/models/SessionRecord";
import { formatDateTime } from "@/utils/dateFormatter";

interface Props {
    record: SessionRecord;
}

const props = withDefaults(defineProps<Props>(), {
    // No specific defaults needed for now, but added for consistency
});

const formattedStartTime = computed(() => {
    return formatDateTime(props.record.startTime);
});
</script> 