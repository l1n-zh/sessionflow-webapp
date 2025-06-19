<template>
    <div id="app" class="bg-slate-200 md:px-8 h-screen flex flex-col">
        <AppNavbar />
        <div class="flex-1 flex flex-col overflow-hidden my-6">
            <RouterView/>
        </div>
        <StagewiseToolbar v-if="isDev" :config="stagewise.config" />

        <!-- Session Modal -->
        <template v-if="isModalOpen">
            <SessionModal
                :show="isModalOpen"
                :mode="mode!"
                :task="targetTask"
                :session="targetSession"
                @close="closeModal"
                @submit="handleSubmit"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import AppNavbar from "@/components/organisms/AppNavbar.vue";
import { StagewiseToolbar } from "@stagewise/toolbar-vue";
import { VuePlugin } from "@stagewise-plugins/vue";
import SessionModal from '@/components/organisms/SessionModal.vue';
import { useSessionModals } from '@/composables/useSessionModals';
import { useSessionStore } from '@/store/sessions';
import type { SessionCreateFormData, SessionEndFormData } from '@/types/ui/forms';
import { Session } from '@/models/Session';

const isDev = import.meta.env.DEV;

const stagewise = {
    config: {
        plugins: [VuePlugin],
    },
};

const { 
    isModalOpen,
    mode,
    targetTask,
    targetSession,
    closeModal,
} = useSessionModals();

const sessionStore = useSessionStore();

const handleSubmit = (formData: SessionCreateFormData | SessionEndFormData) => {
    if (mode.value === 'create' && targetTask.value) {
        sessionStore.createNewSession(targetTask.value.id, formData as SessionCreateFormData);
    } else if (mode.value === 'end' && targetSession.value) {
        sessionStore.endActiveSession(targetSession.value, formData as SessionEndFormData);
    }
    closeModal();
};
</script>
