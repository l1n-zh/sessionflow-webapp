import { ref } from 'vue';
import { Task } from '@/models/Task';
import { Session } from '@/models/Session';

type ModalMode = 'create' | 'end';

const isModalOpen = ref(false);
const mode = ref<ModalMode | null>(null);
const targetTask = ref<Task | null>(null);
const targetSession = ref<Session | null>(null);

export function useSessionModals() {
    
    const openModal = (newMode: ModalMode, data: Task | Session) => {
        isModalOpen.value = true;
        mode.value = newMode;
        if (newMode === 'create' && data instanceof Task) {
            targetTask.value = data;
        } else if (newMode === 'end' && data instanceof Session) {
            targetSession.value = data;
        }
    };

    const openCreateModal = (task: Task) => {
        openModal('create', task);
    };

    const openEndModal = (session: Session) => {
        openModal('end', session);
    };

    const closeModal = () => {
        isModalOpen.value = false;
        mode.value = null;
        targetTask.value = null;
        targetSession.value = null;
    };

    return {
        isModalOpen,
        mode,
        targetTask,
        targetSession,
        openCreateModal,
        openEndModal,
        closeModal,
    };
} 