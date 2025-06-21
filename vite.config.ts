import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
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
    server:
        process.env.NODE_ENV === "production"
            ? {}
            : {
                  proxy: {
                      "/api": {
                          target: "http://localhost:53551",
                          changeOrigin: true,
                      },
                  },
              },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
        outDir: "dist/sessionflowapp",
    },
    base: process.env.NODE_ENV === "production" ? "/sessionflowapp/" : "/",
});
