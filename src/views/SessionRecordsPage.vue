<template>
    <div class="bg-stone-50 border border-neutral-300 rounded-xl flex flex-col h-full p-4">
        <div v-if="store.isLoading" class="text-center py-12 text-neutral-500">
            <p>讀取中...</p>
        </div>
        <div v-else-if="store.error" class="text-center py-12 text-red-500">
            <p>讀取失敗: {{ store.error }}</p>
        </div>
        <SessionRecordList v-else :records="store.records" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSessionRecordStore } from '@/store/sessionRecords';
import SessionRecordList from '@/components/organisms/SessionRecordList.vue';

const store = useSessionRecordStore();

onMounted(() => {
    store.fetchSessionRecords();
});
</script> 