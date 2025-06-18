import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path'
import vueDevTools from "vite-plugin-vue-devtools";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
        tailwindcss(),
        vueDevTools({
            launchEditor: "cursor",
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080", // 你的後端 API 伺服器地址
                changeOrigin: true,
            },
        },
    },
});
