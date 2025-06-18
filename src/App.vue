<template>
    <div id="app" class="bg-slate-200 md:px-8 h-screen flex flex-col">
        <AppNavbar />
        <div class="flex-1 flex flex-col overflow-hidden my-6">
            <RouterView/>
        </div>
        <StagewiseToolbar v-if="isDev" :config="stagewise.config" />
    </div>
</template>

<script setup lang="ts">
import AppNavbar from "@/components/organisms/AppNavbar.vue";
import { StagewiseToolbar } from "@stagewise/toolbar-vue";
import { VuePlugin } from "@stagewise-plugins/vue";

const isDev = import.meta.env.DEV;

const stagewise = {
    config: {
        plugins: [VuePlugin],
    },
};
</script>
