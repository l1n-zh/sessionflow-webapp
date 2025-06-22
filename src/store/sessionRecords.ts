import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SessionRecord } from '@/models/SessionRecord';
import { sessionRecordApi } from '@/api/sessionRecords';
import type { SessionRecordResponse } from '@/types/api/sessionRecord';
import { useTaskStore } from './tasks';

export const useSessionRecordStore = defineStore('sessionRecords', () => {
    // State
    const records = ref<SessionRecord[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Actions
    async function fetchSessionRecords(params?: {
        startDate?: string;
        endDate?: string;
        taskId?: number;
    }) {
        isLoading.value = true;
        error.value = null;
        try {
            const taskStore = useTaskStore();
            if (taskStore.tasks.length === 0) {
                await taskStore.fetchTasks();
            }

            const response: SessionRecordResponse[] = await sessionRecordApi.getSessionRecords(params);

            // 驗證 API 回應格式
            if (!Array.isArray(response)) {
                console.error('API response is not an array:', response);
                throw new Error(`API 回應格式錯誤：預期陣列，實際收到 ${typeof response}`);
            }

            records.value = response.map(dto => {
                const task = dto.taskId ? taskStore.tasks.find(t => t.id === dto.taskId) : undefined;
                return new SessionRecord(dto, task?.title);
            });
        } catch (e: any) {
            // 輸出完整錯誤到 console 以便除錯
            console.error('Failed to fetch session records:', e);
            console.error('Error stack:', e.stack);

            error.value = e.message || 'Failed to fetch session records';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        // State
        records,
        isLoading,
        error,

        // Actions
        fetchSessionRecords,
    };
}); 