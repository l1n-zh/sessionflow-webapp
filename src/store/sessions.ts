import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Session } from '@/models/Session';
import { getActiveSessions, startSession, endSession } from '@/api/sessions';
import { useTaskStore } from './tasks';
import type { SessionCreateFormData, SessionEndFormData } from '@/types/ui/forms';
import type { SessionCreateRequest } from '@/types/api/session';

export const useSessionStore = defineStore('sessions', () => {
    const activeSessions = ref<Session[]>([]);
    const isLoading = ref(false);

    const taskStore = useTaskStore();

    const getSessionByTaskId = computed(() => {
        return (taskId: number) => activeSessions.value.find(s => s.taskId === taskId);
    });

    async function fetchActiveSessions() {
        isLoading.value = true;
        try {
            const dtos = await getActiveSessions();
            const tasks = await taskStore.ensureTasks();
            
            activeSessions.value = dtos.map(dto => {
                const task = tasks.find(t => t.id === dto.taskId);
                if (!task) {
                    console.warn(`Task with ID ${dto.taskId} not found for active session ${dto.id}. This session will be ignored.`);
                    return null;
                }
                return new Session(dto, task);
            }).filter(Boolean) as Session[];

        } catch (error) {
            console.error('Failed to fetch active sessions:', error);
        } finally {
            isLoading.value = false;
        }
    }

    async function createNewSession(taskId: number, formData: SessionCreateFormData) {
        isLoading.value = true;
        const task = taskStore.getTaskById(taskId);
        if (!task) {
            console.error(`Task with ID ${taskId} not found for creating session.`);
            isLoading.value = false;
            return;
        }

        try {
            const request: SessionCreateRequest = {
                taskId,
                title: formData.name,
                note: formData.planningNotes,
            };
            if (formData.endReminderMinutes) {
                const minutes = parseInt(formData.endReminderMinutes, 10);
                if (!isNaN(minutes)) {
                    const reminderDate = new Date(Date.now() + minutes * 60 * 1000);
                    request.endReminder = reminderDate.toISOString();
                }
            }

            const newSessionDto = await startSession(request);
            const newSession = new Session(newSessionDto, task);
            activeSessions.value.push(newSession);

        } catch (error) {
            console.error('Failed to start session:', error);
        } finally {
            isLoading.value = false;
        }
    }

    async function endActiveSession(session: Session, formData: SessionEndFormData) {
        isLoading.value = true;
        try {
            await endSession(session.id, {
                sessionId: session.id,
                completionNote: formData.completionNotes
            });

            // Remove session from active list
            activeSessions.value = activeSessions.value.filter(s => s.id !== session.id);

            // Optionally mark task as complete
            if (formData.markTaskAsComplete && session.taskId) {
                await taskStore.completeTask(session.taskId);
            }

        } catch (error) {
            console.error('Failed to end session:', error);
        } finally {
            isLoading.value = false;
        }
    }


    return {
        activeSessions,
        isLoading,
        getSessionByTaskId,
        fetchActiveSessions,
        createNewSession,
        endActiveSession,
    };
}); 