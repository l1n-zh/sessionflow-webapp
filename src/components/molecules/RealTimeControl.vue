<template>
    <div class="bg-slate-200 rounded-md py-2 px-4 flex items-center gap-4">
        <p class="text-neutral-700 font-bold truncate">{{ session.taskTitle }}</p>
        <p class="text-primary font-bold">{{ formattedElapsedTime }}</p>
        <ActionButton
            :icon="ICONS.SESSION_END"
            variant="primary"
            @click="emit('endSession', session)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import type { Session } from '@/models/Session';
import ActionButton from '@/components/atoms/ActionButton.vue';
import { ICONS } from '@/constants/icons';

interface Props {
    session: Session;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'endSession', session: Session): void;
}>();

const now = ref(new Date());
let timer: number;

onMounted(() => {
    timer = window.setInterval(() => {
        now.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});

const formattedElapsedTime = computed(() => {
    const elapsedSeconds = Math.floor((now.value.getTime() - props.session.startTime.getTime()) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
});
</script> 