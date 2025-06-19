import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/store/sessions';

export function useSessionControls() {
    const sessionStore = useSessionStore();
    const { activeSessions, isLoading } = storeToRefs(sessionStore);

    onMounted(() => {
        if (activeSessions.value.length === 0) {
            sessionStore.fetchActiveSessions();
        }
    });

    return {
        activeSessions,
        isLoading,
    };
} 